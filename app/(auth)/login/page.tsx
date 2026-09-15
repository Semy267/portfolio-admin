"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "@/components/shared/auth/auth-context";
import { ShieldCheck, UserCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CInputForm from "@/components/shared/form/input/input-form";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { loginAsAdmin, isSuperadmin } = useAuth();

  useEffect(() => {
    if (isSuperadmin) {
      router.push("/dashboard");
    }
  }, [isSuperadmin, router]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.email || !value.password) return;
      setSubmitting(true);
      const success = await loginAsAdmin(value.email, value.password);
      setSubmitting(false);
      if (success) {
        router.push("/dashboard");
      }
    },
  });

  if (isSuperadmin) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 pb-12">
      <div className="max-w-md w-full bg-card border-2 border-border shadow-hard-xl p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-12 h-12 bg-accent text-accent-foreground border-2 border-border shadow-hard flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-foreground font-[family-name:var(--font-space-grotesk)]">
            Masuk ke Admin
          </h1>
          <p className="text-xs text-muted-foreground font-mono mt-2 text-center">
            Login sebagai Administrator untuk mengakses CMS dan mengatur
            portofolio Anda.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <CInputForm
            form={form}
            name="email"
            type="email"
            label="Email Superadmin"
            placeholder="admin@portfolio.local"
            classNameParent="space-y-2"
            className="h-10 text-sm border-2 border-border rounded-none bg-background text-foreground"
            required
          />

          <CInputForm
            form={form}
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            classNameParent="space-y-2"
            className="h-10 text-sm border-2 border-border rounded-none bg-background text-foreground"
            required
          />

          <Button
            type="submit"
            className="w-full h-11 text-xs font-bold uppercase gap-2 border-2 border-border shadow-hard mt-2"
            disabled={submitting}
          >
            <Lock className="w-4 h-4" />
            {submitting ? "Memproses..." : "Masuk ke Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
