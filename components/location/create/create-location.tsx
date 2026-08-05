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
import { Loader2, MapPin } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_VALUES = {
  latitude: "",
  longitude: "",
  country: "",
  division: "",
  district: "",
  city: "",
  village: "",
  postalCode: "",
  addressLine: "",
};

export default function CreateLocation({ type }: { type: LocationType }) {
  const { isLoading, error, getPosition, locationPayload } = useGeoLocation();
  const { control, handleSubmit, reset } = useForm<LocationCreateInput>({
    resolver: zodResolver(LocationCreateSchema),
    defaultValues: { ...DEFAULT_VALUES, type },
  });

  async function handleCreateLocation(data: LocationCreateInput) {
    console.log(data);
  }

  useEffect(() => {
    if (locationPayload) {
      reset({ ...locationPayload, type });
      toast.success("Location detected successfully");
    }
  }, [locationPayload, reset]);

  return (
    <form onSubmit={handleSubmit(handleCreateLocation)} className='p-4'>
      <Card className='px-4'>
        <CardHeader>
          <div className='flex flex-row gap-4'>
            <CardTitle>Create New Location</CardTitle>
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
              className={`glass inline-flex items-center text-brand select-none rounded-md transition-colors 
                ${
                  isLoading
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:bg-secondary/80"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className='size-4 animate-spin' />
                  Detecting...
                </>
              ) : (
                <>
                  <MapPin className='size-4' />
                  Autofill
                </>
              )}
            </Badge>
          </div>
          <CardDescription>
            Please enter the correct information for each field.
          </CardDescription>

          {error && <p className='mt-2 text-destructive text-sm'>{error}</p>}
          <CardAction>
            <ActionButton
              disabled={isLoading}
              variant={"brand"}
              type='submit'
              isLoading={false}
              loadingText='Creating...'
            >
              Create Location
            </ActionButton>
          </CardAction>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
            {/* Left */}
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

            {/* Right */}
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
