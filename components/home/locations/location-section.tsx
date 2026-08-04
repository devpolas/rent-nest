import { Badge } from "@/components/ui/badge";
import { Heading2, Lead } from "@/components/typography/typography";

import LocationCard from "./location-card";

const locations = [
  {
    id: 1,
    name: "Dhaka",
    image: "/images/locations/dhaka.png",
    properties: "620+ properties",
    className: "lg:col-span-2 h-72 lg:h-full",
  },
  {
    id: 2,
    name: "Chittagong",
    image: "/images/locations/chittagong.png",
    properties: "310+ properties",
    className: "h-72",
  },
  {
    id: 3,
    name: "Sylhet",
    image: "/images/locations/sylhet.png",
    properties: "180+ properties",
    className: "h-72",
  },
  {
    id: 4,
    name: "Cox's Bazar",
    image: "/images/locations/coxs-bazar.png",
    properties: "140+ properties",
    className: "lg:col-span-2 h-72",
  },
];

export default function LocationSection() {
  return (
    <section className='bg-brand-surface'>
      <div className='mx-auto px-4 py-20 container'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Popular cities</Badge>

          <Heading2 className='border-0'>Explore Top Locations</Heading2>

          <Lead className='mt-3'>
            Discover rental homes in the most sought-after cities across
            Bangladesh.
          </Lead>
        </div>

        <div className='gap-5 grid lg:grid-cols-4 auto-rows-[18rem]'>
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              name={location.name}
              image={location.image}
              properties={location.properties}
              className={location.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
