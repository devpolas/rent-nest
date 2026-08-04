"use client";

import Image from "next/image";

type Props = {
  image: string;
  alt: string;
};

export default function HeroBackground({ image, alt }: Props) {
  return (
    <div className='z-0 absolute inset-0 overflow-hidden'>
      {/* Background Image */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        className='object-cover scale-105 animate-[heroZoom_20s_linear_infinite_alternate]'
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Brand Gradient */}
      <div className='absolute inset-0 opacity-90 brand-gradient' />

      {/* Top Glow */}
      <div className='top-0 left-0 absolute bg-brand/20 blur-[140px] rounded-full w-[500px] h-[500px]' />

      {/* Bottom Glow */}
      <div className='right-0 bottom-0 absolute bg-brand-success/15 blur-[160px] rounded-full w-[500px] h-[500px]' />

      {/* Decorative Blob */}
      <div className='top-1/4 left-1/3 absolute bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full size-72 animate-pulse' />

      {/* Bottom Fade */}
      <div className='bottom-0 absolute inset-x-0 bg-gradient-to-t from-background via-background/60 to-transparent h-48' />
    </div>
  );
}
