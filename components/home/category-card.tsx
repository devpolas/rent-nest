import type { ElementType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Heading4, Muted } from "../typography/typography";

type CategoryCardProps = {
  icon: ElementType;
  title: string;
  count: string;
};

export function CategoryCard({ icon: Icon, title, count }: CategoryCardProps) {
  return (
    <Card className='group bg-brand-surface hover:shadow-md hover:border-brand transition'>
      <CardContent className='space-y-4 p-6'>
        <div className='flex justify-center items-center bg-brand/10 rounded-xl size-12'>
          <Icon className='size-6 text-brand' />
        </div>

        <Heading4>{title}</Heading4>

        <Muted>{count}</Muted>
      </CardContent>
    </Card>
  );
}
