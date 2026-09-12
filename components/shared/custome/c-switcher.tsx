import React from "react";
import { cn } from "@/lib/utils";

type CSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export const CSwitch: React.FC<CSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out border border-transparent",
        checked ? "bg-primary border-primary" : "bg-secondary border-border",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white dark:bg-slate-200 shadow-sm transition-all duration-300 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
};
