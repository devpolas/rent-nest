"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormRhfFileProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  className?: string;
  helperText?: string;
};

export default function FormRhfFile<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  multiple = false,
  accept,
  className,
  helperText,
}: FormRhfFileProps<T>) {
  const id = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='space-y-2'>
            <FieldLabel htmlFor={id} className='font-medium text-foreground'>
              {label}
            </FieldLabel>

            <Input
              id={id}
              type='file'
              disabled={disabled}
              multiple={multiple}
              accept={accept}
              aria-invalid={fieldState.invalid}
              className={cn(
                "cursor-pointer",
                "transition-colors",
                "focus-visible:ring-brand",
                "focus-visible:border-brand",
                className,
              )}
              onChange={(event) =>
                field.onChange(
                  multiple ? event.target.files : event.target.files?.[0],
                )
              }
            />

            {helperText && (
              <p className='text-muted-foreground text-xs'>{helperText}</p>
            )}

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
