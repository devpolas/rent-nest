"use client";

import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormRhfInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
};

export function FormRhfInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  autoComplete,
  className,
}: FormRhfInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  const inputId = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;

            if (type === "number") {
              field.onChange(value === "" ? undefined : Number(value));
              return;
            }

            field.onChange(value);
          };

          return (
            <Field data-invalid={fieldState.invalid} className='space-y-2'>
              <FieldLabel
                htmlFor={inputId}
                className='font-medium text-foreground'
              >
                {label}
              </FieldLabel>

              <div className='relative'>
                <Input
                  {...field}
                  id={inputId}
                  type={inputType}
                  value={field.value ?? ""}
                  onChange={handleChange}
                  placeholder={placeholder}
                  disabled={disabled}
                  autoComplete={autoComplete ?? String(name)}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "transition-colors",
                    "focus-visible:ring-brand",
                    "focus-visible:border-brand",
                    isPassword && "pr-10",
                    className,
                  )}
                />

                {isPassword && (
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={cn(
                      "top-1/2 right-3 absolute",
                      "-translate-y-1/2",
                      "text-muted-foreground",
                      "transition-colors",
                      "hover:text-brand",
                    )}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className='size-5' />
                    ) : (
                      <Eye className='size-5' />
                    )}
                  </button>
                )}
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
