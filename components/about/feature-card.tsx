import { Heading4, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";
export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-3 p-6'>
        <Icon className='size-8 text-brand' />

        <Heading4>{title}</Heading4>

        <Muted>{description}</Muted>
      </CardContent>
    </Card>
  );
}
