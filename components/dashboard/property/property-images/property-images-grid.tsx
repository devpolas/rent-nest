"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { PropertyImage } from "@/types/property-image";

import PropertyImageCard from "./property-image-card";
import {
  deletePropertyImage,
  setPropertyThumbnail,
} from "@/lib/actions/property-client.actions";

type Props = {
  propertyId: string;
  images: PropertyImage[];
  onChanged?: () => void;
};

export default function PropertyImagesGrid({
  propertyId,
  images,
  onChanged,
}: Props) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleSetCover = async (imageId: string) => {
    setProcessingId(imageId);

    try {
      const response = await setPropertyThumbnail({
        propertyId,
        imageId,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to set cover photo.");
      }

      toast.success("Cover photo updated.");

      onChanged?.();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update cover photo.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (imageId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?",
    );

    if (!confirmed) {
      return;
    }

    setProcessingId(imageId);

    try {
      const response = await deletePropertyImage({
        propertyId,
        imageId,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to delete photo.");
      }

      toast.success("Photo deleted.");

      onChanged?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete photo.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className='gap-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {images.map((image) => (
        <PropertyImageCard
          key={image.id}
          image={image}
          disabled={processingId !== null}
          onSetCover={handleSetCover}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
