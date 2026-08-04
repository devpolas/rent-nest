import { CheckCircle2, type LucideIcon } from "lucide-react";

import { Heading4, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function RoleCard({
  icon: Icon,
  title,
  description,
  items,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  items: string[];
}) {
  return (
    <Card className='glass-card'>
      <CardContent className='space-y-5 p-8'>
        <div className='flex items-center gap-4'>
          <div className='flex justify-center items-center bg-brand rounded-2xl size-12 text-brand-foreground'>
            <Icon className='size-6' />
          </div>

          <Heading4>{title}</Heading4>
        </div>

        {description && <Muted className='leading-relaxed'>{description}</Muted>}

        <ul className='space-y-3'>
          {items.map((item: string) => (
            <li
              key={item}
              className='flex items-center gap-3 text-muted-foreground'
            >
              <CheckCircle2 className='size-5 text-brand-success shrink-0' />

              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
