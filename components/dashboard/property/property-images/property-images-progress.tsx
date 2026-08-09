"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Props = {
  total: number;
  completed: number;
  uploading: boolean;
};

export default function PropertyImagesProgress({
  total,
  completed,
  uploading,
}: Props) {
  if (total === 0) {
    return null;
  }

  const progress = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

  const finished = !uploading && completed === total;

  return (
    <div className='bg-muted/30 p-4 border rounded-lg'>
      <div className='flex items-center gap-3'>
        {uploading ? (
          <Loader2 className='size-5 text-primary animate-spin shrink-0' />
        ) : finished ? (
          <CheckCircle2 className='size-5 text-green-600 shrink-0' />
        ) : null}

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-center gap-4'>
            <p className='font-medium text-sm'>
              {uploading
                ? "Uploading photos..."
                : finished
                  ? "Photos uploaded successfully"
                  : "Processing photos..."}
            </p>

            <span className='text-muted-foreground text-xs shrink-0'>
              {completed} / {total}
            </span>
          </div>

          <Progress value={progress} className='mt-2' />
        </div>
      </div>
    </div>
  );
}
