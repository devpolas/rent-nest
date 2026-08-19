"use client";

import { useCallback } from "react";

import PropertySearch from "./property-search";
import PropertyFilterSheet, {
  type PropertyFilterValues,
} from "./property-filter-sheet";
import PropertyActiveFilters from "./property-active-filters";
import PropertySort, {
  type PropertySortBy,
  type PropertySortOrder,
} from "./property-sort";

import type { Option } from "@/components/rhf-input/form-rfh-select";

interface PropertyToolbarProps {
  search: string;
  appliedSearch: string;

  filters: PropertyFilterValues;

  categories: Option[];
  amenities: Option[];
  features: Option[];
  rules: Option[];

  sortBy: PropertySortBy;
  sortOrder: PropertySortOrder;

  disabled?: boolean;

  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;

  onApplyFilters: (filters: PropertyFilterValues) => void;
  onClearFilters: () => void;

  onSortChange: (sortBy: PropertySortBy, sortOrder: PropertySortOrder) => void;

  onRemoveFilter: (key: keyof PropertyFilterValues) => void;

  onRemoveArrayFilter: (
    key: "amenityIds" | "featureIds" | "ruleIds",
    id: string,
  ) => void;
}

export default function PropertyToolbar({
  search,
  appliedSearch,

  filters,

  categories,
  amenities,
  features,
  rules,

  sortBy,
  sortOrder,

  disabled = false,

  onSearchChange,
  onSearch,
  onClearSearch,

  onApplyFilters,
  onClearFilters,

  onSortChange,

  onRemoveFilter,
  onRemoveArrayFilter,
}: PropertyToolbarProps) {
  const handleRemoveAmenity = useCallback(
    (id: string) => {
      onRemoveArrayFilter("amenityIds", id);
    },
    [onRemoveArrayFilter],
  );

  const handleRemoveFeature = useCallback(
    (id: string) => {
      onRemoveArrayFilter("featureIds", id);
    },
    [onRemoveArrayFilter],
  );

  const handleRemoveRule = useCallback(
    (id: string) => {
      onRemoveArrayFilter("ruleIds", id);
    },
    [onRemoveArrayFilter],
  );

  return (
    <div className='space-y-4'>
      <div className='flex lg:flex-row flex-col lg:items-center gap-3'>
        <div className='flex-1 min-w-0'>
          <PropertySearch
            value={search}
            onChange={onSearchChange}
            onSearch={onSearch}
            onClear={onClearSearch}
            disabled={disabled}
          />
        </div>

        <div className='sm:flex gap-2 grid grid-cols-2 shrink-0'>
          <PropertyFilterSheet
            filters={filters}
            categories={categories}
            amenities={amenities}
            features={features}
            rules={rules}
            onApply={onApplyFilters}
            onClear={onClearFilters}
            disabled={disabled}
          />

          <PropertySort
            sortBy={sortBy}
            sortOrder={sortOrder}
            onChange={onSortChange}
            disabled={disabled}
          />
        </div>
      </div>

      <PropertyActiveFilters
        search={appliedSearch}
        categoryId={filters.categoryId}
        categories={categories}
        minRent={filters.minRent}
        maxRent={filters.maxRent}
        minArea={filters.minArea}
        maxArea={filters.maxArea}
        bedrooms={filters.bedrooms}
        bathrooms={filters.bathrooms}
        country={filters.country}
        division={filters.division}
        district={filters.district}
        city={filters.city}
        village={filters.village}
        amenityIds={filters.amenityIds}
        featureIds={filters.featureIds}
        ruleIds={filters.ruleIds}
        amenities={amenities}
        features={features}
        rules={rules}
        minRating={filters.minRating}
        minReviews={filters.minReviews}
        onRemoveSearch={onClearSearch}
        onRemoveCategory={() => onRemoveFilter("categoryId")}
        onRemoveMinRent={() => onRemoveFilter("minRent")}
        onRemoveMaxRent={() => onRemoveFilter("maxRent")}
        onRemoveMinArea={() => onRemoveFilter("minArea")}
        onRemoveMaxArea={() => onRemoveFilter("maxArea")}
        onRemoveBedrooms={() => onRemoveFilter("bedrooms")}
        onRemoveBathrooms={() => onRemoveFilter("bathrooms")}
        onRemoveCountry={() => onRemoveFilter("country")}
        onRemoveDivision={() => onRemoveFilter("division")}
        onRemoveDistrict={() => onRemoveFilter("district")}
        onRemoveCity={() => onRemoveFilter("city")}
        onRemoveVillage={() => onRemoveFilter("village")}
        onRemoveAmenity={handleRemoveAmenity}
        onRemoveFeature={handleRemoveFeature}
        onRemoveRule={handleRemoveRule}
        onRemoveMinRating={() => onRemoveFilter("minRating")}
        onRemoveMinReviews={() => onRemoveFilter("minReviews")}
        onClearAll={onClearFilters}
      />
    </div>
  );
}
