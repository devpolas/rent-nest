import { ImageIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { MAX_PROPERTY_IMAGES } from "./property-images.constants";

type Props = {
  count: number;
};

export default function PropertyImagesLimit({ count }: Props) {
  const safeCount = Math.max(0, Math.min(count, MAX_PROPERTY_IMAGES));

  const remaining = MAX_PROPERTY_IMAGES - safeCount;

  const progress = (safeCount / MAX_PROPERTY_IMAGES) * 100;

  const hasReachedLimit = remaining === 0;

  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <ImageIcon className='size-4 text-muted-foreground' />

          <span className='font-medium text-sm'>Photos</span>
        </div>

        <span className='text-muted-foreground text-sm'>
          {safeCount} / {MAX_PROPERTY_IMAGES}
        </span>
      </div>

      <Progress value={progress} />

      <p className='text-muted-foreground text-xs'>
        {hasReachedLimit
          ? `You've reached the maximum of ${MAX_PROPERTY_IMAGES} photos.`
          : `You can add ${remaining} more ${
              remaining === 1 ? "photo" : "photos"
            }.`}
      </p>
    </div>
  );
}
