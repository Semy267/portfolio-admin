"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import CInputForm from "@/components/shared/form/input/input-form";
import CSelectForm from "@/components/shared/form/select/select-form";
import CButton from "@/components/shared/custome/c-button";
import {
  useCreateTechnology,
  useUpdateTechnology,
} from "@/services/technologyService";
import { Loader2 } from "lucide-react";

export interface OvTechnologyFormProps {
  technology?: ICmsTechnology | null;
  onClose?: () => void;
}

const CATEGORY_OPTIONS = [
  { label: "FRONTEND", value: "FRONTEND" },
  { label: "BACKEND", value: "BACKEND" },
  { label: "DATABASE", value: "DATABASE" },
  { label: "TOOLS", value: "TOOLS" },
  { label: "OTHER", value: "OTHER" },
];

export default function OvTechnologyForm({
  technology,
  onClose,
}: OvTechnologyFormProps) {
  const { createTechnology, isLoading: isCreating } = useCreateTechnology();
  const { updateTechnology, isLoading: isUpdating } = useUpdateTechnology();

  const form = useForm({
    defaultValues: {
      name: technology?.name || "",
      slug: technology?.slug || "",
      category: technology?.category || "FRONTEND",
      icon: technology?.icon || "",
      sortOrder: technology?.sortOrder || 0,
    },
    onSubmit: async ({ value }) => {
      if (technology) {
        updateTechnology(
          { id: technology.id, payload: value },
          { onSuccess: () => onClose?.() },
        );
      } else {
        createTechnology(value, { onSuccess: () => onClose?.() });
      }
    },
  });

  const isSaving = isCreating || isUpdating;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 pt-1"
    >
      <CInputForm
        form={form}
        name="name"
        label="Name *"
        required
        className="border-2 border-border"
        onChange={(e) => {
          const name = e.target.value;
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          form.setFieldValue("name", name);
          if (!technology) {
            form.setFieldValue("slug", slug);
          }
        }}
      />

      <CInputForm
        form={form}
        name="slug"
        label="Slug *"
        required
        className="border-2 border-border font-mono text-sm"
      />

      <CSelectForm
        form={form}
        name="category"
        label="Category"
        options={CATEGORY_OPTIONS}
        className="w-full border-2 border-border font-bold text-sm"
      />

      <CInputForm
        form={form}
        name="sortOrder"
        type="number"
        label="Sort Order"
        className="border-2 border-border"
        onChange={(e) => {
          form.setFieldValue("sortOrder", Number(e.target.value));
        }}
      />

      <div className="flex justify-end gap-2 pt-4 border-t-2 border-border">
        <CButton
          title="Cancel"
          type="button"
          variant="outline"
          onClick={() => onClose?.()}
        />
        <CButton
          title="Save"
          type="submit"
          disabled={isSaving}
          className="font-bold border-2 border-border shadow-hard"
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
