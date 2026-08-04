import HeroBackground from "./hero-background";
import HeroContent from "./hero-content";
import HeroPropertyPreview from "./hero-property-preview";

export default function Hero() {
  return (
    <section className='relative flex items-center min-h-screen overflow-hidden'>
      {/* Background Layer */}
      <HeroBackground
        image='/images/hero/apartment.png'
        alt='Modern rental apartment'
      />

      {/* Content */}
      <div className='z-10 relative mx-auto px-4 py-24 lg:py-28 w-full container'>
        <div className='items-center gap-10 lg:gap-14 grid lg:grid-cols-[1fr_0.95fr]'>
          {/* Left Content */}
          <HeroContent />

          {/* Right Visual */}
          <div className='order-first lg:order-last'>
            <HeroPropertyPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
