import { Label } from "@/components/ui/label";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function CSelect({
  className,
  classNameParent,
  classNameContent,
  placeholder,
  options,
  value,
  onChange,
  label,
  trigger,
}: ICSelect) {
  return (
    <div className={cn(classNameParent)}>
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={(e) => onChange(e)}>
        {trigger ? (
          <SelectTrigger className={cn(className)}>{trigger}</SelectTrigger>
        ) : (
          <SelectTrigger className={cn(className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        )}
        <SelectContent className={classNameContent}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
