"use client";

import React, { useEffect, useState } from "react";
import { useGetTheme, useUpdateTheme } from "@/services/themeService";
import {
  ThemeForm,
  ThemeFormValues,
  DEFAULT_THEME_VALUES,
} from "@/components/module/appearance/theme-form";
import { ThemePreview } from "@/components/module/appearance/theme-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { Palette } from "lucide-react";

export default function AppearancePage() {
  const { theme, isLoading } = useGetTheme();
  const { updateTheme, isLoading: isSaving } = useUpdateTheme();
  const [values, setValues] = useState<ThemeFormValues>(DEFAULT_THEME_VALUES);

  useEffect(() => {
    if (theme) {
      setValues({
        primaryColor: theme.primaryColor || DEFAULT_THEME_VALUES.primaryColor,
        secondaryColor:
          theme.secondaryColor || DEFAULT_THEME_VALUES.secondaryColor,
        backgroundColor:
          theme.backgroundColor || DEFAULT_THEME_VALUES.backgroundColor,
        surfaceColor: theme.surfaceColor || DEFAULT_THEME_VALUES.surfaceColor,
        textColor: theme.textColor || DEFAULT_THEME_VALUES.textColor,
        borderColor: theme.borderColor || DEFAULT_THEME_VALUES.borderColor,
        borderWidth: theme.borderWidth || DEFAULT_THEME_VALUES.borderWidth,
        shadowX: theme.shadowX || DEFAULT_THEME_VALUES.shadowX,
        shadowY: theme.shadowY || DEFAULT_THEME_VALUES.shadowY,
        borderRadius: theme.borderRadius || DEFAULT_THEME_VALUES.borderRadius,
      });
    }
  }, [theme]);

  const handleChange = (field: keyof ThemeFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setValues(DEFAULT_THEME_VALUES);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(values);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Appearance & Design Tokens
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Customize colors, border geometry, and hard shadow offsets for the
            public portfolio.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-card p-6 border-2 border-border shadow-hard">
            <ThemeForm
              values={values}
              onChange={handleChange}
              onReset={handleReset}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
          </div>

          <div className="lg:col-span-5 space-y-4 sticky top-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
              Live Preview
            </h2>
            <ThemePreview values={values} />
          </div>
        </div>
      )}
    </div>
  );
}
