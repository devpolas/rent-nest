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

  const { data: propertyResponse, isLoading } = useProperty(propertyId);

  if (isLoading) {
    return <Loading />;
  }

  if (!propertyResponse?.success || !propertyResponse.data?.property) {
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

  const handleBack = () => {
    router.back();
  };

  const handleChanged = () => {
    router.refresh();
  };

  return (
    <div className='space-y-8 p-4'>
      {/* Header */}
      <PropertyImagesHeader property={property} onBack={handleBack} />

      {/* Image limit */}
      <PropertyImagesLimit count={imageCount} />

      {/* Upload */}
      <PropertyImagesUploader
        propertyId={property.id}
        currentImageCount={imageCount}
        onUploaded={handleChanged}
      />

      {/* Gallery */}
      <section className='space-y-5'>
        <div>
          <h2 className='font-semibold text-lg'>Your Photos</h2>

          <p className='text-muted-foreground text-sm'>
            Select one photo as the cover image for your property.
          </p>
        </div>

        {images.length > 0 ? (
          <PropertyImagesGrid
            propertyId={property.id}
            images={images}
            onChanged={handleChanged}
          />
        ) : (
          <PropertyImagesEmpty />
        )}
      </section>
    </div>
  );
}
