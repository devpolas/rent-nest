"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FormRhfDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

function formatDate(date?: Date) {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function FormRhfDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select a date",
  disabled,
  className,
}: FormRhfDatePickerProps<T>) {
  const [open, setOpen] = React.useState(false);

  const inputId = `rent-nest-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const value = field.value as Date | undefined;

          return (
            <Field data-invalid={fieldState.invalid} className='space-y-2'>
              <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  id={inputId}
                  readOnly
                  disabled={disabled}
                  value={formatDate(value)}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                  className={cn(className)}
                  onClick={() => setOpen(true)}
                />

                <InputGroupAddon align='inline-end'>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <InputGroupButton
                        type='button'
                        variant='ghost'
                        size='icon-xs'
                        disabled={disabled}
                        aria-label='Open calendar'
                      >
                        <CalendarIcon className='size-4' />
                      </InputGroupButton>
                    </PopoverTrigger>

                    <PopoverContent
                      className='p-0 w-auto overflow-hidden'
                      align='end'
                    >
                      <Calendar
                        mode='single'
                        selected={value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}
