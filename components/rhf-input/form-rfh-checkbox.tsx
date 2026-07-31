"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type FormRhfCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  className?: string;
};

export default function FormRhfCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  className,
}: FormRhfCheckboxProps<T>) {
  const id = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            orientation='horizontal'
            className='items-center gap-3'
          >
            <Checkbox
              id={id}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              className={cn(
                "data-[state=checked]:bg-brand",
                "data-[state=checked]:border-brand",
                className,
              )}
            />

            <FieldLabel
              htmlFor={id}
              className='font-medium text-foreground cursor-pointer'
            >
              {label}
            </FieldLabel>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
