import type { PropertyResponse } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Paragraph } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyDescription({ property }: Props) {
  return (
    <section className='space-y-5'>
      <Heading2>About this Property</Heading2>

      <Card className='glass-card'>
        <CardContent className='p-6'>
          <Paragraph className='leading-8 whitespace-pre-line'>
            {property.description}
          </Paragraph>
        </CardContent>
      </Card>
    </section>
  );
}
