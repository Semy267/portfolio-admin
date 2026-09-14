"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CSelect from "@/components/shared/form/select";
import { RotateCcw, Save } from "lucide-react";

const BORDER_WIDTH_OPTIONS = [
  { label: "1px", value: "1px" },
  { label: "2px (Default)", value: "2px" },
  { label: "3px", value: "3px" },
  { label: "4px", value: "4px" },
];

const SHADOW_OPTIONS = [
  { label: "2px", value: "2px" },
  { label: "4px (Default)", value: "4px" },
  { label: "6px", value: "6px" },
  { label: "8px", value: "8px" },
];

const RADIUS_OPTIONS = [
  { label: "0px (Brutal)", value: "0px" },
  { label: "2px", value: "2px" },
  { label: "4px", value: "4px" },
  { label: "8px", value: "8px" },
];

export interface ThemeFormValues {
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
}

export const DEFAULT_THEME_VALUES: ThemeFormValues = {
  primaryColor: "#1d4ed8",
  secondaryColor: "#e8e4d8",
  backgroundColor: "#f3f0e8",
  surfaceColor: "#fafaf7",
  textColor: "#0a0a0a",
  borderColor: "#0a0a0a",
  borderWidth: "2px",
  shadowX: "4px",
  shadowY: "4px",
  borderRadius: "0px",
};

interface ThemeFormProps {
  values: ThemeFormValues;
  onChange: (field: keyof ThemeFormValues, value: string) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}

interface ColorFieldProps {
  label: string;
  name: keyof ThemeFormValues;
  value: string;
  onChange: (field: keyof ThemeFormValues, value: string) => void;
}

const ColorField: React.FC<ColorFieldProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-bold uppercase">{label}</Label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value.startsWith("#") && value.length === 7 ? value : "#000000"}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-10 h-10 border-2 border-border cursor-pointer p-0.5 bg-background"
      />
      <Input
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder="#000000"
        className="font-mono text-xs uppercase"
      />
    </div>
  </div>
);

export const ThemeForm: React.FC<ThemeFormProps> = ({
  values,
  onChange,
  onReset,
  onSubmit,
  isSaving,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm font-black uppercase tracking-wider mb-3 text-muted-foreground">
          Color Palette
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorField
            label="Primary Color"
            name="primaryColor"
            value={values.primaryColor}
            onChange={onChange}
          />
          <ColorField
            label="Secondary Color"
            name="secondaryColor"
            value={values.secondaryColor}
            onChange={onChange}
          />
          <ColorField
            label="Background Color"
            name="backgroundColor"
            value={values.backgroundColor}
            onChange={onChange}
          />
          <ColorField
            label="Surface Color"
            name="surfaceColor"
            value={values.surfaceColor}
            onChange={onChange}
          />
          <ColorField
            label="Text Color"
            name="textColor"
            value={values.textColor}
            onChange={onChange}
          />
          <ColorField
            label="Border Color"
            name="borderColor"
            value={values.borderColor}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="border-t-2 border-border pt-4">
        <h3 className="text-sm font-black uppercase tracking-wider mb-3 text-muted-foreground">
          Geometry & Shadows
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CSelect
            label="Border Width"
            value={values.borderWidth}
            onChange={(val) => onChange("borderWidth", val)}
            options={BORDER_WIDTH_OPTIONS}
            className="w-full border-2 border-border bg-input font-bold text-sm"
            classNameParent="space-y-1.5 [&>label]:text-xs [&>label]:font-bold [&>label]:uppercase"
          />

          <CSelect
            label="Shadow X"
            value={values.shadowX}
            onChange={(val) => onChange("shadowX", val)}
            options={SHADOW_OPTIONS}
            className="w-full border-2 border-border bg-input font-bold text-sm"
            classNameParent="space-y-1.5 [&>label]:text-xs [&>label]:font-bold [&>label]:uppercase"
          />

          <CSelect
            label="Shadow Y"
            value={values.shadowY}
            onChange={(val) => onChange("shadowY", val)}
            options={SHADOW_OPTIONS}
            className="w-full border-2 border-border bg-input font-bold text-sm"
            classNameParent="space-y-1.5 [&>label]:text-xs [&>label]:font-bold [&>label]:uppercase"
          />

          <CSelect
            label="Radius"
            value={values.borderRadius}
            onChange={(val) => onChange("borderRadius", val)}
            options={RADIUS_OPTIONS}
            className="w-full border-2 border-border bg-input font-bold text-sm"
            classNameParent="space-y-1.5 [&>label]:text-xs [&>label]:font-bold [&>label]:uppercase"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t-2 border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="gap-2 font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>

        <Button
          type="submit"
          disabled={isSaving}
          className="gap-2 font-bold bg-primary text-primary-foreground shadow-hard"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Appearance"}
        </Button>
      </div>
    </form>
  );
};
