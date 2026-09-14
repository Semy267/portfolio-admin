"use client";

import React, { useState } from "react";
import { useGetMedia } from "@/services/mediaService";
import { MediaGrid } from "@/components/module/media/media-grid";
import { MediaUploadButton } from "@/components/module/media/media-upload-button";
import CButton from "@/components/shared/custome/c-button";

export interface OvMediaPickerProps {
  selectedId?: string | null;
  onSelect?: (media: ICmsMedia) => void;
  onClose?: () => void;
}

export default function OvMediaPicker({
  selectedId: initialSelectedId,
  onSelect,
  onClose,
}: OvMediaPickerProps) {
  const { media, isLoading } = useGetMedia();
  const [selectedMedia, setSelectedMedia] = useState<ICmsMedia | null>(null);

  const activeId = selectedMedia?.id || initialSelectedId;

  const handleMediaClick = (item: ICmsMedia) => {
    setSelectedMedia(item);
  };

  const handleConfirm = () => {
    if (selectedMedia) {
      onSelect?.(selectedMedia);
      onClose?.();
    }
  };

  return (
    <div className="space-y-4 max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-border">
        <div>
          <h2 className="text-lg font-black uppercase">Select Media</h2>
          <p className="text-xs text-muted-foreground font-mono">
            Choose an existing image or upload a new one.
          </p>
        </div>
        <MediaUploadButton
          variant="outline"
          className="border-2 border-border"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-1 min-h-[300px]">
        <MediaGrid
          media={media}
          isLoading={isLoading}
          selectable
          selectedId={activeId}
          onSelect={handleMediaClick}
        />
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t-2 border-border">
        <CButton
          title="Cancel"
          type="button"
          variant="outline"
          onClick={() => onClose?.()}
          className="border-2 border-border font-bold"
        />
        <CButton
          title="Select Image"
          type="button"
          disabled={!selectedMedia}
          onClick={handleConfirm}
          className="border-2 border-border shadow-hard font-bold"
        />
      </div>
    </div>
  );
}
