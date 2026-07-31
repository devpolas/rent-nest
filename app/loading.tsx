import Logo from "@/components/logo/logo";
import { Muted } from "@/components/typography/typography";

export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center gap-8 min-h-[70vh]'>
      <Logo />

      <div className='relative'>
        <div className='bg-brand/20 rounded-full size-12 animate-ping' />

        <div className='absolute inset-0 bg-brand m-auto rounded-full size-4' />
      </div>

      <Muted>Loading your experience...</Muted>
    </div>
  );
}
