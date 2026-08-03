import type { ElementType } from "react";

import { Large, Muted } from "../typography/typography";
type FeatureRowProps = {
  icon: ElementType;
  title: string;
  description: string;
};

export function FeatureRow({
  icon: Icon,
  title,
  description,
}: FeatureRowProps) {
  return (
    <div className='flex gap-4'>
      <div className='flex justify-center items-center bg-brand/10 rounded-lg size-10 shrink-0'>
        <Icon className='size-5 text-brand' />
      </div>

      <div className='space-y-1'>
        <Large>{title}</Large>

        <Muted>{description}</Muted>
      </div>
    </div>
  );
}
