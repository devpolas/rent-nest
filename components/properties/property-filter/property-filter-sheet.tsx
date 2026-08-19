"use client";

import { useCallback, useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { Option } from "@/components/rhf-input/form-rfh-select";

import PropertyFilterForm from "./property-filter-form";

export interface PropertyFilterValues {
  categoryId: string;

  minRent: string;
  maxRent: string;

  minArea: string;
  maxArea: string;

  bedrooms: string;
  bathrooms: string;

  country: string;
  division: string;
  district: string;
  city: string;
  village: string;

  amenityIds: string[];
  featureIds: string[];
  ruleIds: string[];

  minRating: string;
  minReviews: string;
}

export const EMPTY_PROPERTY_FILTERS: PropertyFilterValues = {
  categoryId: "",

  minRent: "",
  maxRent: "",

  minArea: "",
  maxArea: "",

  bedrooms: "",
  bathrooms: "",

  country: "",
  division: "",
  district: "",
  city: "",
  village: "",

  amenityIds: [],
  featureIds: [],
  ruleIds: [],

  minRating: "",
  minReviews: "",
};

interface PropertyFilterSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;

  filters: PropertyFilterValues;

  categories: Option[];
  amenities: Option[];
  features: Option[];
  rules: Option[];

  onApply: (filters: PropertyFilterValues) => void;
  onClear: () => void;

  disabled?: boolean;
}

export default function PropertyFilterSheet({
  open,
  onOpenChange,
  trigger,
  filters,
  categories,
  amenities,
  features,
  rules,
  onApply,
  onClear,
  disabled = false,
}: PropertyFilterSheetProps) {
  const [draftFilters, setDraftFilters] =
    useState<PropertyFilterValues>(filters);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line
      setDraftFilters(filters);
    }
  }, [open, filters]);

  const handleFilterChange = useCallback(
    <K extends keyof PropertyFilterValues>(
      key: K,
      value: PropertyFilterValues[K],
    ) => {
      setDraftFilters((previous) => ({
        ...previous,
        [key]: value,
      }));
    },
    [],
  );

  const handleClear = useCallback(() => {
    setDraftFilters({
      ...EMPTY_PROPERTY_FILTERS,
      amenityIds: [],
      featureIds: [],
      ruleIds: [],
    });

    onClear();
  }, [onClear]);

  const handleApply = useCallback(() => {
    onApply({
      ...draftFilters,
      amenityIds: [...draftFilters.amenityIds],
      featureIds: [...draftFilters.featureIds],
      ruleIds: [...draftFilters.ruleIds],
    });

    onOpenChange?.(false);
  }, [draftFilters, onApply, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger ?? (
        <SheetTrigger asChild>
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            className='w-full sm:w-auto'
          >
            <SlidersHorizontal className='mr-2 size-4' />
            <span>More Filters</span>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        side='right'
        className='flex flex-col gap-0 p-0 w-full sm:max-w-lg'
      >
        <SheetHeader className='px-4 sm:px-6 py-5 border-b'>
          <SheetTitle>Property Filters</SheetTitle>

          <SheetDescription>
            Refine your property search using the filters below.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 px-4 sm:px-6 py-5 sm:py-6 overflow-y-auto'>
          <PropertyFilterForm
            values={draftFilters}
            categories={categories}
            amenities={amenities}
            features={features}
            rules={rules}
            onChange={handleFilterChange}
          />
        </div>

        <div className='flex gap-2 sm:gap-3 bg-background px-4 sm:px-6 py-4 border-t'>
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            onClick={handleClear}
            className='flex-1'
          >
            <X className='mr-2 size-4' />
            Clear
          </Button>

          <Button
            type='button'
            disabled={disabled}
            onClick={handleApply}
            className='flex-1'
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
