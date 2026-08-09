"use client";

import { useRouter } from "next/navigation";

import type { PropertyManagementResponse } from "@/types/property";

import PropertyImagesHeader from "./property-images-header";
import PropertyImagesLimit from "./property-images-limit";
import PropertyImagesUploader from "./property-images-uploader";
import PropertyImagesEmpty from "./property-images-empty";
import PropertyImagesGrid from "./property-images-grid";

type Props = {
  property: PropertyManagementResponse;
};

export default function PropertyImagesPage({ property }: Props) {
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  const imageCount = property.images.length;

  return (
    <div className='space-y-8'>
      {/* Page header */}
      <PropertyImagesHeader property={property} onBack={() => router.back()} />

      {/* Image limit */}
      <PropertyImagesLimit count={imageCount} />

      {/* Upload */}
      <PropertyImagesUploader
        propertyId={property.id}
        currentImageCount={imageCount}
        onUploaded={refresh}
      />

      {/* Gallery */}
      <section className='space-y-5'>
        <div>
          <h2 className='font-semibold text-lg'>Your Photos</h2>

          <p className='text-muted-foreground text-sm'>
            Select one photo as the cover image for your property.
          </p>
        </div>

        {imageCount > 0 ? (
          <PropertyImagesGrid
            propertyId={property.id}
            images={property.images}
            onChanged={refresh}
          />
        ) : (
          <PropertyImagesEmpty />
        )}
      </section>
    </div>
  );
}
