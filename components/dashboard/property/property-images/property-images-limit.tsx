import { ImageIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";

export const MAX_PROPERTY_IMAGES = 10;

type Props = {
  count: number;
};

export default function PropertyImagesLimit({ count }: Props) {
  const safeCount = Math.max(0, Math.min(count, MAX_PROPERTY_IMAGES));

  const remaining = MAX_PROPERTY_IMAGES - safeCount;

  const progress = (safeCount / MAX_PROPERTY_IMAGES) * 100;

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
        {remaining > 0
          ? `You can add ${remaining} more ${
              remaining === 1 ? "photo" : "photos"
            }.`
          : `You've reached the maximum of ${MAX_PROPERTY_IMAGES} photos.`}
      </p>
    </div>
  );
}
