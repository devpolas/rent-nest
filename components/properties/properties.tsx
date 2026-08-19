"use client";

import { useCallback, useMemo, useState } from "react";

import Loading from "@/app/loading";

import { Card, CardContent } from "@/components/ui/card";
import { useAllPropertyDetails } from "@/hooks";

import PropertyResults from "./property-results";
import PropertyToolbar from "./property-filter/property-toolbar";

import {
  EMPTY_PROPERTY_FILTERS,
  type PropertyFilterValues,
} from "./property-filter/property-filter-sheet";

import type {
  PropertySortBy,
  PropertySortOrder,
} from "./property-filter/property-sort";

import { normalizeSelectOptions } from "@/utils/normalize-property-data";

import type { Option } from "@/components/rhf-input/form-rfh-select";

const DEFAULT_LIMIT = 12;

const createEmptyFilters = (): PropertyFilterValues => ({
  ...EMPTY_PROPERTY_FILTERS,
  amenityIds: [],
  featureIds: [],
  ruleIds: [],
});

export default function Properties() {
  const categoriesQuery = useAllPropertyDetails("categories");

  const amenitiesQuery = useAllPropertyDetails("amenities");

  const featuresQuery = useAllPropertyDetails("features");

  const rulesQuery = useAllPropertyDetails("rules");

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [filters, setFilters] =
    useState<PropertyFilterValues>(createEmptyFilters);

  const [sortBy, setSortBy] = useState<PropertySortBy>("createdAt");

  const [sortOrder, setSortOrder] = useState<PropertySortOrder>("desc");

  const [page, setPage] = useState(1);

  const categories = categoriesQuery.data?.data?.categories ?? [];

  const amenities = amenitiesQuery.data?.data?.amenities ?? [];

  const features = featuresQuery.data?.data?.features ?? [];

  const rules = rulesQuery.data?.data?.rules ?? [];

  const categoryOptions = useMemo<Option[]>(
    () => normalizeSelectOptions(categories),
    [categories],
  );

  const amenityOptions = useMemo<Option[]>(
    () => normalizeSelectOptions(amenities),
    [amenities],
  );

  const featureOptions = useMemo<Option[]>(
    () => normalizeSelectOptions(features),
    [features],
  );

  const ruleOptions = useMemo<Option[]>(
    () => normalizeSelectOptions(rules),
    [rules],
  );

  const propertyQuery = useMemo(
    () => ({
      search: appliedSearch.trim() || undefined,

      categoryId: filters.categoryId || undefined,

      minRent: filters.minRent || undefined,

      maxRent: filters.maxRent || undefined,

      minArea: filters.minArea || undefined,

      maxArea: filters.maxArea || undefined,

      bedrooms: filters.bedrooms || undefined,

      bathrooms: filters.bathrooms || undefined,

      country: filters.country || undefined,

      division: filters.division || undefined,

      district: filters.district || undefined,

      city: filters.city || undefined,

      village: filters.village || undefined,

      amenityIds:
        filters.amenityIds.length > 0 ? filters.amenityIds : undefined,

      featureIds:
        filters.featureIds.length > 0 ? filters.featureIds : undefined,

      ruleIds: filters.ruleIds.length > 0 ? filters.ruleIds : undefined,

      minRating: filters.minRating || undefined,

      minReviews: filters.minReviews || undefined,

      status: "APPROVED" as const,

      availability: "AVAILABLE" as const,

      sortBy,

      sortOrder,

      page: String(page),

      limit: String(DEFAULT_LIMIT),
    }),
    [appliedSearch, filters, sortBy, sortOrder, page],
  );

  const detailsLoading =
    categoriesQuery.isLoading ||
    amenitiesQuery.isLoading ||
    featuresQuery.isLoading ||
    rulesQuery.isLoading;

  const detailsError =
    categoriesQuery.isError ||
    amenitiesQuery.isError ||
    featuresQuery.isError ||
    rulesQuery.isError;

  const handleSearch = useCallback(() => {
    const nextSearch = search.trim();

    if (nextSearch === appliedSearch) {
      return;
    }

    setAppliedSearch(nextSearch);
    setPage(1);
  }, [search, appliedSearch]);

  const handleClearSearch = useCallback(() => {
    if (!search && !appliedSearch) {
      return;
    }

    setSearch("");
    setAppliedSearch("");
    setPage(1);
  }, [search, appliedSearch]);

  const handleApplyFilters = useCallback(
    (nextFilters: PropertyFilterValues) => {
      setFilters(nextFilters);
      setPage(1);
    },
    [],
  );

  const handleSortChange = useCallback(
    (nextSortBy: PropertySortBy, nextSortOrder: PropertySortOrder) => {
      if (nextSortBy === sortBy && nextSortOrder === sortOrder) {
        return;
      }

      setSortBy(nextSortBy);
      setSortOrder(nextSortOrder);
      setPage(1);
    },
    [sortBy, sortOrder],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage === page) {
        return;
      }

      setPage(nextPage);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [page],
  );

  const handleClearAll = useCallback(() => {
    setFilters(createEmptyFilters());

    setSearch("");
    setAppliedSearch("");

    setSortBy("createdAt");
    setSortOrder("desc");

    setPage(1);
  }, []);

  const handleRemoveFilter = useCallback((key: keyof PropertyFilterValues) => {
    setFilters((previous) => {
      const value = previous[key];

      return {
        ...previous,
        [key]: Array.isArray(value) ? [] : "",
      };
    });

    setPage(1);
  }, []);

  const handleRemoveArrayFilter = useCallback(
    (key: "amenityIds" | "featureIds" | "ruleIds", id: string) => {
      setFilters((previous) => ({
        ...previous,
        [key]: previous[key].filter((item) => item !== id),
      }));

      setPage(1);
    },
    [],
  );

  if (detailsLoading) {
    return <Loading />;
  }

  if (detailsError) {
    return (
      <Card className='mx-auto mt-6 w-[calc(100%-2rem)] max-w-7xl'>
        <CardContent className='py-12 text-center'>
          <p className='font-medium text-destructive'>
            Failed to load property filter data.
          </p>

          <p className='mt-2 text-muted-foreground text-sm'>
            Please refresh the page and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className='mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full container'>
      <PropertyToolbar
        search={search}
        appliedSearch={appliedSearch}
        filters={filters}
        categories={categoryOptions}
        amenities={amenityOptions}
        features={featureOptions}
        rules={ruleOptions}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearAll}
        onSortChange={handleSortChange}
        onRemoveFilter={handleRemoveFilter}
        onRemoveArrayFilter={handleRemoveArrayFilter}
      />

      <PropertyResults query={propertyQuery} onPageChange={handlePageChange} />
    </section>
  );
}
