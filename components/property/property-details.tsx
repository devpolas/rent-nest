import { ReviewResponse } from "@/types/review";
import { PropertyResponse } from "../../types/property";
import PropertyAmenities from "./property-amenities";
import PropertyDescription from "./property-description";
import PropertyFeatures from "./property-features";
import PropertyGallery from "./property-gallery";
import PropertyHeader from "./property-header";
import PropertyLocation from "./property-location";
import PropertyPriceCard from "./property-price";
import PropertyRules from "./property-rules";
import PropertySidebar from "./property-sidebar";
import PropertySpecifications from "./property-specifications";
import PropertyReviews from "./property-reviews";
export default function PropertyDetails({
  property,
  reviews,
}: {
  property: PropertyResponse;
  reviews: ReviewResponse[];
}) {
  return (
    <>
      <PropertyGallery images={property.images} status={property.status} />

      <div className='gap-10 grid lg:grid-cols-3'>
        <main className='space-y-10 lg:col-span-2'>
          <PropertyHeader property={property} />
          <PropertyPriceCard property={property} />
          <PropertyDescription property={property} />
          <PropertySpecifications property={property} />
          <PropertyAmenities property={property} />
          <PropertyFeatures property={property} />
          <PropertyRules property={property} />
          <PropertyLocation property={property} />
          <PropertyReviews reviews={reviews} />
        </main>

        <PropertySidebar property={property} />
      </div>
    </>
  );
}
