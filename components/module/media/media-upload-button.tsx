"use client";

import React, { useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import CButton from "@/components/shared/custome/c-button";
import { useUploadMedia } from "@/services/mediaService";

interface MediaUploadButtonProps {
  onSuccess?: () => void;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export function MediaUploadButton({
  onSuccess,
  className,
  variant = "default",
}: MediaUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMedia, isLoading } = useUploadMedia();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    uploadMedia(formData, {
      onSuccess: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onSuccess?.();
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />
      <CButton
        type="button"
        variant={variant}
        disabled={isLoading}
        onClick={handleButtonClick}
        className={className}
        icon={
          isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )
        }
        title={isLoading ? "Uploading..." : "Upload Media"}
      />
    </div>
  );
}
