"use client";

import React from "react";
import CInput from "@/components/shared/form/input";
import CTextarea from "@/components/shared/form/textarea/c-textarea";
import { Label } from "@/components/ui/label";
import CButton from "@/components/shared/custome/c-button";
import CImage from "@/components/shared/custome/c-image";
import { Image as ImageIcon, Save, X, Globe, Mail } from "lucide-react";
import { useDialog } from "@/lib/hooks";
import { getMediaUrl } from "@/lib/media";

export interface SeoFormValues {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  ogImageMediaId: string | null;
  ogImageUrl: string | null;
}

interface SeoFormProps {
  values: SeoFormValues;
  onChange: (field: keyof SeoFormValues, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}

export function SeoForm({
  values,
  onChange,
  onSubmit,
  isSaving,
}: SeoFormProps) {
  const mediaPicker = useDialog("ov_media_picker");

  const handleOpenPicker = () => {
    mediaPicker.open({
      selectedId: values.ogImageMediaId || undefined,
      onSelect: (media: ICmsMedia) => {
        onChange("ogImageMediaId", media.id);
        onChange("ogImageUrl", media.url);
      },
    });
  };

  const handleRemoveOgImage = () => {
    onChange("ogImageMediaId", null);
    onChange("ogImageUrl", null);
  };

  const previewOgUrl = values.ogImageUrl
    ? getMediaUrl(values.ogImageUrl)
    : null;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Site Name / Meta Title */}
      <div className="space-y-1">
        <CInput
          id="siteName"
          label="Site Title (Brand / Global Title) *"
          iconSvg={Globe}
          value={values.siteName}
          onChange={(e) => onChange("siteName", e.target.value)}
          placeholder="e.g. Salman | Fullstack Developer"
          className="border-2 border-border font-medium"
        />
        <p className="text-xs text-muted-foreground">
          Appears on browser tabs, search engine results, and social cards.
        </p>
      </div>

      {/* Meta Description */}
      <div className="space-y-1">
        <CTextarea
          id="siteDescription"
          label="Meta Description *"
          value={values.siteDescription}
          onChange={(e) => onChange("siteDescription", e.target.value)}
          placeholder="Brief summary of your portfolio and background..."
          className="border-2 border-border font-medium resize-none min-h-[90px]"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Recommended length: 120-160 characters.</span>
          <span className="font-mono">
            {values.siteDescription.length} chars
          </span>
        </div>
      </div>

      {/* Contact / Inquiries Email */}
      <div className="space-y-1">
        <CInput
          id="contactEmail"
          type="email"
          label="Public Contact Email *"
          iconSvg={Mail}
          value={values.contactEmail}
          onChange={(e) => onChange("contactEmail", e.target.value)}
          placeholder="e.g. contact@domain.com"
          className="border-2 border-border font-medium"
        />
        <p className="text-xs text-muted-foreground">
          Used for mailto links and meta inquiry tags.
        </p>
      </div>

      {/* Open Graph (OG) Image */}
      <div className="space-y-2">
        <Label className="font-bold block">Open Graph (OG) Social Image</Label>
        <p className="text-xs text-muted-foreground">
          Recommended size: 1200x630px. Shown when your portfolio URL is shared
          on Twitter/X, LinkedIn, Discord, and WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 border-2 border-border bg-card shadow-sm">
          <div className="relative w-40 aspect-video bg-muted border-2 border-border overflow-hidden shrink-0 flex items-center justify-center">
            {previewOgUrl ? (
              <CImage
                src={previewOgUrl}
                alt="OG Preview"
                fill
                className="object-cover"
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CButton
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenPicker}
              className="border-2 border-border font-bold"
              title={
                values.ogImageMediaId ? "Change OG Image" : "Select OG Image"
              }
            />

            {values.ogImageMediaId && (
              <CButton
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveOgImage}
                className="border-2 border-border"
                icon={<X className="w-3.5 h-3.5 mr-1" />}
                title="Remove"
              />
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t-2 border-border flex justify-end">
        <CButton
          type="submit"
          disabled={isSaving}
          className="border-2 border-border shadow-hard font-black uppercase tracking-wider"
          icon={<Save className="w-4 h-4 mr-2" />}
          title={isSaving ? "Saving..." : "Save SEO Settings"}
        />
      </div>
    </form>
  );
}
