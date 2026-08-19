"use client";

import { useCallback } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Option } from "@/components/rhf-input/form-rfh-select";
import type { PropertyFilterValues } from "./property-filter-sheet";

interface PropertyFilterFormProps {
  values: PropertyFilterValues;
  categories: Option[];
  amenities: Option[];
  features: Option[];
  rules: Option[];
  onChange: <K extends keyof PropertyFilterValues>(
    key: K,
    value: PropertyFilterValues[K],
  ) => void;
}

const RATING_OPTIONS = [
  { value: "3", label: "3+ stars" },
  { value: "3.5", label: "3.5+ stars" },
  { value: "4", label: "4+ stars" },
  { value: "4.5", label: "4.5+ stars" },
];

const REVIEW_OPTIONS = [
  { value: "5", label: "5+ reviews" },
  { value: "10", label: "10+ reviews" },
  { value: "25", label: "25+ reviews" },
  { value: "50", label: "50+ reviews" },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='space-y-3'>
      <h3 className='font-medium text-sm'>{title}</h3>
      {children}
    </section>
  );
}

function RangeInputs({
  minValue,
  maxValue,
  minPlaceholder,
  maxPlaceholder,
  onMinChange,
  onMaxChange,
}: {
  minValue: string;
  maxValue: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}) {
  return (
    <div className='gap-3 grid grid-cols-1 sm:grid-cols-2'>
      <Input
        type='number'
        min={0}
        value={minValue}
        onChange={(event) => onMinChange(event.target.value)}
        placeholder={minPlaceholder}
        inputMode='numeric'
      />

      <Input
        type='number'
        min={0}
        value={maxValue}
        onChange={(event) => onMaxChange(event.target.value)}
        placeholder={maxPlaceholder}
        inputMode='numeric'
      />
    </div>
  );
}

function MultiSelectOptions({
  name,
  options,
  selectedIds,
  onChange,
}: {
  name: string;
  options: Option[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const handleChange = useCallback(
    (id: string, checked: boolean) => {
      if (checked) {
        if (selectedIds.includes(id)) return;
        onChange([...selectedIds, id]);
        return;
      }

      onChange(selectedIds.filter((item) => item !== id));
    },
    [onChange, selectedIds],
  );

  if (!options.length) {
    return (
      <p className='text-muted-foreground text-sm'>No options available.</p>
    );
  }

  return (
    <div className='gap-2 grid grid-cols-1 sm:grid-cols-2'>
      {options.map((option, index) => {
        const checked = selectedIds.includes(option.value);
        const checkboxId = `${name}-${option.value}-${index}`;

        return (
          <div
            key={option.value}
            className='flex items-start gap-2 -m-1.5 p-1.5 rounded-md'
          >
            <Checkbox
              id={checkboxId}
              checked={checked}
              onCheckedChange={(checked) =>
                handleChange(option.value, checked === true)
              }
              className='mt-0.5'
            />

            <Label
              htmlFor={checkboxId}
              className='font-normal text-sm leading-5 cursor-pointer'
            >
              {option.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}

export default function PropertyFilterForm({
  values,
  categories,
  amenities,
  features,
  rules,
  onChange,
}: PropertyFilterFormProps) {
  return (
    <div className='space-y-8 pb-2'>
      <FilterSection title='Category'>
        <Select
          value={values.categoryId || "any"}
          onValueChange={(value) =>
            onChange("categoryId", value === "any" ? "" : value)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Any category' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='any'>Any category</SelectItem>

            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection title='Rent'>
        <RangeInputs
          minValue={values.minRent}
          maxValue={values.maxRent}
          minPlaceholder='Minimum rent'
          maxPlaceholder='Maximum rent'
          onMinChange={(value) => onChange("minRent", value)}
          onMaxChange={(value) => onChange("maxRent", value)}
        />
      </FilterSection>

      <FilterSection title='Area'>
        <RangeInputs
          minValue={values.minArea}
          maxValue={values.maxArea}
          minPlaceholder='Minimum area'
          maxPlaceholder='Maximum area'
          onMinChange={(value) => onChange("minArea", value)}
          onMaxChange={(value) => onChange("maxArea", value)}
        />
      </FilterSection>

      <FilterSection title='Rooms'>
        <RangeInputs
          minValue={values.bedrooms}
          maxValue={values.bathrooms}
          minPlaceholder='Minimum bedrooms'
          maxPlaceholder='Minimum bathrooms'
          onMinChange={(value) => onChange("bedrooms", value)}
          onMaxChange={(value) => onChange("bathrooms", value)}
        />
      </FilterSection>

      <FilterSection title='Location'>
        <div className='gap-3 grid grid-cols-1 sm:grid-cols-2'>
          <Input
            value={values.country}
            onChange={(event) => onChange("country", event.target.value)}
            placeholder='Country'
          />

          <Input
            value={values.division}
            onChange={(event) => onChange("division", event.target.value)}
            placeholder='Division'
          />

          <Input
            value={values.district}
            onChange={(event) => onChange("district", event.target.value)}
            placeholder='District'
          />

          <Input
            value={values.city}
            onChange={(event) => onChange("city", event.target.value)}
            placeholder='City'
          />

          <Input
            value={values.village}
            onChange={(event) => onChange("village", event.target.value)}
            placeholder='Village'
            className='sm:col-span-2'
          />
        </div>
      </FilterSection>

      <FilterSection title='Amenities'>
        <MultiSelectOptions
          name='amenity'
          options={amenities}
          selectedIds={values.amenityIds}
          onChange={(ids) => onChange("amenityIds", ids)}
        />
      </FilterSection>

      <FilterSection title='Features'>
        <MultiSelectOptions
          name='feature'
          options={features}
          selectedIds={values.featureIds}
          onChange={(ids) => onChange("featureIds", ids)}
        />
      </FilterSection>

      <FilterSection title='Rules'>
        <MultiSelectOptions
          name='rule'
          options={rules}
          selectedIds={values.ruleIds}
          onChange={(ids) => onChange("ruleIds", ids)}
        />
      </FilterSection>

      <FilterSection title='Rating'>
        <Select
          value={values.minRating || "any"}
          onValueChange={(value) =>
            onChange("minRating", value === "any" ? "" : value)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Minimum rating' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='any'>Any rating</SelectItem>

            {RATING_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      <FilterSection title='Reviews'>
        <Select
          value={values.minReviews || "any"}
          onValueChange={(value) =>
            onChange("minReviews", value === "any" ? "" : value)
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Minimum reviews' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='any'>Any number of reviews</SelectItem>

            {REVIEW_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>
    </div>
  );
}
