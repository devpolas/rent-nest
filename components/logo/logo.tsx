import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import Link from "next/link";

type PropsType = { className?: string | string[] };

export default function Logo({ className }: PropsType) {
  return (
    <Link
      aria-label='Go to homepage'
      href='/'
      className={cn("flex items-center gap-2 font-bold", className)}
    >
      <House size={24} />
      <span className='md:text-lg text-xl xl:text-xl'>
        <strong>
          <strong>RENTREST</strong>
        </strong>
      </span>
    </Link>
  );
}
