"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import CInputForm from "@/components/shared/form/input/input-form";
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

  const form = useForm({
    defaultValues: {
      platform: socialLink?.platform || "github",
      label: socialLink?.label || "",
      url: socialLink?.url || "",
      icon: socialLink?.icon || "",
      sortOrder: socialLink?.sortOrder || 0,
      visible: socialLink?.visible ?? true,
    },
    onSubmit: async ({ value }) => {
      if (socialLink) {
        updateSocialLink(
          { id: socialLink.id, payload: value },
          { onSuccess: () => onClose?.() },
        );
      } else {
        createSocialLink(value, { onSuccess: () => onClose?.() });
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
        name="platform"
        label="Platform *"
        required
        placeholder="github, linkedin, twitter, etc."
        className="border-2 border-border"
      />

      <CInputForm
        form={form}
        name="label"
        label="Display Label *"
        required
        placeholder="e.g. GitHub Profile"
        className="border-2 border-border"
      />

      <CInputForm
        form={form}
        name="url"
        type="url"
        label="Destination URL *"
        required
        placeholder="https://..."
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
