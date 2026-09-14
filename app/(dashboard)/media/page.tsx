"use client";

import React from "react";
import { useGetMedia } from "@/services/mediaService";
import { MediaUploadButton } from "@/components/module/media/media-upload-button";
import { MediaGrid } from "@/components/module/media/media-grid";

export default function MediaPage() {
  const { media, isLoading } = useGetMedia();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Media Library
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-1">
            Upload, manage, and organize images and static assets.
          </p>
        </div>

        <MediaUploadButton
          variant="default"
          className="shadow-hard border-2 border-border font-bold"
        />
      </div>

      <MediaGrid media={media} isLoading={isLoading} />
    </div>
  );
}
