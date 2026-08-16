import type { PropertyResponse } from "@/types/property";

import PropertyBookingCard from "./property-booking-card";
import PropertyLandlordCard from "./property-landlord-card";

type Props = {
  property: PropertyResponse;
};

export default function PropertySidebar({ property }: Props) {
  return (
    <aside>
      <div className='space-y-6'>
        <PropertyBookingCard property={property} />
        <PropertyLandlordCard property={property} />
      </div>
    </aside>
  );
}
