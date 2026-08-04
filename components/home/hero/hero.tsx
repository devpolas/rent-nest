import HeroBackground from "./hero-background";
import HeroContent from "./hero-content";
import HeroPropertyPreview from "./hero-property-preview";

export default function Hero() {
  return (
    <section className='relative overflow-hidden'>
      {/* Background Layer */}
      <HeroBackground
        image='/images/hero/apartment.jpg'
        alt='Modern rental apartment'
      />

      {/* Content */}
      <div className='z-10 relative mx-auto px-4 py-10 lg:py-28 container'>
        <div className='items-center gap-14 grid lg:grid-cols-[1fr_0.95fr]'>
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
