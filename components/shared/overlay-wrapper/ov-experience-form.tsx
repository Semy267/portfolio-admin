"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import CInputForm from "@/components/shared/form/input/input-form";
import CTextareaForm from "@/components/shared/form/textarea/c-textarea-form";
import CButton from "@/components/shared/custome/c-button";
import {
  useCreateExperience,
  useUpdateExperience,
} from "@/services/experienceService";
import { Loader2 } from "lucide-react";

export interface OvExperienceFormProps {
  experience?: ICmsExperience | null;
  onClose?: () => void;
}

export default function OvExperienceForm({
  experience,
  onClose,
}: OvExperienceFormProps) {
  const { createExperience, isLoading: isCreating } = useCreateExperience();
  const { updateExperience, isLoading: isUpdating } = useUpdateExperience();

  const form = useForm({
    defaultValues: {
      title: experience?.title || "",
      organization: experience?.organization || "",
      description: experience?.description || "",
      startDate: experience?.startDate
        ? new Date(experience.startDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      endDate: experience?.endDate
        ? new Date(experience.endDate).toISOString().split("T")[0]
        : "",
      sortOrder: experience?.sortOrder || 0,
      visible: experience?.visible ?? true,
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        endDate: value.endDate ? value.endDate : null,
      };
      if (experience) {
        updateExperience(
          { id: experience.id, payload },
          { onSuccess: () => onClose?.() },
        );
      } else {
        createExperience(payload, { onSuccess: () => onClose?.() });
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
      className="space-y-4 pt-1 max-h-[80vh] overflow-y-auto pr-1"
    >
      <CInputForm
        form={form}
        name="title"
        label="Role / Job Title *"
        required
        className="border-2 border-border"
      />

      <CInputForm
        form={form}
        name="organization"
        label="Organization / Company *"
        required
        className="border-2 border-border"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInputForm
          form={form}
          name="startDate"
          type="date"
          label="Start Date *"
          required
          className="border-2 border-border font-mono text-sm"
        />

        <CInputForm
          form={form}
          name="endDate"
          type="date"
          label="End Date (Empty = Present)"
          className="border-2 border-border font-mono text-sm"
        />
      </div>

      <CTextareaForm
        form={form}
        name="description"
        label="Description *"
        required
        className="border-2 border-border font-medium"
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
