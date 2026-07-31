import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link
      href='/'
      aria-label='Go to homepage'
      className={cn(
        "inline-flex items-center gap-1 font-bold tracking-tight",
        className,
      )}
    >
      <div className='flex justify-center items-center shadow-sm rounded-xl text-brand'>
        <House className='size-6' strokeWidth={2.4} />
      </div>

      <span className='font-extrabold text-lg lg:text-xl xl:text-2xl'>
        <span className='text-brand'>RENT</span>
        <span className='text-foreground'>REST</span>
      </span>
    </Link>
  );
}
