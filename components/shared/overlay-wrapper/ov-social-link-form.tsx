"use client";

import React, { useState, useEffect } from "react";
import CInput from "@/components/shared/form/input";
import CButton from "@/components/shared/custome/c-button";
import {
  useCreateSocialLink,
  useUpdateSocialLink,
} from "@/services/socialLinkService";
import { Loader2 } from "lucide-react";

export interface OvSocialLinkFormProps {
  socialLink?: ICmsSocialLink | null;
  onClose?: () => void;
}

export default function OvSocialLinkForm({
  socialLink,
  onClose,
}: OvSocialLinkFormProps) {
  const { createSocialLink, isLoading: isCreating } = useCreateSocialLink();
  const { updateSocialLink, isLoading: isUpdating } = useUpdateSocialLink();

  const [formData, setFormData] = useState({
    platform: "github",
    label: "",
    url: "",
    icon: "",
    sortOrder: 0,
    visible: true,
  });

  useEffect(() => {
    if (socialLink) {
      setFormData({
        platform: socialLink.platform,
        label: socialLink.label,
        url: socialLink.url,
        icon: socialLink.icon || "",
        sortOrder: socialLink.sortOrder,
        visible: socialLink.visible,
      });
    } else {
      setFormData({
        platform: "github",
        label: "",
        url: "",
        icon: "",
        sortOrder: 0,
        visible: true,
      });
    }
  }, [socialLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socialLink) {
      updateSocialLink(
        { id: socialLink.id, payload: formData },
        { onSuccess: () => onClose?.() },
      );
    } else {
      createSocialLink(formData, { onSuccess: () => onClose?.() });
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-1">
      <CInput
        label="Platform *"
        value={formData.platform}
        onChange={(e) =>
          setFormData((p) => ({ ...p, platform: e.target.value }))
        }
        required
        placeholder="github, linkedin, twitter, etc."
        className="border-2 border-border"
      />

      <CInput
        label="Display Label *"
        value={formData.label}
        onChange={(e) => setFormData((p) => ({ ...p, label: e.target.value }))}
        required
        placeholder="e.g. GitHub Profile"
        className="border-2 border-border"
      />

      <CInput
        type="url"
        label="Destination URL *"
        value={formData.url}
        onChange={(e) => setFormData((p) => ({ ...p, url: e.target.value }))}
        required
        placeholder="https://..."
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
