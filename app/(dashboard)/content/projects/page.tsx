"use client";

import React, { useState } from "react";
import {
  useGetProjects,
  useDeleteProject,
  useToggleProjectPublish,
} from "@/services/projectService";
import CTable from "@/components/shared/custome/c-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/lib/hooks";
import { getMediaUrl } from "@/lib/media";
import CImage from "@/components/shared/custome/c-image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Globe,
  Lock,
  Archive,
  Eye,
  Star,
  FolderGit2,
} from "lucide-react";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const { projects, isLoading } = useGetProjects({
    search: search || undefined,
  });
  const { deleteProject } = useDeleteProject();
  const { togglePublish } = useToggleProjectPublish();

  const projectDialog = useDialog("ov_project_form");
  const confirmDialog = useDialog("ov_confirmation");

  const handleOpenCreate = () => {
    projectDialog.open({
      title: "Create New Project",
      project: null,
    });
  };

  const handleOpenEdit = (project: ICmsProject) => {
    projectDialog.open({
      title: "Edit Project",
      project,
    });
  };

  const handleDelete = (project: ICmsProject) => {
    confirmDialog.open({
      title: "Delete Project",
      isClose: true,
      message: `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
      onConfirmation: () => deleteProject(project.id),
    });
  };

  const colConfig = [
    {
      header: "Project",
      render: (project: ICmsProject) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-8 bg-muted border border-border overflow-hidden shrink-0 flex items-center justify-center">
            {project.thumbnail?.url ? (
              <CImage
                src={getMediaUrl(project.thumbnail.url)}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <FolderGit2 className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold">
              {project.featured && (
                <Star className="w-3.5 h-3.5 text-accent-yellow fill-accent-yellow shrink-0" />
              )}
              <span>{project.title}</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono truncate max-w-xs">
              /{project.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (project: ICmsProject) => (
        <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 border border-border bg-muted">
          {project.category}
        </span>
      ),
    },
    {
      header: "Year",
      render: (project: ICmsProject) => (
        <span className="font-mono text-sm">{project.year}</span>
      ),
    },
    {
      header: "Status",
      render: (project: ICmsProject) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePublish(project.id);
          }}
          className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-2.5 py-1 border-2 border-border transition-all ${
            project.status === "PUBLISHED"
              ? "bg-primary text-primary-foreground shadow-hard"
              : project.status === "ARCHIVED"
                ? "bg-accent-yellow/30 text-foreground border-dashed"
                : "bg-muted text-muted-foreground"
          }`}
          title="Click to toggle publish status"
        >
          {project.status === "PUBLISHED" ? (
            <Globe className="w-3 h-3" />
          ) : project.status === "ARCHIVED" ? (
            <Archive className="w-3 h-3 text-accent-yellow" />
          ) : (
            <Lock className="w-3 h-3" />
          )}
          {project.status}
        </button>
      ),
    },
    {
      header: "Actions",
      render: (project: ICmsProject) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              const frontendUrl =
                process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
              const secret =
                process.env.NEXT_PUBLIC_PREVIEW_SECRET ||
                "dev-preview-secret-key";
              window.open(
                `${frontendUrl}/projects/${project.slug}?preview=${secret}`,
                "_blank",
              );
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Preview Project"
          >
            <Eye className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEdit(project);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Edit Project"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(project);
            }}
            className="border-2 border-border h-8 px-2.5"
            title="Delete Project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your showcase projects, case studies, technologies, and
            publication status.
          </p>
        </div>
        <Button
          onClick={handleOpenCreate}
          className="border-2 border-border shadow-hard font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 border-2 border-border"
          />
        </div>
      </div>

      <div className="border-2 border-border bg-card shadow-hard overflow-hidden">
        <CTable
          column={projects}
          colConfig={colConfig}
          isLoading={isLoading}
          className="w-full overflow-x-auto"
          classNameHeader="border-b-2 border-border bg-muted/60"
        />
      </div>
    </div>
  );
}
