"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

type Props = {
  open: boolean;
  file: File | null;
  onOpenChange: (open: boolean) => void;
  onSave: (file: File) => void;
};

const ASPECT = 4 / 3;

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

const MIN_QUALITY = 0.6;
const MAX_QUALITY = 1;
const DEFAULT_QUALITY = 0.8;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));

    image.src = url;
  });

const getRotatedSize = (width: number, height: number, rotation: number) => {
  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));

  return {
    width: Math.ceil(width * cos + height * sin),
    height: Math.ceil(width * sin + height * cos),
  };
};

const getCroppedImage = async ({
  imageSrc,
  crop,
  rotation,
  quality,
  originalName,
}: {
  imageSrc: string;
  crop: Area;
  rotation: number;
  quality: number;
  originalName: string;
}): Promise<File> => {
  const image = await createImage(imageSrc);

  const rotatedSize = getRotatedSize(
    image.naturalWidth,
    image.naturalHeight,
    rotation,
  );

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  canvas.width = rotatedSize.width;
  canvas.height = rotatedSize.height;

  context.save();

  context.translate(rotatedSize.width / 2, rotatedSize.height / 2);

  context.rotate((rotation * Math.PI) / 180);

  context.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);

  context.restore();

  const croppedCanvas = document.createElement("canvas");
  const croppedContext = croppedCanvas.getContext("2d");

  if (!croppedContext) {
    throw new Error("Could not create crop canvas.");
  }

  const cropX = Math.round(crop.x);
  const cropY = Math.round(crop.y);
  const cropWidth = Math.round(crop.width);
  const cropHeight = Math.round(crop.height);

  if (cropWidth <= 0 || cropHeight <= 0) {
    throw new Error("Invalid crop area.");
  }

  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;

  croppedContext.drawImage(
    canvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    croppedCanvas.toBlob(resolve, "image/webp", quality);
  });

  if (!blob) {
    throw new Error("Failed to create edited image.");
  }

  if (blob.size > MAX_FILE_SIZE) {
    throw new Error(
      "Edited image is larger than 2MB. Lower the image quality and try again.",
    );
  }

  const name = originalName.replace(/\.[^/.]+$/, "");

  return new File([blob], `${name}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
};

export default function PropertyImageEditor({
  open,
  file,
  onOpenChange,
  onSave,
}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [crop, setCrop] = useState<Point>({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [quality, setQuality] = useState(DEFAULT_QUALITY);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line
      setImageSrc(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setImageSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    if (!open) {
      return;
    }
    // eslint-disable-next-line
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(MIN_ZOOM);
    setRotation(0);
    setQuality(DEFAULT_QUALITY);
    setCroppedAreaPixels(null);
  }, [open, file]);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleZoomOut = () => {
    setZoom((value) =>
      Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(1))),
    );
  };

  const handleZoomIn = () => {
    setZoom((value) =>
      Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(1))),
    );
  };

  const handleRotateLeft = () => {
    setRotation((value) => value - 90);
  };

  const handleRotateRight = () => {
    setRotation((value) => value + 90);
  };

  const handleReset = () => {
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(MIN_ZOOM);
    setRotation(0);
    setQuality(DEFAULT_QUALITY);
  };

  const handleSave = async () => {
    if (saving || !file || !imageSrc || !croppedAreaPixels) {
      return;
    }

    setSaving(true);

    try {
      const editedFile = await getCroppedImage({
        imageSrc,
        crop: croppedAreaPixels,
        rotation,
        quality,
        originalName: file.name,
      });

      onSave(editedFile);
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to edit image.",
      );
    } finally {
      setSaving(false);
    }
  };

  const qualityPercent = Math.round(quality * 100);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!saving) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className='sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Edit Property Image</DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          <div className='relative bg-black rounded-xl w-full h-[420px] overflow-hidden'>
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={ASPECT}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                objectFit='contain'
                showGrid
              />
            )}
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='font-medium text-sm'>Zoom</span>

              <span className='text-muted-foreground text-sm'>
                {zoom.toFixed(1)}x
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <Button
                type='button'
                size='icon'
                variant='outline'
                disabled={saving || zoom <= MIN_ZOOM}
                onClick={handleZoomOut}
              >
                <ZoomOut className='size-4' />
              </Button>

              <Slider
                value={[zoom]}
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={ZOOM_STEP}
                disabled={saving}
                onValueChange={(values) => {
                  const value = values[0];

                  if (value !== undefined) {
                    setZoom(value);
                  }
                }}
                className='flex-1'
              />

              <Button
                type='button'
                size='icon'
                variant='outline'
                disabled={saving || zoom >= MAX_ZOOM}
                onClick={handleZoomIn}
              >
                <ZoomIn className='size-4' />
              </Button>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            <Button
              type='button'
              variant='outline'
              disabled={saving}
              onClick={handleRotateLeft}
            >
              <RotateCcw className='mr-2 size-4' />
              Rotate Left
            </Button>

            <Button
              type='button'
              variant='outline'
              disabled={saving}
              onClick={handleRotateRight}
            >
              <RotateCw className='mr-2 size-4' />
              Rotate Right
            </Button>

            <Button
              type='button'
              variant='ghost'
              disabled={saving}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='font-medium text-sm'>Image quality</span>

              <span className='text-muted-foreground text-sm'>
                {qualityPercent}%
              </span>
            </div>

            <Slider
              value={[quality]}
              min={MIN_QUALITY}
              max={MAX_QUALITY}
              step={0.05}
              disabled={saving}
              onValueChange={(values) => {
                const value = values[0];

                if (value !== undefined) {
                  setQuality(value);
                }
              }}
            />

            <p className='text-muted-foreground text-xs'>
              Lower quality creates a smaller file.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            disabled={saving}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type='button'
            disabled={saving || !imageSrc || !croppedAreaPixels}
            onClick={handleSave}
          >
            {saving ? "Saving..." : "Use Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
