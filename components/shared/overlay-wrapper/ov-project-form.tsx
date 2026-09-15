"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import CInputForm from "@/components/shared/form/input/input-form";
import CTextareaForm from "@/components/shared/form/textarea/c-textarea-form";
import CSelectForm from "@/components/shared/form/select/select-form";
import { CCheckbox } from "@/components/shared/form/checkbox";
import CButton from "@/components/shared/custome/c-button";
import { useCreateProject, useUpdateProject } from "@/services/projectService";
import { useGetTechnologies } from "@/services/technologyService";
import { ProjectTechPicker } from "@/components/module/projects/project-tech-picker";
import { ProjectThumbnailPicker } from "@/components/module/projects/project-thumbnail-picker";
import { Loader2, Eye } from "lucide-react";

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

  const form = useForm({
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      shortDescription: project?.shortDescription || "",
      content: project?.content || "",
      category: project?.category || "Fullstack",
      year: project?.year || new Date().getFullYear(),
      status: project?.status || "DRAFT",
      featured: project?.featured || false,
      sortOrder: project?.sortOrder || 0,
      thumbnailId: project?.thumbnailId || null,
      thumbnailUrl: project?.thumbnail?.url || null,
      githubUrl: project?.githubUrl || "",
      demoUrl: project?.demoUrl || "",
      technologyIds: project?.technologies?.map((t) => t.technologyId) || [],
    },
    onSubmit: async ({ value }) => {
      const { thumbnailUrl: _, ...payload } = value;
      if (project) {
        updateProject(
          { id: project.id, payload },
          { onSuccess: () => onClose?.() },
        );
      } else {
        createProject(payload as any, { onSuccess: () => onClose?.() });
      }
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    form.setFieldValue("title", title);
    if (!project) {
      form.setFieldValue("slug", slug);
    }
  };

  const handleTechToggle = (id: string) => {
    const current = form.getFieldValue("technologyIds") as string[];
    const updated = current.includes(id)
      ? current.filter((tId) => tId !== id)
      : [...current, id];
    form.setFieldValue("technologyIds", updated);
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 max-h-[80vh] w-full! overflow-y-auto pr-1"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInputForm
          form={form}
          name="title"
          label="Title *"
          onChange={handleTitleChange}
          required
          className="border-2 border-border"
        />

        <CInputForm
          form={form}
          name="slug"
          label="Slug *"
          required
          className="border-2 border-border font-mono text-sm"
        />
      </div>

      <CInputForm
        form={form}
        name="shortDescription"
        label="Short Description *"
        required
        className="border-2 border-border"
      />

      <CTextareaForm
        form={form}
        name="content"
        label="Full Content / Markdown"
        className="border-2 border-border font-mono text-sm"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CInputForm
          form={form}
          name="category"
          label="Category"
          required
          className="border-2 border-border"
        />

        <CInputForm
          form={form}
          name="year"
          type="number"
          label="Year"
          required
          className="border-2 border-border"
          onChange={(e) => {
            form.setFieldValue("year", Number(e.target.value));
          }}
        />

        <CSelectForm
          form={form}
          name="status"
          label="Status"
          options={STATUS_OPTIONS}
          className="w-full border-2 border-border font-bold text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInputForm
          form={form}
          name="githubUrl"
          label="GitHub URL"
          placeholder="https://github.com/..."
          className="border-2 border-border"
        />

        <CInputForm
          form={form}
          name="demoUrl"
          label="Demo URL"
          placeholder="https://..."
          className="border-2 border-border"
        />
      </div>

      <form.Field
        name="thumbnailId"
        children={(field) => (
          <form.Field
            name="thumbnailUrl"
            children={(urlField) => (
              <ProjectThumbnailPicker
                thumbnailId={field.state.value as string | null}
                thumbnailUrl={urlField.state.value as string | null}
                onChange={(mediaId, mediaUrl) => {
                  field.handleChange(mediaId);
                  urlField.handleChange(mediaUrl || null);
                }}
              />
            )}
          />
        )}
      />

      <form.Field
        name="technologyIds"
        children={(field) => (
          <ProjectTechPicker
            technologies={technologies}
            selectedIds={field.state.value as string[]}
            onToggle={handleTechToggle}
          />
        )}
      />

      <div className="pt-2">
        <form.Field
          name="featured"
          children={(field) => (
            <CCheckbox
              label="Feature this project on Homepage"
              checked={field.state.value as boolean}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
          )}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t-2 border-border">
        <div>
          {project && form.getFieldValue("slug") && (
            <CButton
              title="Preview Draft"
              type="button"
              variant="outline"
              onClick={() => {
                const frontendUrl =
                  process.env.NEXT_PUBLIC_FRONTEND_URL ||
                  "http://localhost:3000";
                const secret =
                  process.env.NEXT_PUBLIC_PREVIEW_SECRET ||
                  "dev-preview-secret-key";
                window.open(
                  `${frontendUrl}/projects/${form.getFieldValue("slug")}?preview=${secret}`,
                  "_blank",
                );
              }}
              className="border-2 border-border font-bold w-full sm:w-auto"
              icon={<Eye className="w-4 h-4 mr-2" />}
            />
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
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
      </div>
    </form>
  );
}
