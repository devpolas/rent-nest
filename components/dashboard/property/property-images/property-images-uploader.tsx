"use client";

import { ChangeEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PropertyImagesProgress from "./property-images-progress";

import { createPropertyImages } from "@/lib/actions/property.actions";
import { uploadImagesToBackend } from "@/lib/actions/image.action";
import { Badge } from "@/components/ui/badge";

export const MAX_PROPERTY_IMAGES = 10;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

type Props = {
  propertyId: string;
  currentImageCount: number;
  onUploaded?: () => void;
};

export default function PropertyImagesUploader({
  propertyId,
  currentImageCount,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const remainingSlots = Math.max(MAX_PROPERTY_IMAGES - currentImageCount, 0);

  const canUpload = remainingSlots > 0 && !uploading;

  const openFilePicker = () => {
    if (!canUpload) {
      toast.error(
        `A property can have a maximum of ${MAX_PROPERTY_IMAGES} photos.`,
      );

      return;
    }

    inputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    // Allow selecting the same file again.
    event.target.value = "";

    if (!files.length) {
      return;
    }

    /**
     * Check property image limit.
     */
    if (files.length > remainingSlots) {
      toast.error(
        `You can only add ${remainingSlots} more ${
          remainingSlots === 1 ? "photo" : "photos"
        }.`,
      );

      return;
    }

    /**
     * Check file types.
     */
    const invalidType = files.find(
      (file) => !ACCEPTED_TYPES.includes(file.type),
    );

    if (invalidType) {
      toast.error(`${invalidType.name} is not a supported image type.`);

      return;
    }

    /**
     * Check file size.
     */
    const oversized = files.find((file) => file.size > MAX_FILE_SIZE);

    if (oversized) {
      toast.error(`${oversized.name} exceeds the 2MB file size limit.`);

      return;
    }

    await uploadFiles(files);
  };

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    setCompleted(0);
    setTotal(files.length);

    try {
      /**
       * STEP 1
       *
       * Upload files to:
       *
       * /images/upload
       *
       * Backend uploads them to Cloudinary
       * and returns:
       *
       * [
       *   {
       *     url,
       *     publicId
       *   }
       * ]
       */
      const uploadedImages = await uploadImagesToBackend({
        images: files,
      });

      if (!uploadedImages.length) {
        throw new Error("No images were uploaded.");
      }

      /**
       * STEP 2
       *
       * Save Cloudinary image information
       * as PropertyImage records.
       */
      const response = await createPropertyImages({
        propertyId,
        payload: {
          images: uploadedImages.map((image) => ({
            url: image.url,
            publicId: image.publicId,
          })),
        },
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to save property images.");
      }

      setCompleted(uploadedImages.length);

      toast.success(
        `${uploadedImages.length} ${
          uploadedImages.length === 1 ? "photo" : "photos"
        } added successfully.`,
      );

      onUploaded?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload photos.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className='p-4'>
      <CardHeader>
        <CardTitle className='text-base'>Add Photos</CardTitle>
      </CardHeader>

      <CardContent className='space-y-5'>
        <PropertyImagesProgress
          total={total}
          completed={completed}
          uploading={uploading}
        />

        <Button
          type='button'
          disabled={!canUpload}
          variant={"outline"}
          onClick={openFilePicker}
          className='flex flex-col justify-center items-center hover:bg-muted/50 disabled:opacity-50 p-8 border border-dashed rounded-xl w-full min-h-64 text-center transition-colors disabled:pointer-events-none'
        >
          <div className='bg-primary/10 mb-4 p-4 rounded-full'>
            {uploading ? (
              <Loader2 className='size-8 text-primary animate-spin' />
            ) : (
              <UploadCloud className='size-8 text-primary' />
            )}
          </div>

          <h3 className='font-medium'>
            {uploading
              ? "Uploading photos..."
              : remainingSlots > 0
                ? "Upload property photos"
                : "Maximum photos reached"}
          </h3>

          <p className='mt-1 max-w-md text-muted-foreground text-sm'>
            {remainingSlots > 0
              ? "Choose photos from your device to add them to this property."
              : `You can have up to ${MAX_PROPERTY_IMAGES} photos.`}
          </p>

          {!uploading && remainingSlots > 0 && (
            <Badge
              role='button'
              className='mt-5'
              onClick={(event) => {
                event.stopPropagation();
                openFilePicker();
              }}
            >
              <ImagePlus className='mr-2 size-4' />
              Choose Photos
            </Badge>
          )}

          <p className='mt-4 text-muted-foreground text-xs'>
            JPG, PNG, WEBP or AVIF · Maximum 2MB per image · Up to 10 photos
          </p>
        </Button>

        <input
          ref={inputRef}
          type='file'
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          className='hidden'
          onChange={handleFileChange}
        />
      </CardContent>
    </Card>
  );
}
