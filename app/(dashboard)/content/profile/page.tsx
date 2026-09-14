"use client";

import React, { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "@/services/profileService";
import CInput from "@/components/shared/form/input";
import CTextarea from "@/components/shared/form/textarea/c-textarea";
import CButton from "@/components/shared/custome/c-button";
import { Loader2, Save } from "lucide-react";

export default function ProfilePage() {
  const { profile, isLoading } = useGetProfile();
  const { updateProfile, isLoading: isSaving } = useUpdateProfile();

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    bio: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        headline: profile.headline || "",
        bio: profile.bio || "",
        email: profile.email || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b-2 border-border pb-4">
        <h1 className="text-2xl font-black tracking-tight">
          Profile Information
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the primary biography, headline, and public contact information
          displayed across your portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border-2 border-border p-6 bg-card shadow-hard"
      >
        <CInput
          label="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="border-2 border-border font-medium"
        />

        <CInput
          label="Headline / Job Title *"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="e.g. Senior Fullstack Engineer & Designer"
          required
          className="border-2 border-border font-medium"
        />

        <CTextarea
          label="Biography *"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Describe your background, specialties, and experience..."
          required
          className="border-2 border-border font-medium"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CInput
            label="Public Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contact@domain.com"
            required
            className="border-2 border-border font-medium"
          />

          <CInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Jakarta, Indonesia"
            className="border-2 border-border font-medium"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <CButton
            title="Save Profile"
            type="submit"
            disabled={isSaving}
            className="font-bold border-2 border-border shadow-hard"
            icon={
              isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )
            }
          />
        </div>
      </form>
    </div>
  );
}
