"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Check, PlusCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

export type MultiCheckboxOption = {
  label: string;
  value: string;
};

interface FormRhfMultiCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: MultiCheckboxOption[];
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
}

export function FormRhfMultiCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Search...",
  createNew = false,
  onCreateNew,
}: FormRhfMultiCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Force RHF value to string[]
        const selectedValues = (field.value ?? []) as string[];

        const selectedOptions = options.filter((option) =>
          selectedValues.includes(option.value),
        );

        function toggle(value: string) {
          const exists = selectedValues.includes(value);

          if (exists) {
            field.onChange(selectedValues.filter((id) => id !== value));
          } else {
            field.onChange([...selectedValues, value]);
          }
        }

        function remove(value: string) {
          field.onChange(selectedValues.filter((id) => id !== value));
        }

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
                  className='justify-between w-full'
                >
                  Select {label}
                  <span className='text-muted-foreground'>
                    {selectedValues.length}
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className='p-0 w-90' align='start'>
                <Command>
                  <CommandInput placeholder={placeholder} />

                  <CommandList>
                    <CommandEmpty>No result found.</CommandEmpty>

                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => toggle(option.value)}
                          className='cursor-pointer'
                        >
                          <div
                            className={cn(
                              "flex justify-center items-center mr-2 border rounded-sm size-4",
                              selectedValues.includes(option.value) &&
                                "bg-primary text-primary-foreground",
                            )}
                          >
                            {selectedValues.includes(option.value) && (
                              <Check className='size-3' />
                            )}
                          </div>

                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected Items */}

            <div className='flex flex-wrap gap-2'>
              {selectedOptions.map((item) => (
                <Badge key={item.value} variant='secondary' className='gap-1'>
                  {item.label}

                  <button
                    type='button'
                    className='hover:text-red-500 hover:cursor-pointer'
                    onClick={() => remove(item.value)}
                  >
                    <X className='size-3' />
                  </button>
                </Badge>
              ))}
            </div>

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
