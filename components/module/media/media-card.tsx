"use client";

import React, { useState } from "react";
import CImage from "@/components/shared/custome/c-image";
import { Copy, Trash2, Check } from "lucide-react";
import { getMediaUrl, formatBytes } from "@/lib/media";
import { showMsg } from "@/lib/utils";
import { useDialog } from "@/lib/hooks";
import { useDeleteMedia } from "@/services/mediaService";
import CButton from "@/components/shared/custome/c-button";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  media: ICmsMedia;
  isSelected?: boolean;
  onSelect?: (media: ICmsMedia) => void;
  selectable?: boolean;
}

export function MediaCard({
  media,
  isSelected,
  onSelect,
  selectable = false,
}: MediaCardProps) {
  const [copied, setCopied] = React.useState(false);
  const confirmDialog = useDialog("ov_confirmation");
  const { deleteMedia, isLoading: isDeleting } = useDeleteMedia();

  const fullUrl = getMediaUrl(media.url);

  const handleCopyUrl = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    showMsg({ type: "success", title: "Media URL copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    confirmDialog.open({
      message: `Are you sure you want to permanently delete "${media.filename}"?`,
      confirmText: "Delete",
      variant: "destructive",
      onConfirm: () => {
        deleteMedia(media.id);
      },
    });
  };

  return (
    <div
      onClick={() => selectable && onSelect?.(media)}
      className={cn(
        "group relative flex flex-col border-2 border-border bg-card transition-all overflow-hidden",
        selectable ? "cursor-pointer hover:shadow-hard" : "shadow-hard",
        isSelected && "ring-4 ring-primary border-primary",
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted border-b-2 border-border">
        {media.url ? (
          <CImage
            src={fullUrl}
            alt={media.altText || media.filename}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-xs">
            No Preview
          </div>
        )}

        {selectable && isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 border-2 border-border shadow-sm">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Metadata & Actions */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2">
        <div>
          <p
            className="text-xs font-bold font-mono truncate text-foreground"
            title={media.filename}
          >
            {media.filename}
          </p>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1 font-mono">
            <span>{formatBytes(media.size)}</span>
            <span>{new Date(media.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t-2 border-border/50">
          <CButton
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 h-7 text-xs border-2 border-border"
            onClick={() => handleCopyUrl()}
            icon={
              copied ? (
                <Check className="w-3 h-3 mr-1 text-green-600" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )
            }
            title={copied ? "Copied" : "Copy URL"}
          />
          <CButton
            type="button"
            size="sm"
            variant="destructive"
            className="h-7 w-7 p-0 border-2 border-border"
            disabled={isDeleting}
            onClick={() => handleDelete()}
          >
            <Trash2 className="w-3 h-3" />
          </CButton>
        </div>
      </div>
    </div>
  );
}
