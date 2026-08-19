"use client";

import { memo, useCallback, useMemo } from "react";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PropertySortBy =
  | "createdAt"
  | "rent"
  | "area"
  | "bedrooms"
  | "bathrooms"
  | "averageRating"
  | "reviewCount";

export type PropertySortOrder = "asc" | "desc";

export interface PropertySortOption {
  value: `${PropertySortBy}-${PropertySortOrder}`;
  label: string;
  sortBy: PropertySortBy;
  sortOrder: PropertySortOrder;
}

export interface PropertySortProps {
  sortBy: PropertySortBy;
  sortOrder: PropertySortOrder;
  onChange: (sortBy: PropertySortBy, sortOrder: PropertySortOrder) => void;
  disabled?: boolean;
  className?: string;
}

export const PROPERTY_SORT_OPTIONS: readonly PropertySortOption[] = [
  {
    value: "createdAt-desc",
    label: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    value: "createdAt-asc",
    label: "Oldest",
    sortBy: "createdAt",
    sortOrder: "asc",
  },
  {
    value: "rent-asc",
    label: "Rent: Low to High",
    sortBy: "rent",
    sortOrder: "asc",
  },
  {
    value: "rent-desc",
    label: "Rent: High to Low",
    sortBy: "rent",
    sortOrder: "desc",
  },
  {
    value: "area-desc",
    label: "Area: Largest First",
    sortBy: "area",
    sortOrder: "desc",
  },
  {
    value: "area-asc",
    label: "Area: Smallest First",
    sortBy: "area",
    sortOrder: "asc",
  },
  {
    value: "bedrooms-desc",
    label: "Most Bedrooms",
    sortBy: "bedrooms",
    sortOrder: "desc",
  },
  {
    value: "bathrooms-desc",
    label: "Most Bathrooms",
    sortBy: "bathrooms",
    sortOrder: "desc",
  },
  {
    value: "averageRating-desc",
    label: "Highest Rated",
    sortBy: "averageRating",
    sortOrder: "desc",
  },
  {
    value: "reviewCount-desc",
    label: "Most Reviewed",
    sortBy: "reviewCount",
    sortOrder: "desc",
  },
];

function PropertySort({
  sortBy,
  sortOrder,
  onChange,
  disabled = false,
  className,
}: PropertySortProps) {
  const value = `${sortBy}-${sortOrder}` as PropertySortOption["value"];

  const selectedOption = useMemo(
    () => PROPERTY_SORT_OPTIONS.find((option) => option.value === value),
    [value],
  );

  const handleChange = useCallback(
    (selectedValue: string) => {
      const option = PROPERTY_SORT_OPTIONS.find(
        (item) => item.value === selectedValue,
      );

      if (!option) return;

      onChange(option.sortBy, option.sortOrder);
    },
    [onChange],
  );

  return (
    <Select value={value} disabled={disabled} onValueChange={handleChange}>
      <SelectTrigger
        id='property-sort'
        aria-label='Sort properties'
        className={`w-full  ${className ?? ""}`}
      >
        {selectedOption?.sortOrder === "asc" ? (
          <ArrowUpAZ
            aria-hidden='true'
            className='mr-2 size-4 text-muted-foreground shrink-0'
          />
        ) : (
          <ArrowDownAZ
            aria-hidden='true'
            className='mr-2 size-4 text-muted-foreground shrink-0'
          />
        )}

        <SelectValue placeholder='Sort properties' />
      </SelectTrigger>

      <SelectContent>
        {PROPERTY_SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default memo(PropertySort);
