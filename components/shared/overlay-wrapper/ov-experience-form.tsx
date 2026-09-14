"use client";

import React, { useState, useEffect } from "react";
import CInput from "@/components/shared/form/input";
import CTextarea from "@/components/shared/form/textarea/c-textarea";
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

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    startDate: "",
    endDate: "",
    sortOrder: 0,
    visible: true,
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title,
        organization: experience.organization,
        description: experience.description,
        startDate: experience.startDate
          ? new Date(experience.startDate).toISOString().split("T")[0] || ""
          : "",
        endDate: experience.endDate
          ? new Date(experience.endDate).toISOString().split("T")[0] || ""
          : "",
        sortOrder: experience.sortOrder,
        visible: experience.visible,
      });
    } else {
      setFormData({
        title: "",
        organization: "",
        description: "",
        startDate: new Date().toISOString().split("T")[0] || "",
        endDate: "",
        sortOrder: 0,
        visible: true,
      });
    }
  }, [experience]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      endDate: formData.endDate ? formData.endDate : null,
    };
    if (experience) {
      updateExperience(
        { id: experience.id, payload },
        { onSuccess: () => onClose?.() },
      );
    } else {
      createExperience(payload, { onSuccess: () => onClose?.() });
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 pt-1 max-h-[80vh] overflow-y-auto pr-1"
    >
      <CInput
        label="Role / Job Title *"
        value={formData.title}
        onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
        required
        className="border-2 border-border"
      />

      <CInput
        label="Organization / Company *"
        value={formData.organization}
        onChange={(e) =>
          setFormData((p) => ({ ...p, organization: e.target.value }))
        }
        required
        className="border-2 border-border"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CInput
          type="date"
          label="Start Date *"
          value={formData.startDate}
          onChange={(e) =>
            setFormData((p) => ({ ...p, startDate: e.target.value }))
          }
          required
          className="border-2 border-border font-mono text-sm"
        />

        <CInput
          type="date"
          label="End Date (Empty = Present)"
          value={formData.endDate}
          onChange={(e) =>
            setFormData((p) => ({ ...p, endDate: e.target.value }))
          }
          className="border-2 border-border font-mono text-sm"
        />
      </div>

      <CTextarea
        label="Description *"
        value={formData.description}
        onChange={(e) =>
          setFormData((p) => ({ ...p, description: e.target.value }))
        }
        required
        className="border-2 border-border font-medium"
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
