import { Check } from "lucide-react";

import { Large } from "@/components/typography/typography";

type Props = {
  title: string;
};

export default function LandlordBenefit({ title }: Props) {
  return (
    <li className='flex items-center gap-3'>
      <span className='flex flex-shrink-0 justify-center items-center bg-brand-success/15 rounded-full size-6 text-brand-success'>
        <Check className='size-4' />
      </span>

      <Large className='font-medium'>{title}</Large>
    </li>
  );
}
