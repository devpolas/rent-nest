import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Heading5, Muted } from "@/components/typography/typography";

type Props = {
  icon: LucideIcon;
  name: string;
  count: string;
};

export default function CategoryCard({ icon: Icon, name, count }: Props) {
  return (
    <Card className='group hover:shadow-lg text-center transition-all hover:-translate-y-1 duration-300 cursor-pointer glass-card'>
      <CardContent className='flex flex-col items-center gap-3 p-6'>
        <div className='flex justify-center items-center bg-brand/10 group-hover:bg-brand rounded-2xl size-14 text-brand group-hover:text-brand-foreground transition-colors'>
          <Icon className='size-7' />
        </div>

        <div className='space-y-1'>
          <Heading5>{name}</Heading5>

          <Muted>{count}</Muted>
        </div>
      </CardContent>
    </Card>
  );
}
