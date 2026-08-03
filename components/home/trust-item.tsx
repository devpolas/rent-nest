import type { ElementType } from "react";
import { Large } from "../typography/typography";

type TrustItemProps = {
  icon: ElementType;
  title: string;
};

export function TrustItem({ icon: Icon, title }: TrustItemProps) {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
      <Icon className='size-8' />

      <Large className='text-brand-foreground'>{title}</Large>
    </div>
  );
}
