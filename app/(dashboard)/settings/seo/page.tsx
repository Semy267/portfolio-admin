"use client";

import React, { useEffect, useState } from "react";
import {
  useGetSiteSettings,
  useUpdateSiteSettings,
} from "@/services/siteService";
import { SeoForm, SeoFormValues } from "@/components/module/settings/seo-form";
import { SeoPreview } from "@/components/module/settings/seo-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const DEFAULT_SEO_VALUES: SeoFormValues = {
  siteName: "",
  siteDescription: "",
  contactEmail: "",
  ogImageMediaId: null,
  ogImageUrl: null,
};

export default function SeoSettingsPage() {
  const { siteSettings, isLoading } = useGetSiteSettings();
  const { updateSiteSettings, isLoading: isSaving } = useUpdateSiteSettings();
  const [values, setValues] = useState<SeoFormValues>(DEFAULT_SEO_VALUES);

  useEffect(() => {
    if (siteSettings) {
      setValues({
        siteName: siteSettings.siteName || "",
        siteDescription: siteSettings.siteDescription || "",
        contactEmail: siteSettings.contactEmail || "",
        ogImageMediaId: siteSettings.ogImageMediaId || null,
        ogImageUrl: siteSettings.ogImageUrl || null,
      });
    }
  }, [siteSettings]);

  const handleChange = (field: keyof SeoFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      siteName: values.siteName,
      siteDescription: values.siteDescription,
      contactEmail: values.contactEmail,
      ogImageMediaId: values.ogImageMediaId,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-2 border-border pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6" />
            SEO & Site Metadata
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Configure global website meta titles, meta descriptions, and Open
            Graph social sharing cards.
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
            <SeoForm
              values={values}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
          </div>

          <div className="lg:col-span-5 space-y-4 sticky top-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
              Search & Social Preview
            </h2>
            <SeoPreview
              siteName={values.siteName}
              siteDescription={values.siteDescription}
              ogImageUrl={values.ogImageUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
}
