"use client";

import React from "react";
import CImage from "@/components/shared/custome/c-image";
import { Globe, Image as ImageIcon } from "lucide-react";
import { getMediaUrl } from "@/lib/media";

interface SeoPreviewProps {
  siteName: string;
  siteDescription: string;
  ogImageUrl?: string | null;
}

export function SeoPreview({
  siteName,
  siteDescription,
  ogImageUrl,
}: SeoPreviewProps) {
  const displayTitle = siteName || "Salman | Personal Portfolio";
  const displayDesc =
    siteDescription ||
    "Personal portfolio showcasing software engineering projects, technical skills, and journey.";
  const fullOgUrl = ogImageUrl ? getMediaUrl(ogImageUrl) : null;

  return (
    <div className="space-y-6">
      {/* Google Search Engine Preview */}
      <div className="bg-card border-2 border-border p-4 shadow-hard space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>Google Search Snippet</span>
        </div>
        <div className="p-3 bg-muted/40 border border-border rounded space-y-1">
          <div className="text-xs text-muted-foreground truncate">
            https://yourdomain.com
          </div>
          <div className="text-base font-bold text-primary hover:underline cursor-pointer truncate">
            {displayTitle}
          </div>
          <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {displayDesc}
          </div>
        </div>
      </div>

      {/* Social Card Preview (Open Graph / Twitter Card) */}
      <div className="bg-card border-2 border-border p-4 shadow-hard space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase font-bold">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Social Share Card (OG Preview)</span>
        </div>
        <div className="border-2 border-border overflow-hidden bg-background">
          <div className="relative w-full aspect-video bg-muted flex items-center justify-center border-b-2 border-border">
            {fullOgUrl ? (
              <CImage
                src={fullOgUrl}
                alt="OG Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                <ImageIcon className="w-10 h-10 stroke-1" />
                <span className="text-xs font-mono">No OG Image Selected</span>
              </div>
            )}
          </div>
          <div className="p-3 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              yourdomain.com
            </span>
            <h4 className="font-bold text-sm text-foreground truncate">
              {displayTitle}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {displayDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
