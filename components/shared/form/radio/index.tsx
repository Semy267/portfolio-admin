import { cn } from "@/lib/utils";
import React from "react";
import Label from "../../label";

type CRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const CRadio: React.FC<CRadioProps> = ({
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
      <input {...props} id={id} type="radio" className="peer hidden" />
      <div
        className={cn(
          "w-5 h-5 rounded-full border border-border flex items-center justify-center",
          "peer-checked:border-primary peer-checked:border-[5px] transition",
          className,
        )}
      >
        <div className="w-2.5 h-2.5 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform" />
      </div>
      {label && <Label label={label} />}
    </label>
  );
};
