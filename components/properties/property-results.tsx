"use client";

import Loading from "@/app/loading";

import { Card, CardContent } from "@/components/ui/card";

import { useProperties } from "@/hooks";

import PropertyCard from "../property/property-card";
import PropertyPagination from "./property-pagination";

import type {
  PropertySortBy,
  PropertySortOrder,
} from "./property-filter/property-sort";

interface PropertyQuery {
  search?: string;

  categoryId?: string;

  minRent?: string;
  maxRent?: string;

  minArea?: string;
  maxArea?: string;

  bedrooms?: string;
  bathrooms?: string;

  country?: string;
  division?: string;
  district?: string;
  city?: string;
  village?: string;

  amenityIds?: string[];
  featureIds?: string[];
  ruleIds?: string[];

  minRating?: string;
  minReviews?: string;

  status: "APPROVED";
  availability: "AVAILABLE";

  sortBy: PropertySortBy;
  sortOrder: PropertySortOrder;

  page: string;
  limit: string;
}

interface PropertyResultsProps {
  query: PropertyQuery;
  onPageChange: (page: number) => void;
}

export default function PropertyResults({
  query,
  onPageChange,
}: PropertyResultsProps) {
  const { data, isLoading, isFetching, isError } = useProperties(query);

  if (isLoading && !data) {
    return (
      <div className='flex justify-center items-center py-16 min-h-[400px]'>
        <Loading />
      </div>
    );
  }

  if (isError || !data || !data.success || !data.data) {
    return (
      <Card className='mt-6'>
        <CardContent className='py-12 text-center'>
          <p className='font-medium text-destructive'>
            Failed to load properties.
          </p>

          <p className='mt-2 text-muted-foreground text-sm'>
            {data?.message ?? "Please refresh the page and try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  const properties = data.data.properties ?? [];
  const meta = data.meta;

  if (properties.length === 0) {
    return (
      <div className='flex justify-center items-center py-12 min-h-[400px]'>
        <div className='text-center'>
          <p className='font-medium'>No properties found.</p>

          <p className='mt-1 text-muted-foreground text-sm'>
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='relative'>
        {isFetching && (
          <div
            className='z-10 absolute inset-0 flex justify-center items-center bg-background/50 backdrop-blur-[1px] rounded-lg'
            aria-live='polite'
            aria-label='Loading properties'
          >
            <Loading />
          </div>
        )}

        <div className='gap-4 sm:gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6'>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {meta && meta.totalPage > 1 && (
        <PropertyPagination
          page={meta.page}
          limit={meta.limit}
          total={meta.total}
          totalPage={meta.totalPage}
          onPageChange={onPageChange}
          disabled={isFetching}
        />
      )}
    </>
  );
}
