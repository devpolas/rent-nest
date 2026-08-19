"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, Pencil, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCreatePropertyImages } from "@/hooks";
import { uploadImagesToBackend } from "@/lib/actions/image.action";

import PropertyImageEditor from "./property-image-editor";
import PropertyImagesProgress from "./property-images-progress";
import {
  ACCEPTED_PROPERTY_IMAGE_TYPES,
  MAX_PROPERTY_IMAGE_SIZE,
  MAX_PROPERTY_IMAGES,
} from "./property-images.constants";

type Props = {
  propertyId: string;
  currentImageCount: number;
  onUploaded?: () => void;
};

type EditableImage = {
  id: string;
  file: File;
  preview: string;
};

export default function PropertyImagesUploader({
  propertyId,
  currentImageCount,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync, isPending } = useCreatePropertyImages();

  const [images, setImages] = useState<EditableImage[]>([]);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);

  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const editingImage =
    images.find((image) => image.id === editingImageId) ?? null;

  const editorOpen = editingImageId !== null;

  const remainingSlots = Math.max(
    MAX_PROPERTY_IMAGES - currentImageCount - images.length,
    0,
  );

  const isBusy = uploading || isPending;

  const canUpload = remainingSlots > 0 && !isBusy;

  /**
   * Open native file picker.
   */
  const openFilePicker = () => {
    if (!canUpload) {
      if (remainingSlots <= 0) {
        toast.error(
          `A property can have a maximum of ${MAX_PROPERTY_IMAGES} photos.`,
        );
      }

      return;
    }

    inputRef.current?.click();
  };

  /**
   * Validate selected files.
   */
  const validateFiles = (files: File[]) => {
    if (files.length > remainingSlots) {
      toast.error(
        `You can only add ${remainingSlots} more ${
          remainingSlots === 1 ? "photo" : "photos"
        }.`,
      );

      return false;
    }

    const invalidType = files.find(
      (file) =>
        !ACCEPTED_PROPERTY_IMAGE_TYPES.includes(
          file.type as (typeof ACCEPTED_PROPERTY_IMAGE_TYPES)[number],
        ),
    );

    if (invalidType) {
      toast.error(`${invalidType.name} is not a supported image type.`);
      return false;
    }

    const oversized = files.find((file) => file.size > MAX_PROPERTY_IMAGE_SIZE);

    if (oversized) {
      toast.error(
        `${oversized.name} is larger than 2MB. Please choose a smaller image.`,
      );

      return false;
    }

    return true;
  };

  /**
   * Add selected files to the local editing queue.
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    // Allow selecting the same file again.
    event.target.value = "";

    if (!files.length || !validateFiles(files)) {
      return;
    }

    const editableImages: EditableImage[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...editableImages]);

    // Start editing the first newly selected image.
    const firstImage = editableImages[0];

    if (firstImage) {
      setEditingImageId(firstImage.id);
    }
  };

  /**
   * Open editor for an existing image.
   */
  const handleEdit = (imageId: string) => {
    if (isBusy) {
      return;
    }

    setEditingImageId(imageId);
  };

  /**
   * Save the edited image.
   *
   * After saving, automatically open the next image.
   */
  const handleEditorSave = (editedFile: File) => {
    if (!editingImage) {
      return;
    }

    const currentIndex = images.findIndex(
      (image) => image.id === editingImage.id,
    );

    if (currentIndex === -1) {
      return;
    }

    const newPreview = URL.createObjectURL(editedFile);

    setImages((current) =>
      current.map((image) => {
        if (image.id !== editingImage.id) {
          return image;
        }

        URL.revokeObjectURL(image.preview);

        return {
          ...image,
          file: editedFile,
          preview: newPreview,
        };
      }),
    );

    toast.success("Image edited successfully.");

    const nextImage = images[currentIndex + 1];

    if (nextImage) {
      setEditingImageId(nextImage.id);
    } else {
      setEditingImageId(null);
    }
  };

  /**
   * Close editor.
   */
  const handleEditorOpenChange = (open: boolean) => {
    if (isBusy) {
      return;
    }

    if (!open) {
      setEditingImageId(null);
    }
  };

  /**
   * Remove an image from the local queue.
   */
  const handleRemove = (imageId: string) => {
    if (isBusy) {
      return;
    }

    setImages((current) => {
      const image = current.find((item) => item.id === imageId);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((item) => item.id !== imageId);
    });

    if (editingImageId === imageId) {
      setEditingImageId(null);
    }
  };

  /**
   * Upload all edited images.
   */
  const handleUpload = async () => {
    if (!images.length) {
      toast.error("Please select at least one image.");
      return;
    }

    const oversized = images.find(
      (image) => image.file.size > MAX_PROPERTY_IMAGE_SIZE,
    );

    if (oversized) {
      toast.error(
        `${oversized.file.name} is larger than 2MB. Lower the image quality and try again.`,
      );

      return;
    }

    setUploading(true);
    setCompleted(0);
    setTotal(images.length);

    try {
      /**
       * Upload files to Cloudinary.
       */
      const uploadedImages = await uploadImagesToBackend({
        images: images.map((image) => image.file),
      });

      if (!uploadedImages?.length) {
        throw new Error("No images were uploaded.");
      }

      setCompleted(uploadedImages.length);

      /**
       * Save PropertyImage records.
       */
      const response = await mutateAsync({
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

      toast.success(
        `${uploadedImages.length} ${
          uploadedImages.length === 1 ? "photo" : "photos"
        } added successfully.`,
      );

      /**
       * Clean local object URLs.
       */
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });

      setImages([]);
      setEditingImageId(null);
      setCompleted(0);
      setTotal(0);

      onUploaded?.();
    } catch (error) {
      console.error("Property image upload error:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to upload photos.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ImagePlus className='size-5' />
            Add Photos
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-5'>
          <PropertyImagesProgress
            total={total}
            completed={completed}
            processing={isBusy}
          />

          {/* =====================================================
              SELECTED IMAGES
          ===================================================== */}
          {images.length > 0 && (
            <div className='gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
              {images.map((image) => (
                <div
                  key={image.id}
                  className='group relative bg-muted border rounded-xl overflow-hidden'
                >
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className='w-full object-cover aspect-[4/3]'
                  />

                  <div className='bottom-0 absolute inset-x-0 flex gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8'>
                    <Button
                      type='button'
                      size='sm'
                      variant='secondary'
                      disabled={isBusy}
                      onClick={() => handleEdit(image.id)}
                    >
                      <Pencil className='mr-1.5 size-4' />
                      Edit
                    </Button>

                    <Button
                      type='button'
                      size='icon'
                      variant='destructive'
                      disabled={isBusy}
                      onClick={() => handleRemove(image.id)}
                    >
                      <Trash2 className='size-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =====================================================
              UPLOAD AREA
          ===================================================== */}
          <Button
            type='button'
            variant='outline'
            disabled={!canUpload}
            onClick={openFilePicker}
            className='flex flex-col justify-center items-center hover:bg-muted/50 disabled:opacity-50 p-8 border border-dashed rounded-xl w-full min-h-64 text-center transition-colors disabled:pointer-events-none'
          >
            <div className='bg-primary/10 mb-4 p-4 rounded-full'>
              {isBusy ? (
                <Loader2 className='size-8 text-primary animate-spin' />
              ) : (
                <UploadCloud className='size-8 text-primary' />
              )}
            </div>

            <h3 className='font-medium'>
              {uploading
                ? "Uploading photos..."
                : isPending
                  ? "Saving photos..."
                  : remainingSlots > 0
                    ? "Upload property photos"
                    : "Maximum photos reached"}
            </h3>

            <p className='mt-1 max-w-md text-muted-foreground text-sm'>
              {remainingSlots > 0
                ? "Choose photos, edit them, and upload them to this property."
                : `You can have up to ${MAX_PROPERTY_IMAGES} photos.`}
            </p>

            {!isBusy && remainingSlots > 0 && (
              <Badge className='mt-5 pointer-events-none'>
                <ImagePlus className='mr-2 size-4' />
                Choose Photos
              </Badge>
            )}

            <p className='mt-4 text-muted-foreground text-xs'>
              JPG, PNG, WEBP or AVIF · Maximum 2MB per image · Up to{" "}
              {MAX_PROPERTY_IMAGES} photos
            </p>
          </Button>

          {/* =====================================================
              UPLOAD BUTTON
          ===================================================== */}
          {images.length > 0 && (
            <Button
              type='button'
              className='w-full'
              disabled={isBusy}
              onClick={handleUpload}
            >
              {isBusy ? (
                <>
                  <Loader2 className='mr-2 size-4 animate-spin' />
                  {uploading ? "Uploading..." : "Saving..."}
                </>
              ) : (
                <>
                  <UploadCloud className='mr-2 size-4' />
                  Upload {images.length}{" "}
                  {images.length === 1 ? "Photo" : "Photos"}
                </>
              )}
            </Button>
          )}

          <input
            ref={inputRef}
            type='file'
            accept={ACCEPTED_PROPERTY_IMAGE_TYPES.join(",")}
            multiple
            className='hidden'
            onChange={handleFileChange}
            disabled={isBusy}
          />
        </CardContent>
      </Card>

      {/* =========================================================
          IMAGE EDITOR
      ========================================================= */}
      <PropertyImageEditor
        open={editorOpen}
        file={editingImage?.file ?? null}
        onOpenChange={handleEditorOpenChange}
        onSave={handleEditorSave}
      />
    </>
  );
}
