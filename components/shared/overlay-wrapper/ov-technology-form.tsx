"use client";

import React, { useState, useEffect } from "react";
import CInput from "@/components/shared/form/input";
import CSelect from "@/components/shared/form/select";
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

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "FRONTEND",
    icon: "",
    sortOrder: 0,
  });

  useEffect(() => {
    if (technology) {
      setFormData({
        name: technology.name,
        slug: technology.slug,
        category: technology.category,
        icon: technology.icon || "",
        sortOrder: technology.sortOrder,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        category: "FRONTEND",
        icon: "",
        sortOrder: 0,
      });
    }
  }, [technology]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (technology) {
      updateTechnology(
        { id: technology.id, payload: formData },
        { onSuccess: () => onClose?.() },
      );
    } else {
      createTechnology(formData, { onSuccess: () => onClose?.() });
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
      <CInput
        label="Name *"
        value={formData.name}
        onChange={(e) => {
          const name = e.target.value;
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          setFormData((p) => ({
            ...p,
            name,
            slug: technology ? p.slug : slug,
          }));
        }}
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

      <CSelect
        label="Category"
        options={CATEGORY_OPTIONS}
        value={formData.category}
        onChange={(val) => setFormData((p) => ({ ...p, category: val }))}
        className="w-full border-2 border-border font-bold text-sm"
      />

      <CInput
        type="number"
        label="Sort Order"
        value={String(formData.sortOrder)}
        onChange={(e) =>
          setFormData((p) => ({ ...p, sortOrder: Number(e.target.value) }))
        }
        className="border-2 border-border"
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
