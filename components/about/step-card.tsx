import { Heading4, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-4 p-6'>
        <div className='font-black text-brand text-4xl'>{number}</div>

        <Heading4>{title}</Heading4>

        <Muted>{description}</Muted>
      </CardContent>
    </Card>
  );
}
