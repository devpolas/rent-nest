"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FormRhfDatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
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

export function FormRhfDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select date",
  disabled,
  className,
}: FormRhfDatePickerProps<TFieldValues>) {
  const [open, setOpen] = React.useState(false);

  const inputId = `rent-nest-${String(name)}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = field.value as Date | undefined;

        return (
          <Field data-invalid={fieldState.invalid} className='space-y-2'>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  id={inputId}
                  type='button'
                  disabled={disabled}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "justify-start w-full font-normal text-left",
                    !value && "text-muted-foreground",
                    className,
                  )}
                >
                  <CalendarIcon className='mr-2 size-4' />

                  {value ? formatDate(value) : placeholder}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className='p-0 w-auto overflow-hidden'
                align='start'
              >
                <Calendar
                  mode='single'
                  selected={value}
                  defaultMonth={value}
                  captionLayout='dropdown'
                  disabled={disabled}
                  onSelect={(selectedDate) => {
                    field.onChange(selectedDate);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
