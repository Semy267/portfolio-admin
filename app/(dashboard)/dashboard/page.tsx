"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Sparkles,
  Briefcase,
  Share2,
  User,
  ArrowUpRight,
} from "lucide-react";
import { useGetProjects } from "@/services/projectService";
import { useGetTechnologies } from "@/services/technologyService";
import { useGetSkills } from "@/services/skillService";
import { useGetExperiences } from "@/services/experienceService";
import { useGetProfile } from "@/services/profileService";

export default function DashboardPage() {
  const { profile } = useGetProfile();
  const { pagination: projectPagination } = useGetProjects({ limit: 1 });
  const { technologies } = useGetTechnologies();
  const { skills } = useGetSkills();
  const { experiences } = useGetExperiences();

  const stats = [
    {
      label: "Total Projects",
      value: projectPagination.total,
      href: "/content/projects",
      icon: FolderGit2,
      color: "bg-accent-yellow",
    },
    {
      label: "Technologies",
      value: technologies.length,
      href: "/content/technologies",
      icon: Cpu,
      color: "bg-chart-2",
    },
    {
      label: "Skills Listed",
      value: skills.length,
      href: "/content/skills",
      icon: Sparkles,
      color: "bg-chart-3",
    },
    {
      label: "Work Experiences",
      value: experiences.length,
      href: "/content/experience",
      icon: Briefcase,
      color: "bg-accent-pink",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="border-2 border-border p-6 bg-card shadow-hard space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 border border-border">
          Portfolio CMS — Phase 2
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile?.name || "Salman"}!
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Manage your portfolio content, projects, skills, and settings directly
          with instantaneous backend synchronization.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="border-2 border-border p-5 bg-card shadow-hard hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2.5 border-2 border-border ${stat.color} text-foreground`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div>
                <p className="text-xs font-mono font-bold uppercase text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-black tracking-tight mt-1">
                  {stat.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="border-2 border-border p-6 bg-card shadow-hard space-y-4">
        <h2 className="text-lg font-bold">Quick Content Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/content/profile"
            className="flex items-center gap-3 p-4 border-2 border-border hover:bg-muted transition-colors font-bold"
          >
            <User className="w-5 h-5 text-primary" />
            <span>Update Profile & Bio</span>
          </Link>
          <Link
            href="/content/projects"
            className="flex items-center gap-3 p-4 border-2 border-border hover:bg-muted transition-colors font-bold"
          >
            <FolderGit2 className="w-5 h-5 text-primary" />
            <span>Manage Project Showcase</span>
          </Link>
          <Link
            href="/settings/social-links"
            className="flex items-center gap-3 p-4 border-2 border-border hover:bg-muted transition-colors font-bold"
          >
            <Share2 className="w-5 h-5 text-primary" />
            <span>Social Media Links</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
