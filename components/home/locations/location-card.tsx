import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Heading4, Muted } from "@/components/typography/typography";

type Props = {
  name: string;
  image: string;
  properties: string;
  className?: string;
};

export default function LocationCard({
  name,
  image,
  properties,
  className,
}: Props) {
  return (
    <Link
      href='/properties'
      className={`group relative overflow-hidden rounded-3xl ${className ?? ""}`}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={`Rental properties in ${name}`}
        fill
        className='object-cover group-hover:scale-110 transition-transform duration-500'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

      <div className='right-5 bottom-5 left-5 absolute flex justify-between items-end'>
        <div>
          <Heading4 className='text-white'>{name}</Heading4>

          <Muted className='text-white/80'>{properties}</Muted>
        </div>

        <div className='flex justify-center items-center bg-white/15 group-hover:bg-brand backdrop-blur-xl border border-white/20 rounded-full size-10 text-white transition-colors'>
          <ArrowUpRight className='size-5' />
        </div>
      </div>
    </Link>
  );
}
