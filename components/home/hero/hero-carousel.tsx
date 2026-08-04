"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading4, Muted } from "@/components/typography/typography";

import { heroSlides } from "./hero-data";

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slide = heroSlides[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className='relative w-full max-w-xl'>
      <div className='p-2 rounded-3xl overflow-hidden glass-card'>
        <div className='relative rounded-2xl aspect-[4/3] overflow-hidden'>
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className='object-cover animate-[heroZoom_20s_ease-in-out_infinite_alternate]'
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-black/40' />

          <div className='absolute inset-0 opacity-80 brand-gradient' />

          {/* Content */}
          <div className='right-6 bottom-6 left-6 absolute space-y-2'>
            <Heading4 className='text-white'>{slide.title}</Heading4>

            <Muted className='text-white/80'>{slide.subtitle}</Muted>
          </div>

          {/* Controls */}
          <div className='right-6 bottom-6 absolute flex gap-2'>
            <CarouselButton onClick={previousSlide}>
              <ChevronLeft className='size-4' />
            </CarouselButton>

            <CarouselButton onClick={nextSlide}>
              <ChevronRight className='size-4' />
            </CarouselButton>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className='bottom-5 left-1/2 absolute flex gap-2 -translate-x-1/2'>
        {heroSlides.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`
              h-2
              rounded-full
              transition-all
              duration-300
              ${activeIndex === index ? "w-8 bg-brand" : "w-2 bg-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      size='icon'
      onClick={onClick}
      className='hover:bg-white/20 border-white/20 rounded-full text-white glass'
    >
      {children}
    </Button>
  );
}
