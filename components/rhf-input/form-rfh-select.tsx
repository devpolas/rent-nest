"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { namePerfect } from "@/utils/helpers";

export type Option = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

type FormRhfSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
  disabled?: boolean;
  className?: string;
};

export function FormRhfSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  createNew = false,
  onCreateNew,
  disabled = false,
  className,
}: FormRhfSelectProps<T>) {
  const id = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='space-y-2'>
            <div className='flex justify-between items-center gap-3'>
              <FieldLabel htmlFor={id} className='font-medium text-foreground'>
                {label}
              </FieldLabel>

              {createNew && (
                <Badge
                  variant='outline'
                  onClick={onCreateNew}
                  className={cn(
                    "gap-1 cursor-pointer",
                    "border-brand/30",
                    "text-brand",
                    "hover:bg-brand/10",
                  )}
                >
                  <PlusCircle className='size-4' />
                  Create New
                </Badge>
              )}
            </div>

            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                id={id}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "transition-colors",
                  "focus-visible:ring-brand",
                  "focus-visible:border-brand",
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.icon && <SelectIcon icon={option.icon} />}
                      {namePerfect(option.label)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

function SelectIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className='mr-1 size-4' />;
}
