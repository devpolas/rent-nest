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

  sortBy: PropertySortBy;
  sortOrder: PropertySortOrder;

  categories: Option[];
  amenities: Option[];
  features: Option[];
  rules: Option[];

  disabled?: boolean;

  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onClearSearch: () => void;

  onFiltersChange: (filters: PropertyFilterValues) => void;

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
  sortBy,
  sortOrder,
  categories,
  amenities,
  features,
  rules,
  disabled = false,
  onSearchChange,
  onSearch,
  onClearSearch,
  onFiltersChange,
  onClearFilters,
  onSortChange,
  onRemoveFilter,
  onRemoveArrayFilter,
}: PropertyToolbarProps) {
  const removeSearch = useCallback(() => {
    onClearSearch();
  }, [onClearSearch]);

  return (
    <header className='space-y-4'>
      <div className='lg:items-center gap-3 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto]'>
        <PropertySearch
          value={search}
          onChange={onSearchChange}
          onSearch={onSearch}
          onClear={onClearSearch}
          disabled={disabled}
        />

        <div className='lg:flex lg:items-center gap-2 grid grid-cols-2'>
          <PropertyFilterSheet
            filters={filters}
            categories={categories}
            amenities={amenities}
            features={features}
            rules={rules}
            onApply={onFiltersChange}
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
        categories={categories}
        categoryId={filters.categoryId}
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
        onRemoveSearch={removeSearch}
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
        onRemoveAmenity={(id) => onRemoveArrayFilter("amenityIds", id)}
        onRemoveFeature={(id) => onRemoveArrayFilter("featureIds", id)}
        onRemoveRule={(id) => onRemoveArrayFilter("ruleIds", id)}
        onRemoveMinRating={() => onRemoveFilter("minRating")}
        onRemoveMinReviews={() => onRemoveFilter("minReviews")}
        onClearAll={onClearFilters}
      />
    </header>
  );
}
