"use client";

import { MoreVertical, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  return (
    <Card className='group overflow-hidden'>
      <div className='relative bg-muted aspect-4/3 overflow-hidden'>
        <img
          src={image.url}
          alt='Property photo'
          className='size-full object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {image.isThumbnail && (
          <Badge className='top-3 left-3 absolute gap-1'>
            <Star className='fill-current size-3' />
            Cover photo
          </Badge>
        )}

        <div className='top-3 right-3 absolute'>
          <Button
            type='button'
            variant='secondary'
            size='icon'
            className='shadow-sm size-8'
            disabled={disabled}
          >
            <MoreVertical className='size-4' />
          </Button>
        </div>
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
            onClick={() => onSetCover(image.id)}
          >
            <Star className='mr-2 size-4' />
            Set as cover
          </Button>
        )}

        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='text-destructive hover:text-destructive'
          disabled={disabled}
          onClick={() => onDelete(image.id)}
        >
          <Trash2 className='size-4' />
        </Button>
      </CardContent>
    </Card>
  );
}
