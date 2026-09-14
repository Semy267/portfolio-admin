"use client";

import React from "react";
import { Label } from "@/components/ui/label";

interface ProjectTechPickerProps {
  technologies: ICmsTechnology[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ProjectTechPicker({
  technologies,
  selectedIds,
  onToggle,
}: ProjectTechPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-mono font-bold uppercase">
        Technologies
      </Label>
      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 border-2 border-border bg-muted/20">
        {technologies.map((tech) => {
          const isSelected = selectedIds.includes(tech.id);
          return (
            <button
              key={tech.id}
              type="button"
              onClick={() => onToggle(tech.id)}
              className={`text-xs px-2.5 py-1 border-2 font-bold transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground border-border shadow-hard"
                  : "bg-card border-border hover:bg-muted"
              }`}
            >
              {tech.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
