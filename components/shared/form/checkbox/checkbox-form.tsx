"use client";

import { CCheckbox } from "../checkbox";

export default function CCheckboxForm({
  name,
  label,
  value,
  opt,
  validators,
  form,
  field,
  ...props
}: CCheckboxFormProps) {
  return (
    <form.Field
      name={name}
      validators={validators}
      children={(field: any) => {
        const currentValue: string[] = field.state.value?.split(",") || [];
        const isError = field && !!field.state.meta.errors.length;

        const isChecked = (val: string) => currentValue.includes(val);

        const toggle = (val: string) => {
          const updated = isChecked(val)
            ? currentValue.filter((v) => v !== val)
            : [...currentValue, val];

          field.handleChange(updated.join(","));
        };

        const renderCheckbox = (label: string, val: string) => (
          <CCheckbox
            key={val}
            label={label}
            name={name}
            value={val}
            checked={isChecked(val)}
            onChange={() => toggle(val)}
            onBlur={field.handleBlur}
            {...props}
          />
        );

        return (
          <div className="flex flex-wrap gap-2">
            {opt?.length
              ? opt.map((item) => renderCheckbox(item.label, item.value))
              : renderCheckbox(label ?? "", value!)}
            {isError && (
              <em className="w-full">
                {field.state.meta.errors?.[0]?.message}
              </em>
            )}
          </div>
        );
      }}
    />
  );
}
