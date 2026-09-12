import React from "react";
import Label from "@/components/shared/label";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";

type CCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const CCheckbox: React.FC<CCheckboxProps> = ({
  label,
  className,
  ...props
}) => {
  const id = React.useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        props.disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input id={id} type="checkbox" {...props} className="peer hidden" />
      <div
        className={cn(
          "w-5 h-5 border border-border rounded-sm flex items-center justify-center transition",
          "peer-checked:bg-primary peer-checked:border-primary",
          className,
        )}
      >
        {props.checked && <FaCheck className="text-white" size={12} />}
      </div>
      {label && <Label label={label} />}
    </label>
  );
};
