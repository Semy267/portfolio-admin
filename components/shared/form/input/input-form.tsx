"use client";

import CInput from ".";

export default function CInputForm({
  name,
  validators,
  label,
  form,
  field,
  iconSvg,
  iconImg,
  iconSize,
  ...props
}: ICinput) {
  return (
    <form.Field
      name={name}
      validators={validators}
      children={(field: any) => {
        const isError = field && !!field.state.meta.errors.length;
        return (
          <div>
            <CInput
              label={label}
              name={name}
              value={field.state.value as string}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              iconSvg={iconSvg}
              iconImg={iconImg}
              iconSize={iconSize}
              field={field}
              {...props}
            />

            {isError && (
              <em>
                {field.state.meta.errors?.map((err: any) => err.message)?.[0]}
              </em>
            )}
          </div>
        );
      }}
    />
  );
}
