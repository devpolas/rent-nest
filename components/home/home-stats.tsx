import { Heading3, Muted } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function HomeStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='p-6 text-center'>
        <Heading3 className='text-brand'>{value}</Heading3>

        <Muted>{label}</Muted>
      </CardContent>
    </Card>
  );
}
