import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

type Option = {
  label: string;
  value: string;
};

interface ICSelectMulti {
  className?: string;
  classNameParent?: string;
  classNameContent?: string;
  placeholder?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

export default function CSelectMulti({
  className,
  classNameParent,
  classNameContent,
  placeholder = "Select options",
  options,
  value,
  onChange,
  label,
}: ICSelectMulti) {
  const toggleOption = (optionValue: string) => {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    );
  };

  const displayLabel =
    value.length === 0
      ? placeholder
      : options
          .filter((opt) => value.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ");

  return (
    <div className={cn(classNameParent)}>
      {label && <Label className="mb-1 block">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full input flex items-center justify-between text-sm ring-offset-background data-placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border border-border bg-input text-foreground",
              className,
            )}
          >
            <span className="truncate">{displayLabel}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "p-1 relative z-50 w-full max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            classNameContent,
          )}
        >
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm hover:bg-accent",
                  isSelected && "bg-accent text-accent-foreground",
                )}
              >
                {option.label}
                {isSelected && <Check className="w-4 h-4 opacity-80" />}
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
