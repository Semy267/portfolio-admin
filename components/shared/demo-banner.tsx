"use client";

import React, { useState } from "react";
import { useAuth } from "./auth/auth-context";
import { LoginDialog } from "./auth/login-dialog";
import { ShieldCheck, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DemoBanner() {
  const { isGuest, isSuperadmin } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  if (!isGuest && !isSuperadmin) return null;

  if (isSuperadmin) {
    return (
      <div className="bg-accent text-accent-foreground border-b-2 border-border px-4 py-2 text-xs font-mono font-bold uppercase tracking-wide">
        <div className="container flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              [SUPERADMIN ACTIVE] Unlimited character translation & permanent
              storage.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-accent-yellow text-foreground border-b-2 border-border px-4 py-2 text-xs font-mono font-bold tracking-wide">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-foreground text-background border border-border shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs uppercase">
              <span className="font-extrabold underline decoration-2">
                [GUEST DEMO MODE]
              </span>{" "}
              5,000 char translation limit. Projects automatically purge in 24
              hours.
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={() => setLoginOpen(true)}
            className="h-7 text-[11px] font-mono font-bold uppercase border-2 border-border shadow-hard ml-auto"
          >
            <Sparkles className="w-3 h-3" />
            Login Superadmin
          </Button>
        </div>
      </div>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
