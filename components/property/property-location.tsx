import type { PropertyResponse } from "@/types/property";
import { Heading2 } from "@/components/typography/typography";
import Location from "../location/location";

type Props = {
  property: PropertyResponse;
};

export default function PropertyLocation({ property }: Props) {
  return (
    <section className='space-y-5'>
      <Heading2>Location</Heading2>

      <Location location={property.location} />
    </section>
  );
}
