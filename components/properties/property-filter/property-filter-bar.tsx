"use client";

import {
  Bath,
  BedDouble,
  DollarSign,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Option } from "@/components/rhf-input/form-rfh-select";

interface PropertyFilterBarProps {
  search: string;
  categoryId?: string;
  minRent?: string;
  maxRent?: string;
  bedrooms?: string;
  bathrooms?: string;

  categories: Option[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | undefined) => void;
  onMinRentChange: (value: string) => void;
  onMaxRentChange: (value: string) => void;
  onBedroomsChange: (value: string | undefined) => void;
  onBathroomsChange: (value: string | undefined) => void;

  onMoreFilters?: () => void;
  onClearFilters?: () => void;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;

  hasActiveFilters?: boolean;
}

const BEDROOM_OPTIONS = [
  { value: "1", label: "1+ Bedroom" },
  { value: "2", label: "2+ Bedrooms" },
  { value: "3", label: "3+ Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
  { value: "5", label: "5+ Bedrooms" },
];

const BATHROOM_OPTIONS = [
  { value: "1", label: "1+ Bathroom" },
  { value: "2", label: "2+ Bathrooms" },
  { value: "3", label: "3+ Bathrooms" },
  { value: "4", label: "4+ Bathrooms" },
  { value: "5", label: "5+ Bathrooms" },
];

const SORT_OPTIONS = [
  {
    value: "createdAt-desc",
    label: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc" as const,
  },
  {
    value: "createdAt-asc",
    label: "Oldest",
    sortBy: "createdAt",
    sortOrder: "asc" as const,
  },
  {
    value: "rent-asc",
    label: "Price: Low to High",
    sortBy: "rent",
    sortOrder: "asc" as const,
  },
  {
    value: "rent-desc",
    label: "Price: High to Low",
    sortBy: "rent",
    sortOrder: "desc" as const,
  },
  {
    value: "area-desc",
    label: "Largest Area",
    sortBy: "area",
    sortOrder: "desc" as const,
  },
  {
    value: "averageRating-desc",
    label: "Highest Rated",
    sortBy: "averageRating",
    sortOrder: "desc" as const,
  },
  {
    value: "reviewCount-desc",
    label: "Most Reviewed",
    sortBy: "reviewCount",
    sortOrder: "desc" as const,
  },
];

export default function PropertyFilterBar({
  search,
  categoryId,
  minRent,
  maxRent,
  bedrooms,
  bathrooms,
  categories,
  onSearchChange,
  onCategoryChange,
  onMinRentChange,
  onMaxRentChange,
  onBedroomsChange,
  onBathroomsChange,
  onMoreFilters,
  onClearFilters,
  sortBy = "createdAt",
  sortOrder = "desc",
  onSortChange,
  hasActiveFilters = false,
}: PropertyFilterBarProps) {
  const selectedSort = `${sortBy}-${sortOrder}`;

  const handleClearSearch = () => {
    onSearchChange("");
  };

  return (
    <div className='space-y-4'>
      <div className='flex sm:flex-row flex-col gap-2'>
        <div className='relative flex-1 min-w-0'>
          <Search
            className='top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none'
            aria-hidden='true'
          />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder='Search properties, locations, categories...'
            className='pr-10 pl-9 h-11'
            aria-label='Search properties'
          />

          {search && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='top-1/2 right-1 absolute size-9 -translate-y-1/2'
              onClick={handleClearSearch}
              aria-label='Clear search'
            >
              <X className='size-4' />
            </Button>
          )}
        </div>

        <Button
          type='button'
          variant='outline'
          className='sm:px-4 h-11 shrink-0'
          onClick={onMoreFilters}
        >
          <SlidersHorizontal className='sm:mr-2 size-4' />
          <span className='hidden sm:inline'>More Filters</span>
          <span className='sm:hidden'>Filters</span>
        </Button>

        {hasActiveFilters && (
          <Button
            type='button'
            variant='ghost'
            className='h-11 shrink-0'
            onClick={onClearFilters}
          >
            <Filter className='sm:mr-2 size-4' />
            <span>Clear</span>
          </Button>
        )}
      </div>

      <div className='gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        <Select
          value={categoryId ?? "all"}
          onValueChange={(value) =>
            onCategoryChange(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className='w-full h-10'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex gap-2'>
          <div className='relative flex-1 min-w-0'>
            <DollarSign
              className='top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none'
              aria-hidden='true'
            />

            <Input
              type='number'
              min={0}
              value={minRent ?? ""}
              onChange={(event) => onMinRentChange(event.target.value)}
              placeholder='Min rent'
              className='pl-9 h-10'
              aria-label='Minimum rent'
            />
          </div>

          <div className='relative flex-1 min-w-0'>
            <DollarSign
              className='top-1/2 left-3 absolute size-4 text-muted-foreground -translate-y-1/2 pointer-events-none'
              aria-hidden='true'
            />

            <Input
              type='number'
              min={0}
              value={maxRent ?? ""}
              onChange={(event) => onMaxRentChange(event.target.value)}
              placeholder='Max rent'
              className='pl-9 h-10'
              aria-label='Maximum rent'
            />
          </div>
        </div>

        <Select
          value={bedrooms ?? "all"}
          onValueChange={(value) =>
            onBedroomsChange(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className='w-full h-10'>
            <BedDouble
              className='mr-2 size-4 text-muted-foreground shrink-0'
              aria-hidden='true'
            />
            <SelectValue placeholder='Bedrooms' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>Any Bedrooms</SelectItem>

            {BEDROOM_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={bathrooms ?? "all"}
          onValueChange={(value) =>
            onBathroomsChange(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className='w-full h-10'>
            <Bath
              className='mr-2 size-4 text-muted-foreground shrink-0'
              aria-hidden='true'
            />
            <SelectValue placeholder='Bathrooms' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>Any Bathrooms</SelectItem>

            {BATHROOM_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {onSortChange && (
        <div className='flex justify-end'>
          <Select
            value={selectedSort}
            onValueChange={(value) => {
              const option = SORT_OPTIONS.find((item) => item.value === value);

              if (!option) return;

              onSortChange(option.sortBy, option.sortOrder);
            }}
          >
            <SelectTrigger className='w-full sm:w-[210px] h-10'>
              <SelectValue placeholder='Sort properties' />
            </SelectTrigger>

            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
