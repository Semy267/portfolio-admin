"use client";

import { CRadio } from "../radio";

export default function CRadioForm({
  name,
  validators,
  label,
  value,
  form,
  field,
  opt,
  ...props
}: CRadioFormProps) {
  return (
    <form.Field
      name={name}
      validators={validators}
      children={(field: any) => {
        const selectedValue = field.state.value;
        const isError = field && !!field.state.meta.errors.length;

        const renderRadio = (label: string, value: string) => (
          <CRadio
            key={value}
            label={label}
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={() => field.handleChange(value)}
            onBlur={field.handleBlur}
            {...props}
          />
        );

        return (
          <div className="flex flex-col gap-2">
            {!!opt?.length
              ? opt?.map((opt) => renderRadio(opt.label, opt.value))
              : renderRadio(label ?? "", value ?? "")}
            {isError && <em>{field.state.meta.errors?.[0]?.message}</em>}
          </div>
        );
      }}
    />
  );
}
