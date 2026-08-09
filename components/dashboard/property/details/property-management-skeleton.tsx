import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyManagementSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='space-y-4'>
        <Skeleton className='w-32 h-8' />

        <div className='flex justify-between items-center gap-4'>
          <div className='space-y-2'>
            <Skeleton className='w-80 h-8' />
            <Skeleton className='w-96 h-4' />
            <Skeleton className='w-48 h-3' />
          </div>

          <div className='flex gap-2'>
            <Skeleton className='w-32 h-10' />
            <Skeleton className='w-10 h-10' />
          </div>
        </div>
      </div>

      {/* Setup */}
      <div className='space-y-5 p-6 border rounded-xl'>
        <div className='space-y-2'>
          <Skeleton className='w-36 h-5' />
          <Skeleton className='w-80 h-4' />
        </div>

        <div className='gap-4 grid md:grid-cols-3'>
          <SetupSkeleton />
          <SetupSkeleton />
          <SetupSkeleton />
        </div>
      </div>

      {/* Content */}
      <div className='gap-6 grid lg:grid-cols-3'>
        <main className='space-y-6 lg:col-span-2'>
          {/* Overview */}
          <div className='space-y-6 p-6 border rounded-xl'>
            <Skeleton className='w-40 h-5' />

            <Skeleton className='w-full h-24' />

            <div className='gap-6 grid sm:grid-cols-2'>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='flex gap-3'>
                  <Skeleton className='rounded-md size-9' />

                  <div className='space-y-2'>
                    <Skeleton className='w-20 h-3' />
                    <Skeleton className='w-28 h-4' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div className='space-y-5 p-6 border rounded-xl'>
            <div className='flex justify-between'>
              <div className='space-y-2'>
                <Skeleton className='w-24 h-5' />
                <Skeleton className='w-64 h-4' />
              </div>

              <Skeleton className='w-12 h-6' />
            </div>

            <div className='gap-3 grid grid-cols-2 sm:grid-cols-4'>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className='rounded-lg aspect-video' />
              ))}
            </div>
          </div>

          {/* Location */}
          <div className='space-y-5 p-6 border rounded-xl'>
            <div className='flex justify-between'>
              <div className='space-y-2'>
                <Skeleton className='w-40 h-5' />
                <Skeleton className='w-72 h-4' />
              </div>

              <Skeleton className='w-20 h-9' />
            </div>

            <Skeleton className='w-full h-20' />

            <div className='gap-4 grid sm:grid-cols-2'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  <Skeleton className='w-16 h-3' />
                  <Skeleton className='w-28 h-4' />
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside>
          <div className='space-y-5 p-6 border rounded-xl'>
            <Skeleton className='w-32 h-5' />

            <Skeleton className='w-20 h-6' />

            <Skeleton className='w-full h-px' />

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='flex justify-between'>
                <Skeleton className='w-20 h-4' />
                <Skeleton className='w-16 h-4' />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SetupSkeleton() {
  return (
    <div className='flex gap-3 p-4 border rounded-lg'>
      <Skeleton className='rounded-full size-9' />

      <div className='flex-1 space-y-2'>
        <Skeleton className='w-28 h-4' />
        <Skeleton className='w-full h-3' />
      </div>
    </div>
  );
}
