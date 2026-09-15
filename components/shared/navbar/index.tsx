"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { BookOpen, ShieldCheck, UserCheck, LogOut, Lock } from "lucide-react";
import { useAuth } from "@/components/shared/auth/auth-context";
import { LoginDialog } from "@/components/shared/auth/login-dialog";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { isSuperadmin, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border px-4 py-3">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center border-2 border-border shadow-hard">
                  <BookOpen className="h-4 w-4 text-background" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground font-[family-name:var(--font-space-grotesk)]">
                  My<span className="text-primary">Boilerplate</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Role Indicator & Actions */}
              {isSuperadmin ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-2.5 py-1 bg-accent text-accent-foreground border-2 border-border shadow-hard">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Superadmin
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    title="Logout Superadmin"
                    className="h-8 px-2 text-xs border-2 border-border"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {/* <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-2.5 py-1 bg-accent-yellow text-foreground border-2 border-border shadow-hard">
                    <UserCheck className="w-3.5 h-3.5" />
                    Guest Demo
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLoginOpen(true)}
                    className="h-8 text-xs font-mono font-bold uppercase gap-1.5 border-2 border-border"
                  >
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    Login Admin
                  </Button> */}
                </div>
              )}

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
