"use client";

import { useRouter } from "next/navigation";

import PropertyImagesHeader from "./property-images-header";
import PropertyImagesLimit from "./property-images-limit";
import PropertyImagesUploader from "./property-images-uploader";
import PropertyImagesEmpty from "./property-images-empty";
import PropertyImagesGrid from "./property-images-grid";
import Loading from "@/app/loading";
import { useProperty } from "@/hooks";

export default function PropertyImagesPage({
  propertyId,
}: {
  propertyId: string;
}) {
  const router = useRouter();
  const { data: propertyResponse, isLoading } = useProperty(propertyId);

  if (isLoading) {
    return <Loading />;
  }

  if (
    !propertyResponse ||
    !propertyResponse.success ||
    !propertyResponse.data
  ) {
    return (
      <div className='flex justify-center items-center p-4 min-h-[400px]'>
        <p className='text-muted-foreground'>
          {propertyResponse?.message ?? "User not found"}
        </p>
      </div>
    );
  }

  const property = propertyResponse.data.property;

  if (!property) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <p className='text-muted-foreground'>Profile not found</p>
      </div>
    );
  }

  const refresh = () => {
    router.refresh();
  };

  const imageCount = property.images.length;

  return (
    <div className='space-y-8 p-4'>
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
