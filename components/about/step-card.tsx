import type { LucideIcon } from "lucide-react";

import { Heading4, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function StepCard({
  icon: Icon,
  number,
  title,
  description,
}: {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Card className='relative overflow-hidden glass-card'>
      <CardContent className='space-y-4 p-8'>
        <span className='top-4 right-5 absolute font-extrabold text-brand/10 text-6xl leading-none'>
          {number}
        </span>

        <div className='flex justify-center items-center bg-brand rounded-2xl size-14 text-brand-foreground'>
          <Icon className='size-7' />
        </div>

        <Heading4>{title}</Heading4>

        <Muted className='leading-relaxed'>{description}</Muted>
      </CardContent>
    </Card>
  );
}
