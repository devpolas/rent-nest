import type { LucideIcon } from "lucide-react";

import { Large, Muted } from "../typography/typography";

export default function MissionItem({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className='flex items-start gap-4'>
      <div className='flex justify-center items-center bg-brand/10 rounded-xl size-11 text-brand shrink-0'>
        <Icon className='size-6' />
      </div>

      <div className='space-y-1'>
        <Large>{title}</Large>
        <Muted className='leading-relaxed'>{description}</Muted>
      </div>
    </div>
  );
}
