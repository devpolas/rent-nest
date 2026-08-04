"use client";

import { Control, FieldValues, Path, Controller } from "react-hook-form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type ComboboxOption = {
  label: string;
  value: string;
};

type FormRhfComboboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: ComboboxOption[];
  placeholder?: string;
};

export function FormRhfCombobox<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Search...",
}: FormRhfComboboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = options.find((item) => item.value === field.value);

        return (
          <div className='space-y-2'>
            <label className='font-medium text-sm'>{label}</label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type='button'
                  variant='outline'
                  role='combobox'
                  className='justify-between w-full'
                >
                  {selected?.label ?? placeholder}

                  <ChevronsUpDown className='opacity-50 size-4' />
                </Button>
              </PopoverTrigger>

              <PopoverContent className='p-0 w-90' align='start'>
                <Command>
                  <CommandInput placeholder={`Search ${label}`} />

                  <CommandList>
                    <CommandEmpty>No {label} found.</CommandEmpty>

                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => field.onChange(option.value)}
                        >
                          {option.label}

                          <Check
                            className={cn(
                              "ml-auto size-4",
                              field.value === option.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {fieldState.error && (
              <p className='text-destructive text-sm'>
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
