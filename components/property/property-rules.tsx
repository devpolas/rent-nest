import { ShieldCheck } from "lucide-react";

import type { PropertyResponse } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Label, Muted } from "@/components/typography/typography";

type Props = {
  property: PropertyResponse;
};

export default function PropertyRules({ property }: Props) {
  return (
    <section className='space-y-5'>
      <div className='flex justify-between items-center'>
        <Heading2 className='pb-0 border-none'>House Rules</Heading2>

        <Muted>{property.rules.length} Rules</Muted>
      </div>

      {property.rules.length === 0 ? (
        <Card className='glass-card'>
          <CardContent className='py-10 text-center'>
            <Muted>No rules have been added.</Muted>
          </CardContent>
        </Card>
      ) : (
        <div className='space-y-3'>
          {property.rules.map((rule) => (
            <RuleItem key={rule.rule.id} name={rule.rule.name} />
          ))}
        </div>
      )}
    </section>
  );
}

function RuleItem({ name }: { name: string }) {
  return (
    <div className='flex items-center gap-3 p-4 rounded-xl glass'>
      <div className='bg-brand-success/10 p-2 rounded-lg'>
        <ShieldCheck className='size-5 text-brand-success' />
      </div>

      <Label>{name}</Label>
    </div>
  );
}
