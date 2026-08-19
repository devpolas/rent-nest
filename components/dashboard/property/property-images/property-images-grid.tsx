"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import { useDeletePropertyImage, useSetPropertyThumbnail } from "@/hooks";
import type { PropertyImage } from "@/types/property-image";

import PropertyImageCard from "./property-image-card";

type Props = {
  propertyId: string;
  images: PropertyImage[];
};

export default function PropertyImagesGrid({ propertyId, images }: Props) {
  const setThumbnailMutation = useSetPropertyThumbnail();
  const deleteImageMutation = useDeletePropertyImage();

  const isProcessing =
    setThumbnailMutation.isPending || deleteImageMutation.isPending;

  const handleSetCover = useCallback(
    (imageId: string) => {
      if (isProcessing) {
        return;
      }

      setThumbnailMutation.mutate(
        {
          propertyId,
          imageId,
        },
        {
          onSuccess: () => {
            toast.success("Cover photo updated.");
          },
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to update cover photo.",
            );
          },
        },
      );
    },
    [propertyId, isProcessing, setThumbnailMutation],
  );

  const handleDelete = useCallback(
    (imageId: string) => {
      if (isProcessing) {
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to delete this photo?",
      );

      if (!confirmed) {
        return;
      }

      deleteImageMutation.mutate(
        {
          propertyId,
          imageId,
        },
        {
          onSuccess: () => {
            toast.success("Photo deleted.");
          },
          onError: (error) => {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to delete photo.",
            );
          },
        },
      );
    },
    [propertyId, isProcessing, deleteImageMutation],
  );

  if (!images.length) {
    return null;
  }

  return (
    <div className='gap-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {images.map((image) => (
        <PropertyImageCard
          key={image.id}
          image={image}
          disabled={isProcessing}
          onSetCover={handleSetCover}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
