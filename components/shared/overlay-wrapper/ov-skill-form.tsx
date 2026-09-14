"use client";

import React, { useState, useEffect } from "react";
import CInput from "@/components/shared/form/input";
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

  const [formData, setFormData] = useState({
    name: "",
    category: "ENGINEERING",
    sortOrder: 0,
    visible: true,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        sortOrder: skill.sortOrder,
        visible: skill.visible,
      });
    } else {
      setFormData({
        name: "",
        category: "ENGINEERING",
        sortOrder: 0,
        visible: true,
      });
    }
  }, [skill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill) {
      updateSkill(
        { id: skill.id, payload: formData },
        { onSuccess: () => onClose?.() },
      );
    } else {
      createSkill(formData, { onSuccess: () => onClose?.() });
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
      <CInput
        label="Name *"
        value={formData.name}
        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
        required
        className="border-2 border-border"
      />

      <CInput
        label="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData((p) => ({ ...p, category: e.target.value }))
        }
        required
        placeholder="e.g. ENGINEERING, DATABASE, DESIGN"
        className="border-2 border-border"
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

      <div className="pt-2">
        <CCheckbox
          label="Visible on Portfolio"
          checked={formData.visible}
          onChange={(e) =>
            setFormData((p) => ({ ...p, visible: e.target.checked }))
          }
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
