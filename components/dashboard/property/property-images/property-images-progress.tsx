"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

import { Progress } from "@/components/ui/progress";

type Props = {
  total: number;
  completed: number;
  processing: boolean;
};

export default function PropertyImagesProgress({
  total,
  completed,
  processing,
}: Props) {
  if (total <= 0) {
    return null;
  }

  const safeCompleted = Math.max(0, Math.min(completed, total));

  const progress = (safeCompleted / total) * 100;

  const finished = !processing && safeCompleted === total;

  return (
    <div className='bg-muted/30 p-4 border rounded-lg'>
      <div className='flex items-center gap-3'>
        {processing ? (
          <Loader2 className='size-5 text-primary animate-spin shrink-0' />
        ) : finished ? (
          <CheckCircle2 className='size-5 text-green-600 shrink-0' />
        ) : null}

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-center gap-4'>
            <p className='font-medium text-sm'>
              {processing
                ? "Processing photos..."
                : finished
                  ? "Photos processed successfully"
                  : "Processing photos..."}
            </p>

            <span className='text-muted-foreground text-xs shrink-0'>
              {safeCompleted} / {total}
            </span>
          </div>

          <Progress value={progress} className='mt-2' />
        </div>
      </div>
    </div>
  );
}
