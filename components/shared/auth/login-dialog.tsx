"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./auth-context";
import { ShieldCheck, Sparkles, UserCheck, Lock } from "lucide-react";

interface LoginDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LoginDialog({ trigger, open, onOpenChange }: LoginDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const showOpen = isControlled ? open : internalOpen;
  const setShowOpen = isControlled
    ? onOpenChange ?? (() => {})
    : setInternalOpen;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { loginAsAdmin, isSuperadmin } = useAuth();

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const success = await loginAsAdmin(email, password);
    setSubmitting(false);
    if (success) {
      setShowOpen(false);
    }
  };

  return (
    <Dialog open={showOpen} onOpenChange={setShowOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md bg-card border-2 border-border shadow-hard-xl text-foreground rounded-none">
        <DialogHeader>
          <div className="mx-auto w-10 h-10 bg-accent text-accent-foreground border-2 border-border shadow-hard flex items-center justify-center mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <DialogTitle className="text-center text-lg font-bold uppercase tracking-tight font-[family-name:var(--font-space-grotesk)]">
            {isSuperadmin ? "Akun Superadmin Aktif" : "Masuk ke Platform"}
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-muted-foreground font-mono">
            Akses portofolio demo publik atau masuk sebagai Superadmin untuk
            translasi novel penuh tanpa batas.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAdminSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-email"
              className="text-xs font-mono uppercase font-bold"
            >
              Email Superadmin
            </Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@epubtranslator.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 text-xs border-2 border-border rounded-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="admin-pass"
                className="text-xs font-mono uppercase font-bold"
              >
                Password
              </Label>
            </div>
            <Input
              id="admin-pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 text-xs border-2 border-border rounded-none"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-xs font-bold uppercase gap-2 border-2 border-border shadow-hard"
            disabled={submitting}
          >
            <Lock className="w-3.5 h-3.5" />
            {submitting ? "Memproses..." : "Masuk sebagai Superadmin"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
