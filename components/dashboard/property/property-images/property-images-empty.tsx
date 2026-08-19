import { ImageIcon } from "lucide-react";

export default function PropertyImagesEmpty() {
  return (
    <div className='flex flex-col justify-center items-center p-10 border border-dashed rounded-xl min-h-64 text-center'>
      <div className='bg-muted mb-4 p-4 rounded-full'>
        <ImageIcon className='size-8 text-muted-foreground' />
      </div>

      <h3 className='font-medium'>No property photos yet</h3>

      <p className='mt-1 max-w-md text-muted-foreground text-sm'>
        Add photos to showcase your property. Your first photo will
        automatically become the cover image.
      </p>
    </div>
  );
}
