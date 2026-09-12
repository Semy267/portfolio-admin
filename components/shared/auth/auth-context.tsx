"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Apis } from "@/services/core";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
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
  continueAsGuest: () => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initAuth = async () => {
    setIsLoading(true);
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const profile = await Apis.auth.me();
        if (profile) {
          setUser(profile);
          setIsLoading(false);
          return;
        }
      } catch {
        // Token expired or invalid, fallback to guest
        localStorage.removeItem("token");
      }
    }

    // Auto-initialize demo guest session for seamless portfolio showcase
    try {
      const res = await Apis.auth.guestLogin();
      if (res?.access_token && res?.user) {
        localStorage.setItem("token", res.access_token);
        setToken(res.access_token);
        setUser(res.user);
      }
    } catch {
      // Offline / backend unavailable
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const loginAsAdmin = async (
    email: string,
    pass: string,
  ): Promise<boolean> => {
    try {
      const res = await Apis.auth.login({ email, password: pass });
      if (res?.access_token && res?.user) {
        localStorage.setItem("token", res.access_token);
        setToken(res.access_token);
        setUser(res.user);
        toast.success("Berhasil masuk sebagai Superadmin!");
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Email atau password salah.");
      return false;
    }
  };

  const continueAsGuest = async (): Promise<boolean> => {
    try {
      const res = await Apis.auth.guestLogin();
      if (res?.access_token && res?.user) {
        localStorage.setItem("token", res.access_token);
        setToken(res.access_token);
        setUser(res.user);
        toast.info("Mode Tamu (Guest Demo) aktif.");
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Gagal membuat sesi tamu.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.info("Telah keluar. Mengalihkan ke mode demo...");
    continueAsGuest();
  };

  const isSuperadmin = Boolean(
    user?.role === "SUPERADMIN" && !user?.is_anonymous,
  );
  const isGuest = !isSuperadmin;
  const role: "SUPERADMIN" | "GUEST" = isSuperadmin ? "SUPERADMIN" : "GUEST";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isGuest,
        isSuperadmin,
        isLoading,
        loginAsAdmin,
        continueAsGuest,
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
