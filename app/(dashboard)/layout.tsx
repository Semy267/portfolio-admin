"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Sparkles,
  Briefcase,
  Share2,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        label: "Profile / About",
        href: "/content/profile",
        icon: User,
      },
      {
        label: "Projects",
        href: "/content/projects",
        icon: FolderGit2,
      },
      {
        label: "Technologies",
        href: "/content/technologies",
        icon: Cpu,
      },
      {
        label: "Skills",
        href: "/content/skills",
        icon: Sparkles,
      },
      {
        label: "Experience",
        href: "/content/experience",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Media",
    items: [
      {
        label: "Media Library",
        href: "/media",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Social Links",
        href: "/settings/social-links",
        icon: Share2,
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen pt-14 bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-border bg-card shrink-0 hidden md:block">
        <div className="sticky top-14 p-4 space-y-6">
          {NAV_ITEMS.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground px-2">
                {section.title}
              </h2>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-bold border-2 transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground border-border shadow-hard"
                          : "border-transparent text-foreground hover:bg-muted hover:border-border",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
