"use client";

import React from "react";
import { useAuth } from "./auth/auth-context";
import { ShieldCheck } from "lucide-react";

export function DemoBanner() {
  const { isSuperadmin } = useAuth();

  if (!isSuperadmin) return null;

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
