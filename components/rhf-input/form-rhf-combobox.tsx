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
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

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
  createNew?: boolean;
  onCreateNew?: () => void;
};

export function FormRhfCombobox<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Search...",
  createNew = false,
  onCreateNew,
}: FormRhfComboboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = options.find((item) => item.value === field.value);

        return (
          <div className='space-y-4'>
            <div className='flex justify-between items-center gap-3'>
              <Label className='font-medium text-sm'>{label}</Label>
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
