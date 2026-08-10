"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

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

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = url;
  });

/**
 * Calculate the bounding box of a rotated image.
 */
const getRotatedSize = (width: number, height: number, rotation: number) => {
  const rotationRadians = (rotation * Math.PI) / 180;

  const sin = Math.abs(Math.sin(rotationRadians));

  const cos = Math.abs(Math.cos(rotationRadians));

  return {
    width: Math.floor(width * cos + height * sin),
    height: Math.floor(width * sin + height * cos),
  };
};

/**
 * Create the final cropped image.
 *
 * Important:
 *
 * react-easy-crop returns crop coordinates
 * from the rotated image coordinate system.
 *
 * Therefore we first render the rotated image
 * into a canvas and then extract the crop.
 */
const getCroppedImage = async (
  imageSrc: string,
  crop: Area,
  rotation: number,
  quality: number,
  originalName: string,
): Promise<File> => {
  const image = await createImage(imageSrc);

  const rotatedSize = getRotatedSize(image.width, image.height, rotation);

  /**
   * Canvas containing the complete
   * rotated image.
   */
  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create image canvas.");
  }

  canvas.width = rotatedSize.width;

  canvas.height = rotatedSize.height;

  /**
   * Draw rotated image.
   */
  context.save();

  context.translate(rotatedSize.width / 2, rotatedSize.height / 2);

  context.rotate((rotation * Math.PI) / 180);

  context.drawImage(image, -image.width / 2, -image.height / 2);

  context.restore();

  /**
   * Create the final crop canvas.
   */
  const croppedCanvas = document.createElement("canvas");

  const croppedContext = croppedCanvas.getContext("2d");

  if (!croppedContext) {
    throw new Error("Could not create crop canvas.");
  }

  croppedCanvas.width = crop.width;

  croppedCanvas.height = crop.height;

  /**
   * Extract the correct crop.
   */
  const croppedImageData = context.getImageData(
    Math.round(crop.x),
    Math.round(crop.y),
    Math.round(crop.width),
    Math.round(crop.height),
  );

  croppedContext.putImageData(croppedImageData, 0, 0);

  /**
   * Export as WebP.
   */
  const blob = await new Promise<Blob | null>((resolve) => {
    croppedCanvas.toBlob(resolve, "image/webp", quality);
  });

  if (!blob) {
    throw new Error("Failed to create edited image.");
  }

  /**
   * Remove the original extension.
   */
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

  const [quality, setQuality] = useState(0.8);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [saving, setSaving] = useState(false);

  /**
   * Create preview URL.
   */
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

  /**
   * Reset editor whenever
   * another image is opened.
   */
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
    setQuality(0.8);

    setCroppedAreaPixels(null);
  }, [open, file]);

  /**
   * react-easy-crop gives us
   * the exact pixel coordinates
   * needed for extraction.
   */
  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
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
    setQuality(0.8);
  };

  const handleSave = async () => {
    if (!imageSrc || !file || !croppedAreaPixels) {
      return;
    }

    try {
      setSaving(true);

      const editedFile = await getCroppedImage(
        imageSrc,
        croppedAreaPixels,
        rotation,
        quality,
        file.name,
      );

      onSave(editedFile);

      onOpenChange(false);
    } catch (error) {
      console.error("Image editing error:", error);
    } finally {
      setSaving(false);
    }
  };

  const qualityPercent = useMemo(() => Math.round(quality * 100), [quality]);

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
          {/* Cropper */}
          <div className='relative bg-black rounded-xl w-full h-[420px] overflow-hidden'>
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={ASPECT}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                objectFit='cover'
                showGrid
              />
            )}
          </div>

          {/* Zoom */}
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
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
              >
                <ZoomOut className='size-4' />
              </Button>

              <Slider
                value={[zoom]}
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={ZOOM_STEP}
                onValueChange={(values) => {
                  setZoom(values[0]);
                }}
                className='flex-1'
              />

              <Button
                type='button'
                size='icon'
                variant='outline'
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
              >
                <ZoomIn className='size-4' />
              </Button>
            </div>
          </div>

          {/* Rotation */}
          <div className='flex flex-wrap gap-2'>
            <Button type='button' variant='outline' onClick={handleRotateLeft}>
              <RotateCcw className='mr-2 size-4' />
              Rotate Left
            </Button>

            <Button type='button' variant='outline' onClick={handleRotateRight}>
              <RotateCw className='mr-2 size-4' />
              Rotate Right
            </Button>

            <Button type='button' variant='ghost' onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* Quality */}
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
              onValueChange={(values) => {
                setQuality(values[0]);
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
            {saving ? <>Saving...</> : "Use Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
