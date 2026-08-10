"use client";

import { ChangeEvent, useRef, useState } from "react";
import { ImagePlus, Loader2, Pencil, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PropertyImagesProgress from "./property-images-progress";
import PropertyImageEditor from "./property-image-editor";
import { uploadImagesToBackend } from "@/lib/actions/image.action";
import { useCreatePropertyImages } from "@/hooks";
export const MAX_PROPERTY_IMAGES = 10;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

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
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<EditableImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  const remainingSlots = Math.max(
    MAX_PROPERTY_IMAGES - currentImageCount - images.length,
    0,
  );

  const isBusy = uploading || isPending;

  const canUpload = remainingSlots > 0 && !isBusy;

  /**
   * Open file picker.
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
      (file) => !ACCEPTED_TYPES.includes(file.type),
    );

    if (invalidType) {
      toast.error(`${invalidType.name} is not a supported image type.`);

      return false;
    }

    return true;
  };

  /**
   * Handle file selection.
   */
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    event.target.value = "";

    if (!files.length) {
      return;
    }

    if (!validateFiles(files)) {
      return;
    }

    /**
     * Add all selected files
     * to editor queue.
     */
    const editableImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [...current, ...editableImages]);

    /**
     * Open first selected image
     * automatically.
     */
    const firstImage = editableImages[0];

    if (firstImage) {
      setEditingImage(firstImage);

      setEditorOpen(true);
    }
  };

  /**
   * Open editor for an image.
   */
  const handleEdit = (image: EditableImage) => {
    setEditingImage(image);
    setEditorOpen(true);
  };

  /**
   * Save edited image.
   */
  const handleEditorSave = (editedFile: File) => {
    if (!editingImage) {
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

    /**
     * Automatically open
     * next unedited image.
     */
    const currentIndex = images.findIndex(
      (image) => image.id === editingImage.id,
    );

    const nextImage = images[currentIndex + 1];

    if (nextImage) {
      setTimeout(() => {
        setEditingImage(nextImage);

        setEditorOpen(true);
      }, 150);
    }
  };

  /**
   * Remove selected image.
   */
  const handleRemove = (imageId: string) => {
    setImages((current) => {
      const image = current.find((item) => item.id === imageId);

      if (image) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((item) => item.id !== imageId);
    });
  };

  /**
   * Upload all edited images.
   */
  const handleUpload = async () => {
    if (!images.length) {
      toast.error("Please select at least one image.");

      return;
    }

    /**
     * Check final edited files.
     */
    const oversized = images.find((image) => image.file.size > MAX_FILE_SIZE);

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
       * STEP 1
       *
       * Upload edited images
       * to Cloudinary.
       */
      const uploadedImages = await uploadImagesToBackend({
        images: images.map((image) => image.file),
      });

      if (!uploadedImages?.length) {
        throw new Error("No images were uploaded.");
      }

      setCompleted(uploadedImages.length);

      /**
       * STEP 2
       *
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
       * Clean object URLs.
       */
      images.forEach((image) => URL.revokeObjectURL(image.preview));

      setImages([]);
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
            uploading={isBusy}
          />

          {/* Selected image previews */}
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

                  {/* Actions */}
                  <div className='bottom-0 absolute inset-x-0 flex gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8'>
                    <Button
                      type='button'
                      size='sm'
                      variant='secondary'
                      disabled={isBusy}
                      onClick={() => handleEdit(image)}
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

          {/* Upload area */}
          <Button
            type='button'
            disabled={!canUpload}
            variant='outline'
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

          {/* Upload button */}
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
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className='hidden'
            onChange={handleFileChange}
            disabled={isBusy}
          />
        </CardContent>
      </Card>

      {/* Image editor */}
      <PropertyImageEditor
        open={editorOpen}
        file={editingImage?.file ?? null}
        onOpenChange={setEditorOpen}
        onSave={handleEditorSave}
      />
    </>
  );
}
