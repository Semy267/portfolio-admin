"use client";

import React, { useState } from "react";
import { Search, ImageOff } from "lucide-react";
import CInput from "@/components/shared/form/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MediaCard } from "./media-card";

interface MediaGridProps {
  media: ICmsMedia[];
  isLoading?: boolean;
  selectable?: boolean;
  selectedId?: string | null;
  onSelect?: (media: ICmsMedia) => void;
}

export function MediaGrid({
  media,
  isLoading,
  selectable = false,
  selectedId,
  onSelect,
}: MediaGridProps) {
  const [search, setSearch] = useState("");

  const filteredMedia = media.filter((item) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      item.filename.toLowerCase().includes(query) ||
      (item.altText && item.altText.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <CInput
          placeholder="Search media by filename..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconSvg={Search}
          className="border-2 border-border"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              className="border-2 border-border aspect-video shadow-hard"
            />
          ))}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border bg-card text-center p-6 shadow-hard">
          <ImageOff className="w-12 h-12 text-muted-foreground mb-3" />
          <h3 className="font-bold text-lg">No media found</h3>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            {search
              ? "Try adjusting your search query."
              : "Upload your first image to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <MediaCard
              key={item.id}
              media={item}
              selectable={selectable}
              isSelected={selectedId === item.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
