"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Option } from "@/components/rhf-input/form-rfh-select";

interface PropertyActiveFiltersProps {
  search?: string;
  categoryId?: string;
  categories?: Option[];

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

  amenities?: Option[];
  features?: Option[];
  rules?: Option[];

  minRating?: string;
  minReviews?: string;

  onRemoveSearch?: () => void;
  onRemoveCategory?: () => void;
  onRemoveMinRent?: () => void;
  onRemoveMaxRent?: () => void;
  onRemoveMinArea?: () => void;
  onRemoveMaxArea?: () => void;
  onRemoveBedrooms?: () => void;
  onRemoveBathrooms?: () => void;

  onRemoveCountry?: () => void;
  onRemoveDivision?: () => void;
  onRemoveDistrict?: () => void;
  onRemoveCity?: () => void;
  onRemoveVillage?: () => void;

  onRemoveAmenity?: (id: string) => void;
  onRemoveFeature?: (id: string) => void;
  onRemoveRule?: (id: string) => void;

  onRemoveMinRating?: () => void;
  onRemoveMinReviews?: () => void;

  onClearAll?: () => void;
  className?: string;
}

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
}

function FilterBadge({ label, onRemove }: FilterBadgeProps) {
  return (
    <Badge
      variant='secondary'
      className='gap-1.5 px-2.5 py-1.5 max-w-full font-normal'
    >
      <span className='truncate'>{label}</span>

      <button
        type='button'
        onClick={onRemove}
        className='flex justify-center items-center hover:bg-background/60 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring size-4 transition-colors shrink-0'
        aria-label={`Remove ${label} filter`}
      >
        <X className='size-3' />
      </button>
    </Badge>
  );
}

function getOptionLabel(options: Option[] | undefined, value: string) {
  return options?.find((option) => option.value === value)?.label ?? value;
}

export default function PropertyActiveFilters({
  search,
  categoryId,
  categories,

  minRent,
  maxRent,
  minArea,
  maxArea,
  bedrooms,
  bathrooms,

  country,
  division,
  district,
  city,
  village,

  amenityIds = [],
  featureIds = [],
  ruleIds = [],

  amenities = [],
  features = [],
  rules = [],

  minRating,
  minReviews,

  onRemoveSearch,
  onRemoveCategory,
  onRemoveMinRent,
  onRemoveMaxRent,
  onRemoveMinArea,
  onRemoveMaxArea,
  onRemoveBedrooms,
  onRemoveBathrooms,

  onRemoveCountry,
  onRemoveDivision,
  onRemoveDistrict,
  onRemoveCity,
  onRemoveVillage,

  onRemoveAmenity,
  onRemoveFeature,
  onRemoveRule,

  onRemoveMinRating,
  onRemoveMinReviews,

  onClearAll,
  className,
}: PropertyActiveFiltersProps) {
  const hasFilters =
    Boolean(search) ||
    Boolean(categoryId) ||
    Boolean(minRent) ||
    Boolean(maxRent) ||
    Boolean(minArea) ||
    Boolean(maxArea) ||
    Boolean(bedrooms) ||
    Boolean(bathrooms) ||
    Boolean(country) ||
    Boolean(division) ||
    Boolean(district) ||
    Boolean(city) ||
    Boolean(village) ||
    amenityIds.length > 0 ||
    featureIds.length > 0 ||
    ruleIds.length > 0 ||
    Boolean(minRating) ||
    Boolean(minReviews);

  if (!hasFilters) {
    return null;
  }

  return (
    <div
      className={`flex w-full flex-wrap items-center gap-2 ${className ?? ""}`}
    >
      {search && onRemoveSearch && (
        <FilterBadge label={`Search: ${search}`} onRemove={onRemoveSearch} />
      )}

      {categoryId && onRemoveCategory && (
        <FilterBadge
          label={`Category: ${getOptionLabel(categories, categoryId)}`}
          onRemove={onRemoveCategory}
        />
      )}

      {minRent && onRemoveMinRent && (
        <FilterBadge
          label={`Min rent: ${minRent}`}
          onRemove={onRemoveMinRent}
        />
      )}

      {maxRent && onRemoveMaxRent && (
        <FilterBadge
          label={`Max rent: ${maxRent}`}
          onRemove={onRemoveMaxRent}
        />
      )}

      {minArea && onRemoveMinArea && (
        <FilterBadge
          label={`Min area: ${minArea}`}
          onRemove={onRemoveMinArea}
        />
      )}

      {maxArea && onRemoveMaxArea && (
        <FilterBadge
          label={`Max area: ${maxArea}`}
          onRemove={onRemoveMaxArea}
        />
      )}

      {bedrooms && onRemoveBedrooms && (
        <FilterBadge
          label={`${bedrooms}+ bedrooms`}
          onRemove={onRemoveBedrooms}
        />
      )}

      {bathrooms && onRemoveBathrooms && (
        <FilterBadge
          label={`${bathrooms}+ bathrooms`}
          onRemove={onRemoveBathrooms}
        />
      )}

      {country && onRemoveCountry && (
        <FilterBadge label={`Country: ${country}`} onRemove={onRemoveCountry} />
      )}

      {division && onRemoveDivision && (
        <FilterBadge
          label={`Division: ${division}`}
          onRemove={onRemoveDivision}
        />
      )}

      {district && onRemoveDistrict && (
        <FilterBadge
          label={`District: ${district}`}
          onRemove={onRemoveDistrict}
        />
      )}

      {city && onRemoveCity && (
        <FilterBadge label={`City: ${city}`} onRemove={onRemoveCity} />
      )}

      {village && onRemoveVillage && (
        <FilterBadge label={`Village: ${village}`} onRemove={onRemoveVillage} />
      )}

      {amenityIds.map((id) => (
        <FilterBadge
          key={`amenity-${id}`}
          label={`Amenity: ${getOptionLabel(amenities, id)}`}
          onRemove={() => onRemoveAmenity?.(id)}
        />
      ))}

      {featureIds.map((id) => (
        <FilterBadge
          key={`feature-${id}`}
          label={`Feature: ${getOptionLabel(features, id)}`}
          onRemove={() => onRemoveFeature?.(id)}
        />
      ))}

      {ruleIds.map((id) => (
        <FilterBadge
          key={`rule-${id}`}
          label={`Rule: ${getOptionLabel(rules, id)}`}
          onRemove={() => onRemoveRule?.(id)}
        />
      ))}

      {minRating && onRemoveMinRating && (
        <FilterBadge
          label={`${minRating}+ rating`}
          onRemove={onRemoveMinRating}
        />
      )}

      {minReviews && onRemoveMinReviews && (
        <FilterBadge
          label={`${minReviews}+ reviews`}
          onRemove={onRemoveMinReviews}
        />
      )}

      {onClearAll && (
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={onClearAll}
          className='px-2 h-8 text-muted-foreground'
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
