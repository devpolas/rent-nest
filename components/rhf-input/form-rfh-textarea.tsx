"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormRhfTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  className?: string;
};

export default function FormRhfTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  height = 120,
  className,
}: FormRhfTextareaProps<T>) {
  const textareaId = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='space-y-2'>
            <FieldLabel
              htmlFor={textareaId}
              className='font-medium text-foreground'
            >
              {label}
            </FieldLabel>

            <Textarea
              {...field}
              id={textareaId}
              value={field.value ?? ""}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              style={{
                height: `${height}px`,
              }}
              className={cn(
                "transition-colors resize-y",
                "focus-visible:ring-brand",
                "focus-visible:border-brand",
                className,
              )}
            />

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
