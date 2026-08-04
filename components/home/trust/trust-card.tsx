import type { LucideIcon } from "lucide-react";

import { Heading3, Muted } from "@/components/typography/typography";

type Props = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export default function TrustCard({ icon: Icon, value, label }: Props) {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
      <div className='flex justify-center items-center bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl size-14 text-white'>
        <Icon className='size-7' />
      </div>

      <Heading3 className='text-white'>{value}</Heading3>

      <Muted className='text-white/80'>{label}</Muted>
    </div>
  );
}
