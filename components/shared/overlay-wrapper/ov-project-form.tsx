"use client";

import React, { useState, useEffect } from "react";
import CInput from "@/components/shared/form/input";
import CTextarea from "@/components/shared/form/textarea/c-textarea";
import CSelect from "@/components/shared/form/select";
import { CCheckbox } from "@/components/shared/form/checkbox";
import CButton from "@/components/shared/custome/c-button";
import { useCreateProject, useUpdateProject } from "@/services/projectService";
import { useGetTechnologies } from "@/services/technologyService";
import { ProjectTechPicker } from "@/components/module/projects/project-tech-picker";
import { ProjectThumbnailPicker } from "@/components/module/projects/project-thumbnail-picker";
import { Loader2 } from "lucide-react";

export interface OvProjectFormProps {
  project?: ICmsProject | null;
  onClose?: () => void;
}

const STATUS_OPTIONS = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "PUBLISHED", value: "PUBLISHED" },
  { label: "ARCHIVED", value: "ARCHIVED" },
];

export default function OvProjectForm({
  project,
  onClose,
}: OvProjectFormProps) {
  const { createProject, isLoading: isCreating } = useCreateProject();
  const { updateProject, isLoading: isUpdating } = useUpdateProject();
  const { technologies } = useGetTechnologies();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    content: "",
    category: "Fullstack",
    year: new Date().getFullYear(),
    status: "DRAFT" as "DRAFT" | "PUBLISHED" | "ARCHIVED",
    featured: false,
    sortOrder: 0,
    thumbnailId: "" as string | null,
    thumbnailUrl: "" as string | null,
    githubUrl: "",
    demoUrl: "",
    technologyIds: [] as string[],
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        content: project.content || "",
        category: project.category || "Fullstack",
        year: project.year || new Date().getFullYear(),
        status: project.status,
        featured: project.featured,
        sortOrder: project.sortOrder,
        thumbnailId: project.thumbnailId || null,
        thumbnailUrl: project.thumbnail?.url || null,
        githubUrl: project.githubUrl || "",
        demoUrl: project.demoUrl || "",
        technologyIds: project.technologies?.map((t) => t.technologyId) || [],
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        category: "Fullstack",
        year: new Date().getFullYear(),
        status: "DRAFT",
        featured: false,
        sortOrder: 0,
        thumbnailId: null,
        thumbnailUrl: null,
        githubUrl: "",
        demoUrl: "",
        technologyIds: [],
      });
    }
  }, [project]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({
      ...prev,
      title,
      slug: project ? prev.slug : slug,
    }));
  };

  const handleTechToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      technologyIds: prev.technologyIds.includes(id)
        ? prev.technologyIds.filter((tId) => tId !== id)
        : [...prev.technologyIds, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { thumbnailUrl: _, ...payload } = formData;
    if (project) {
      updateProject(
        { id: project.id, payload },
        { onSuccess: () => onClose?.() },
      );
    } else {
      createProject(payload, { onSuccess: () => onClose?.() });
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[80vh] overflow-y-auto pr-1"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInput
          label="Title *"
          value={formData.title}
          onChange={handleTitleChange}
          required
          className="border-2 border-border"
        />

        <CInput
          label="Slug *"
          value={formData.slug}
          onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
          required
          className="border-2 border-border font-mono text-sm"
        />
      </div>

      <CInput
        label="Short Description *"
        value={formData.shortDescription}
        onChange={(e) =>
          setFormData((p) => ({ ...p, shortDescription: e.target.value }))
        }
        required
        className="border-2 border-border"
      />

      <CTextarea
        label="Full Content / Markdown"
        value={formData.content}
        onChange={(e) =>
          setFormData((p) => ({ ...p, content: e.target.value }))
        }
        className="border-2 border-border font-mono text-sm"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CInput
          label="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData((p) => ({ ...p, category: e.target.value }))
          }
          required
          className="border-2 border-border"
        />

        <CInput
          type="number"
          label="Year"
          value={String(formData.year)}
          onChange={(e) =>
            setFormData((p) => ({ ...p, year: Number(e.target.value) }))
          }
          required
          className="border-2 border-border"
        />

        <CSelect
          label="Status"
          options={STATUS_OPTIONS}
          value={formData.status}
          onChange={(val) => setFormData((p) => ({ ...p, status: val as any }))}
          className="w-full border-2 border-border font-bold text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInput
          label="GitHub URL"
          value={formData.githubUrl}
          onChange={(e) =>
            setFormData((p) => ({ ...p, githubUrl: e.target.value }))
          }
          placeholder="https://github.com/..."
          className="border-2 border-border"
        />

        <CInput
          label="Demo URL"
          value={formData.demoUrl}
          onChange={(e) =>
            setFormData((p) => ({ ...p, demoUrl: e.target.value }))
          }
          placeholder="https://..."
          className="border-2 border-border"
        />
      </div>

      <ProjectThumbnailPicker
        thumbnailId={formData.thumbnailId}
        thumbnailUrl={formData.thumbnailUrl}
        onChange={(mediaId, mediaUrl) =>
          setFormData((p) => ({
            ...p,
            thumbnailId: mediaId,
            thumbnailUrl: mediaUrl || null,
          }))
        }
      />

      <ProjectTechPicker
        technologies={technologies}
        selectedIds={formData.technologyIds}
        onToggle={handleTechToggle}
      />

      <div className="pt-2">
        <CCheckbox
          label="Feature this project on Homepage"
          checked={formData.featured}
          onChange={(e) =>
            setFormData((p) => ({ ...p, featured: e.target.checked }))
          }
        />
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t-2 border-border">
        <CButton
          title="Cancel"
          type="button"
          variant="outline"
          onClick={() => onClose?.()}
          className="border-2 border-border font-bold"
        />
        <CButton
          title={project ? "Update Project" : "Create Project"}
          type="submit"
          disabled={isSaving}
          className="border-2 border-border shadow-hard font-bold"
          icon={
            isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : undefined
          }
        />
      </div>
    </form>
  );
}
