"use client";

import React, { createContext, useContext, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: string;
  is_anonymous: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  role: "SUPERADMIN" | "GUEST" | null;
  isGuest: boolean;
  isSuperadmin: boolean;
  isLoading: boolean;
  loginAsAdmin: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  const loginAsAdmin = async (
    email: string,
    pass: string,
  ): Promise<boolean> => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password: pass,
      });
      if (error) {
        toast.error(error.message || "Email atau password salah.");
        return false;
      }
      toast.success("Berhasil masuk sebagai Superadmin!");
      return true;
    } catch (err: any) {
      toast.error("Terjadi kesalahan pada sistem autentikasi.");
      return false;
    }
  };

  const logout = async () => {
    await authClient.signOut();
    toast.info("Telah keluar.");
    window.location.href = "/login";
  };

  const user = data?.user as UserProfile | undefined;

  const isSuperadmin = Boolean(
    user &&
      (user.role === "SUPERADMIN" || user.role === "ADMIN") &&
      !user.is_anonymous,
  );

  const isGuest = !isSuperadmin;
  const role: "SUPERADMIN" | "GUEST" = isSuperadmin ? "SUPERADMIN" : "GUEST";

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        token: null, // Token is handled automatically via cookies
        role,
        isGuest,
        isSuperadmin,
        isLoading: isPending,
        loginAsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
