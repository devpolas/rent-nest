"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  PropertyInputType,
  PropertySchema,
} from "../../../schemas/property.schema";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { FormRhfSelect } from "@/components/rhf-input/form-rfh-select";
import { propertyStaticData } from "./property-static-data";
import { FormRhfDatePicker } from "@/components/rhf-input/form-rhf-date-picker";
import FormRhfTextarea from "@/components/rhf-input/form-rfh-textarea";
import Loading from "@/app/loading";
import { normalizeSelectOptions } from "@/utils/normalize-property-data";
import { FormRhfMultiCheckbox } from "@/components/rhf-input/form-rfh-multi-checkbox";
import { useAllPropertyDetails } from "@/hooks";
import { FormRhfCombobox } from "@/components/rhf-input/form-rhf-combobox";
import ActionButton from "@/components/button/action-button";
import { useState } from "react";
import { PropertyDetailsMap } from "@/types/property";
import { ReusableDialog } from "@/components/dialog/dialog";
import CreatePropertyDetails from "./create-property-details";

export interface PropertyFormProps {
  defaultValues?: Partial<PropertyInputType>;
  mode?: "create" | "update";
  isPending?: boolean;
  onSubmit: (data: PropertyInputType) => void | Promise<void>;
}

export default function PropertyForm({
  defaultValues,
  mode = "create",
  isPending = false,
  onSubmit,
}: PropertyFormProps) {
  const categoriesQuery = useAllPropertyDetails("categories");
  const amenitiesQuery = useAllPropertyDetails("amenities");
  const featuresQuery = useAllPropertyDetails("features");
  const rulesQuery = useAllPropertyDetails("rules");

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogCategory, setDialogCategory] = useState<
    keyof PropertyDetailsMap | null
  >(null);

  const { control, handleSubmit } = useForm<PropertyInputType>({
    resolver: zodResolver(PropertySchema),
    defaultValues,
  });

  const loading =
    categoriesQuery.isLoading ||
    amenitiesQuery.isLoading ||
    featuresQuery.isLoading ||
    rulesQuery.isLoading;

  const hasError =
    categoriesQuery.isError ||
    amenitiesQuery.isError ||
    featuresQuery.isError ||
    rulesQuery.isError;

  if (loading) return <Loading />;

  if (hasError) {
    return (
      <Card className='p-4'>
        <CardContent className='py-10 text-center'>
          <p className='font-medium text-destructive'>
            Failed to load property details.
          </p>
          <p className='mt-2 text-muted-foreground text-sm'>
            Please refresh the page and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (
    !categoriesQuery.data?.data ||
    !amenitiesQuery.data?.data ||
    !featuresQuery.data?.data ||
    !rulesQuery.data?.data
  ) {
    return (
      <Card className='p-4'>
        <CardContent className='py-10 text-center'>
          Missing required property data.
        </CardContent>
      </Card>
    );
  }

  const categories = categoriesQuery.data.data.categories;
  const amenities = amenitiesQuery.data.data.amenities;
  const features = featuresQuery.data.data.features;
  const rules = rulesQuery.data.data.rules;

  const normalizeCategories = normalizeSelectOptions(categories);
  const normalizeAmenities = normalizeSelectOptions(amenities);
  const normalizeFeatures = normalizeSelectOptions(features);
  const normalizeRules = normalizeSelectOptions(rules);

  function openDialog(detailsAction: keyof PropertyDetailsMap) {
    setDialogCategory(detailsAction);
    setIsOpenDialog(true);
  }

  function closeDialog(open: boolean) {
    setIsOpenDialog(open);

    if (!open) {
      setDialogCategory(null);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
        <Card className='px-4'>
          <CardHeader>
            <CardTitle>
              {mode === "update" ? "Update Property" : "Create New Property"}
            </CardTitle>

            <CardDescription>
              Please enter the correct information for each field.
            </CardDescription>

            <CardAction>
              <ActionButton
                variant='brand'
                type='submit'
                isLoading={isPending}
                loadingText={mode === "update" ? "Updating..." : "Creating..."}
              >
                {mode === "update" ? "Update Property" : "Create Property"}
              </ActionButton>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
              {/* Left */}
              <div className='space-y-4'>
                <FormRhfInput
                  name='title'
                  type='text'
                  placeholder='Property title'
                  label='Title'
                  control={control}
                />

                <FormRhfInput
                  name='rent'
                  type='number'
                  placeholder='Property rent per day in USD'
                  label='Rent Per Day'
                  control={control}
                />

                <FormRhfInput
                  name='securityDeposit'
                  type='number'
                  placeholder='Property security deposit in USD'
                  label='Security Deposit'
                  control={control}
                />

                <FormRhfInput
                  name='area'
                  type='number'
                  placeholder='Property area in square feet'
                  label='Area'
                  control={control}
                />

                <FormRhfInput
                  name='bedrooms'
                  type='number'
                  placeholder='Bedrooms'
                  label='Bedrooms'
                  control={control}
                />

                <FormRhfInput
                  name='bathrooms'
                  type='number'
                  placeholder='Bathrooms'
                  label='Bathrooms'
                  control={control}
                />
              </div>

              {/* Right */}
              <div className='space-y-4'>
                <FormRhfCombobox
                  name='categoryId'
                  control={control}
                  label='Category'
                  options={normalizeCategories}
                  createNew={true}
                  onCreateNew={() => openDialog("categories")}
                  placeholder='Search category...'
                />

                <FormRhfSelect
                  name='availability'
                  control={control}
                  label='Availability'
                  options={propertyStaticData.availability}
                  placeholder='Select availability'
                />

                <FormRhfDatePicker
                  name='availableFrom'
                  control={control}
                  label='Available From'
                  placeholder='Pick a date'
                />

                <FormRhfTextarea
                  control={control}
                  name='description'
                  label='Description'
                  placeholder='Property description'
                  height={190}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Property Features</CardTitle>
            <CardDescription>
              Select all applicable amenities, features and rules.
            </CardDescription>
          </CardHeader>

          <CardContent className='gap-8 grid lg:grid-cols-3'>
            <FormRhfMultiCheckbox
              name='amenities'
              control={control}
              label='Amenities'
              placeholder='Search amenities...'
              createNew={true}
              onCreateNew={() => openDialog("amenities")}
              options={normalizeAmenities}
            />

            <FormRhfMultiCheckbox
              name='features'
              control={control}
              label='Features'
              placeholder='Search features...'
              createNew={true}
              onCreateNew={() => openDialog("features")}
              options={normalizeFeatures}
            />

            <FormRhfMultiCheckbox
              name='rules'
              control={control}
              label='Rules'
              placeholder='Search rules...'
              createNew={true}
              onCreateNew={() => openDialog("rules")}
              options={normalizeRules}
            />
          </CardContent>
        </Card>
      </form>

      {isOpenDialog && dialogCategory === "categories" && (
        <ReusableDialog
          size='xl'
          isOpen={isOpenDialog}
          onOpenChange={closeDialog}
        >
          <CreatePropertyDetails
            detailsAction='categories'
            onSuccess={() => {
              closeDialog(false);
            }}
            refresh={() => categoriesQuery.refetch()}
          />
        </ReusableDialog>
      )}
      {isOpenDialog && dialogCategory === "amenities" && (
        <ReusableDialog
          size='xl'
          isOpen={isOpenDialog}
          onOpenChange={closeDialog}
        >
          <CreatePropertyDetails
            detailsAction='amenities'
            onSuccess={() => {
              closeDialog(false);
            }}
            refresh={() => amenitiesQuery.refetch()}
          />
        </ReusableDialog>
      )}
      {isOpenDialog && dialogCategory === "features" && (
        <ReusableDialog
          size='xl'
          isOpen={isOpenDialog}
          onOpenChange={closeDialog}
        >
          <CreatePropertyDetails
            detailsAction='features'
            onSuccess={() => {
              closeDialog(false);
            }}
            refresh={() => featuresQuery.refetch()}
          />
        </ReusableDialog>
      )}
      {isOpenDialog && dialogCategory === "rules" && (
        <ReusableDialog
          size='xl'
          isOpen={isOpenDialog}
          onOpenChange={closeDialog}
        >
          <CreatePropertyDetails
            detailsAction='rules'
            onSuccess={() => {
              closeDialog(false);
            }}
            refresh={() => rulesQuery.refetch()}
          />
        </ReusableDialog>
      )}
    </>
  );
}
