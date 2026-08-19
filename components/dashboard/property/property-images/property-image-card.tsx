"use client";

import { Star, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { PropertyImage } from "@/types/property-image";

type Props = {
  image: PropertyImage;
  onSetCover: (imageId: string) => void;
  onDelete: (imageId: string) => void;
  disabled?: boolean;
};

export default function PropertyImageCard({
  image,
  onSetCover,
  onDelete,
  disabled = false,
}: Props) {
  const handleSetCover = () => {
    if (!disabled && !image.isThumbnail) {
      onSetCover(image.id);
    }
  };

  const handleDelete = () => {
    if (!disabled) {
      onDelete(image.id);
    }
  };

  return (
    <Card className='group overflow-hidden'>
      <div className='relative bg-muted aspect-[4/3] overflow-hidden'>
        <img
          src={image.url}
          alt='Property photo'
          loading='lazy'
          className='size-full object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {image.isThumbnail && (
          <Badge className='top-3 left-3 absolute gap-1'>
            <Star className='fill-current size-3' />
            Cover photo
          </Badge>
        )}
      </div>

      <CardContent className='flex justify-between items-center gap-2 p-3'>
        {image.isThumbnail ? (
          <span className='font-medium text-muted-foreground text-xs'>
            Cover photo
          </span>
        ) : (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            disabled={disabled}
            onClick={handleSetCover}
          >
            <Star className='mr-2 size-4' />
            Set as cover
          </Button>
        )}

        <Button
          type='button'
          variant='ghost'
          size='icon'
          disabled={disabled}
          onClick={handleDelete}
          className='text-destructive hover:text-destructive'
          aria-label='Delete property photo'
        >
          <Trash2 className='size-4' />
        </Button>
      </CardContent>
    </Card>
  );
}
