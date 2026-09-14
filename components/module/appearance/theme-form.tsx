"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw, Save } from "lucide-react";

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
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase">Border Width</Label>
            <select
              value={values.borderWidth}
              onChange={(e) => onChange("borderWidth", e.target.value)}
              className="w-full h-10 border-2 border-border bg-input px-2 text-sm font-bold"
            >
              <option value="1px">1px</option>
              <option value="2px">2px (Default)</option>
              <option value="3px">3px</option>
              <option value="4px">4px</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase">Shadow X</Label>
            <select
              value={values.shadowX}
              onChange={(e) => onChange("shadowX", e.target.value)}
              className="w-full h-10 border-2 border-border bg-input px-2 text-sm font-bold"
            >
              <option value="2px">2px</option>
              <option value="4px">4px (Default)</option>
              <option value="6px">6px</option>
              <option value="8px">8px</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase">Shadow Y</Label>
            <select
              value={values.shadowY}
              onChange={(e) => onChange("shadowY", e.target.value)}
              className="w-full h-10 border-2 border-border bg-input px-2 text-sm font-bold"
            >
              <option value="2px">2px</option>
              <option value="4px">4px (Default)</option>
              <option value="6px">6px</option>
              <option value="8px">8px</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase">Radius</Label>
            <select
              value={values.borderRadius}
              onChange={(e) => onChange("borderRadius", e.target.value)}
              className="w-full h-10 border-2 border-border bg-input px-2 text-sm font-bold"
            >
              <option value="0px">0px (Brutal)</option>
              <option value="2px">2px</option>
              <option value="4px">4px</option>
              <option value="8px">8px</option>
            </select>
          </div>
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
