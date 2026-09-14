"use client";

import React from "react";
import CImage from "@/components/shared/custome/c-image";
import { Image as ImageIcon, X } from "lucide-react";
import { useDialog } from "@/lib/hooks";
import { getMediaUrl } from "@/lib/media";
import CButton from "@/components/shared/custome/c-button";

interface ProjectThumbnailPickerProps {
  thumbnailId?: string | null;
  thumbnailUrl?: string | null;
  onChange: (mediaId: string | null, mediaUrl?: string | null) => void;
}

export function ProjectThumbnailPicker({
  thumbnailId,
  thumbnailUrl,
  onChange,
}: ProjectThumbnailPickerProps) {
  const mediaPicker = useDialog("ov_media_picker");

  const handleOpenPicker = () => {
    mediaPicker.open({
      selectedId: thumbnailId,
      onSelect: (media: ICmsMedia) => {
        onChange(media.id, media.url);
      },
    });
  };

  const handleRemove = () => {
    onChange(null, null);
  };

  const previewUrl = thumbnailUrl ? getMediaUrl(thumbnailUrl) : null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold block">Project Thumbnail</label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 border-2 border-border bg-card shadow-sm">
        <div className="relative w-36 aspect-video bg-muted border-2 border-border overflow-hidden shrink-0 flex items-center justify-center">
          {previewUrl ? (
            <CImage
              src={previewUrl}
              alt="Project thumbnail"
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
            title={thumbnailId ? "Change Image" : "Select Image"}
          />

          {thumbnailId && (
            <CButton
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="border-2 border-border"
              icon={<X className="w-3.5 h-3.5 mr-1" />}
              title="Remove"
            />
          )}
        </div>
      </div>
    </div>
  );
}
