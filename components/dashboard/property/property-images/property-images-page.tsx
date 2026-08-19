"use client";

import { useRouter } from "next/navigation";

import Loading from "@/app/loading";
import { useProperty } from "@/hooks";

import PropertyImagesEmpty from "./property-images-empty";
import PropertyImagesGrid from "./property-images-grid";
import PropertyImagesHeader from "./property-images-header";
import PropertyImagesLimit from "./property-images-limit";
import PropertyImagesUploader from "./property-images-uploader";

type Props = {
  propertyId: string;
};

export default function PropertyImagesPage({ propertyId }: Props) {
  const router = useRouter();

  const {
    data: propertyResponse,
    isLoading,
    isError,
  } = useProperty(propertyId);

  if (isLoading) {
    return <Loading />;
  }

  if (
    isError ||
    !propertyResponse?.success ||
    !propertyResponse.data?.property
  ) {
    return (
      <div className='flex justify-center items-center p-4 min-h-[400px]'>
        <p className='text-muted-foreground'>
          {propertyResponse?.message ?? "Property not found."}
        </p>
      </div>
    );
  }

  const property = propertyResponse.data.property;
  const images = property.images;
  const imageCount = images.length;

  return (
    <div className='space-y-8 p-4'>
      <PropertyImagesHeader property={property} onBack={() => router.back()} />

      <PropertyImagesLimit count={imageCount} />

      <PropertyImagesUploader
        propertyId={property.id}
        currentImageCount={imageCount}
      />

      <section className='space-y-5'>
        <div>
          <h2 className='font-semibold text-lg'>Your Photos</h2>

          <p className='text-muted-foreground text-sm'>
            Select one photo as the cover image for your property.
          </p>
        </div>

        {images.length > 0 ? (
          <PropertyImagesGrid propertyId={property.id} images={images} />
        ) : (
          <PropertyImagesEmpty />
        )}
      </section>
    </div>
  );
}
