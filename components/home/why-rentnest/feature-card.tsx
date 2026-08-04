import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Heading4, Muted } from "@/components/typography/typography";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: Props) {
  return (
    <Card className='group hover:shadow-lg transition-all hover:-translate-y-1 duration-300 glass-card'>
      <CardContent className='space-y-4 p-6'>
        <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-2xl size-12 text-brand group-hover:text-brand-foreground transition-colors'>
          <Icon className='size-6' />
        </div>

        <Heading4>{title}</Heading4>

        <Muted className='leading-relaxed'>{description}</Muted>
      </CardContent>
    </Card>
  );
}
