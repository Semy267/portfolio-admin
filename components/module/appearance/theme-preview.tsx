"use client";

import React from "react";

interface ThemePreviewProps {
  values: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    surfaceColor: string;
    textColor: string;
    borderColor: string;
    borderWidth: string;
    shadowX: string;
    shadowY: string;
    borderRadius: string;
  };
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ values }) => {
  const cardShadow = `${values.shadowX} ${values.shadowY} 0 ${values.borderColor}`;

  return (
    <div
      className="p-6 transition-colors duration-200"
      style={{
        backgroundColor: values.backgroundColor || "#f3f0e8",
        border: `${values.borderWidth || "2px"} solid ${values.borderColor || "#0a0a0a"}`,
        borderRadius: values.borderRadius || "0px",
      }}
    >
      <div className="mb-4">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2 py-1 inline-block"
          style={{
            backgroundColor: values.secondaryColor || "#e8e4d8",
            color: values.textColor || "#0a0a0a",
            border: `${values.borderWidth || "2px"} solid ${values.borderColor || "#0a0a0a"}`,
            borderRadius: values.borderRadius || "0px",
          }}
        >
          Live Preview
        </span>
      </div>

      <div
        className="p-5 mb-4"
        style={{
          backgroundColor: values.surfaceColor || "#fafaf7",
          color: values.textColor || "#0a0a0a",
          border: `${values.borderWidth || "2px"} solid ${values.borderColor || "#0a0a0a"}`,
          borderRadius: values.borderRadius || "0px",
          boxShadow: cardShadow,
        }}
      >
        <h3
          className="text-lg font-black uppercase mb-1"
          style={{ color: values.textColor || "#0a0a0a" }}
        >
          Neo-Brutalist Component
        </h3>
        <p
          className="text-sm font-medium mb-4"
          style={{ color: values.textColor || "#0a0a0a", opacity: 0.85 }}
        >
          This is an interactive preview showing how your selected colors,
          borders, and shadows appear together.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-4 py-2 font-bold text-sm uppercase transition-transform active:translate-x-0.5 active:translate-y-0.5"
            style={{
              backgroundColor: values.primaryColor || "#1d4ed8",
              color: "#ffffff",
              border: `${values.borderWidth || "2px"} solid ${values.borderColor || "#0a0a0a"}`,
              borderRadius: values.borderRadius || "0px",
              boxShadow: `${values.shadowX} ${values.shadowY} 0 ${values.borderColor || "#0a0a0a"}`,
            }}
          >
            Primary Action
          </button>

          <button
            type="button"
            className="px-4 py-2 font-bold text-sm uppercase"
            style={{
              backgroundColor: values.secondaryColor || "#e8e4d8",
              color: values.textColor || "#0a0a0a",
              border: `${values.borderWidth || "2px"} solid ${values.borderColor || "#0a0a0a"}`,
              borderRadius: values.borderRadius || "0px",
            }}
          >
            Secondary
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
        <span>Tokens:</span>
        <span className="bg-background px-1.5 py-0.5 border border-border">
          {values.borderWidth} / {values.shadowX} {values.shadowY} / r:
          {values.borderRadius}
        </span>
      </div>
    </div>
  );
};
