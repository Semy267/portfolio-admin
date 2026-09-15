"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import CInputForm from "@/components/shared/form/input/input-form";
import { CCheckbox } from "@/components/shared/form/checkbox";
import CButton from "@/components/shared/custome/c-button";
import { useCreateSkill, useUpdateSkill } from "@/services/skillService";
import { Loader2 } from "lucide-react";

export interface OvSkillFormProps {
  skill?: ICmsSkill | null;
  onClose?: () => void;
}

export default function OvSkillForm({ skill, onClose }: OvSkillFormProps) {
  const { createSkill, isLoading: isCreating } = useCreateSkill();
  const { updateSkill, isLoading: isUpdating } = useUpdateSkill();

  const form = useForm({
    defaultValues: {
      name: skill?.name || "",
      category: skill?.category || "ENGINEERING",
      sortOrder: skill?.sortOrder || 0,
      visible: skill?.visible ?? true,
    },
    onSubmit: async ({ value }) => {
      if (skill) {
        updateSkill(
          { id: skill.id, payload: value },
          { onSuccess: () => onClose?.() },
        );
      } else {
        createSkill(value, { onSuccess: () => onClose?.() });
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
      />

      <CInputForm
        form={form}
        name="category"
        label="Category"
        required
        placeholder="e.g. ENGINEERING, DATABASE, DESIGN"
        className="border-2 border-border"
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

      <div className="pt-2">
        <form.Field
          name="visible"
          children={(field) => (
            <CCheckbox
              label="Visible on Portfolio"
              checked={field.state.value as boolean}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
          )}
        />
      </div>

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
