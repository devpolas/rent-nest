import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedPropertySkeleton() {
  return (
    <Card className='overflow-hidden glass-card'>
      <Skeleton className='rounded-none aspect-4/3' />

      <CardContent className='space-y-5 p-5'>
        <div className='space-y-2'>
          <Skeleton className='w-3/4 h-6' />
          <Skeleton className='w-1/2 h-4' />
        </div>

        <div className='flex justify-between items-center'>
          <Skeleton className='rounded-full w-16 h-7' />
          <Skeleton className='w-20 h-4' />
        </div>

        <Skeleton className='rounded-xl h-16' />

        <div className='flex justify-between items-end pt-2'>
          <Skeleton className='w-24 h-10' />
          <Skeleton className='w-28 h-10' />
        </div>
      </CardContent>
    </Card>
  );
}
