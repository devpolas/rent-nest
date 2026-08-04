import Hero from "./hero/hero";
import CategorySection from "./categories/category-section";
import FeaturedProperties from "./featured-properties/featured-properties";
import WhyRentNest from "./why-rentnest/why-rentnest";
import HowItWorks from "./how-it-works/how-it-works";
import LocationSection from "./locations/location-section";
import TrustSection from "./trust/trust-section";
import Testimonials from "./testimonials/testimonials";
import LandlordCta from "./landlord-cta/landlord-cta";
import Faq from "./faq/faq";
import FooterCta from "./footer-cta/footer-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProperties />
      <WhyRentNest />
      <HowItWorks />
      <LocationSection />
      <TrustSection />
      <Testimonials />
      <LandlordCta />
      <Faq />
      <FooterCta />
    </>
  );
}
