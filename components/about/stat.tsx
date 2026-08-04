import type { LucideIcon } from "lucide-react";

import { Heading3, Muted } from "../typography/typography";

export default function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon?: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
      {Icon && (
        <div className='flex justify-center items-center bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl size-14 text-brand-foreground'>
          <Icon className='size-7' />
        </div>
      )}

      <Heading3 className='text-brand-foreground'>{value}</Heading3>

      <Muted className='text-brand-foreground/70'>{label}</Muted>
    </div>
  );
}
