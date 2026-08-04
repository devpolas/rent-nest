import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Label, Muted } from "@/components/typography/typography";

type Props = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export default function HeroStatCard({ icon: Icon, value, label }: Props) {
  return (
    <Card className='group hover:border-brand/30 transition-all hover:-translate-y-1 duration-300 glass-card'>
      <CardContent className='flex items-center gap-3 p-4 sm:p-5'>
        <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-xl size-11 text-brand group-hover:text-brand-foreground transition-all'>
          <Icon className='size-5' />
        </div>

        <div className='space-y-1'>
          <Label className='font-bold text-lg'>{value}</Label>

          <Muted>{label}</Muted>
        </div>
      </CardContent>
    </Card>
  );
}
