import { CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Heading3, Muted } from "../typography/typography";

type AudienceCardProps = {
  title: string;
  description: string;
  items: string[];
};

export function AudienceCard({ title, description, items }: AudienceCardProps) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-6 p-8'>
        <Heading3>{title}</Heading3>

        <Muted>{description}</Muted>

        <ul className='space-y-3'>
          {items.map((item) => (
            <li key={item} className='flex items-center gap-3'>
              <CheckCircle2 className='size-5 text-brand-success' />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
