"use client";

import ActionButton from "@/components/button/action-button";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGeoLocation } from "@/hooks/location/useGeoLocation";
import {
  LocationCreateInput,
  LocationCreateSchema,
} from "@/schemas/location.schema";
import { LocationType } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LocationFormProps {
  type: LocationType;
  onSubmit: (data: LocationCreateInput) => void | Promise<void>;
  defaultValues?: Partial<LocationCreateInput>;
  mode?: "create" | "update";
  isPending?: boolean;
  profileId?: string;
}

export default function LocationForm({
  type,
  onSubmit,
  defaultValues,
  mode = "create",
  isPending = false,
  profileId,
}: LocationFormProps) {
  const { isLoading, error, getPosition, locationPayload } = useGeoLocation();
  const isPropertyLocation = type === "PROPERTY";

  const locationDefaultValues: Partial<LocationCreateInput> = {
    ...defaultValues,
    type,
    ...(isPropertyLocation ? {} : { profileId }),
  };

  const { control, handleSubmit, reset } = useForm<LocationCreateInput>({
    resolver: zodResolver(LocationCreateSchema),
    defaultValues: locationDefaultValues,
  });

  useEffect(() => {
    if (!locationPayload) return;

    reset({
      ...locationPayload,
      type,
      ...(isPropertyLocation ? {} : { profileId }),
    });

    toast.success("Location detected successfully");
  }, [locationPayload, type, profileId, isPropertyLocation, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Create New Location" : "Update Location"}
          </CardTitle>

          <CardDescription>
            Please enter the correct information for each field.
          </CardDescription>

          <Badge
            role='button'
            tabIndex={0}
            variant='secondary'
            onClick={!isLoading ? getPosition : undefined}
            onKeyDown={(e) => {
              if (!isLoading && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                getPosition();
              }
            }}
            className={`glass inline-flex items-center text-brand select-none rounded-md transition-colors ${
              isLoading
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:bg-secondary/80"
            }`}
          >
            {isLoading ? "Detecting..." : "Autofill"}
          </Badge>

          {error && <p className='mt-2 text-destructive text-sm'>{error}</p>}

          <CardAction>
            <ActionButton
              disabled={isLoading || isPending}
              variant='brand'
              type='submit'
              isLoading={isPending}
              loadingText={mode === "create" ? "Creating..." : "Updating..."}
            >
              {mode === "create" ? "Create Location" : "Update Location"}
            </ActionButton>
          </CardAction>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
            <div className='space-y-4'>
              <FormRhfInput
                name='country'
                type='text'
                placeholder='Country'
                label='Country'
                control={control}
              />

              <FormRhfInput
                name='division'
                type='text'
                placeholder='Division'
                label='Division'
                control={control}
              />

              <FormRhfInput
                name='district'
                type='text'
                placeholder='District'
                label='District'
                control={control}
              />

              <FormRhfInput
                name='city'
                type='text'
                placeholder='City'
                label='City'
                control={control}
              />
            </div>

            <div className='space-y-4'>
              <FormRhfInput
                name='village'
                type='text'
                placeholder='Village'
                label='Village'
                control={control}
              />

              <FormRhfInput
                name='postalCode'
                type='text'
                placeholder='Postal code'
                label='Post Code'
                control={control}
              />

              <FormRhfInput
                name='latitude'
                type='text'
                placeholder='Latitude'
                label='Latitude'
                control={control}
              />

              <FormRhfInput
                name='longitude'
                type='text'
                placeholder='Longitude'
                label='Longitude'
                control={control}
              />
            </div>
          </div>

          <FormRhfInput
            name='addressLine'
            type='text'
            placeholder='Address line'
            label='Address Line'
            control={control}
          />
        </CardContent>
      </Card>
    </form>
  );
}
