import { Heading4, Large, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function ContactCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-4 p-6'>
        <div className='flex justify-center items-center bg-brand/10 rounded-xl size-12'>
          <Icon className='size-6 text-brand' />
        </div>

        <Heading4>{title}</Heading4>

        <Large>{value}</Large>

        <Muted>{description}</Muted>
      </CardContent>
    </Card>
  );
}
