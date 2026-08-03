import { Card, CardContent } from "@/components/ui/card";
import { Heading3, Muted } from "../typography/typography";

type StatCardProps = {
  value: string;
  label: string;
};

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='p-6 text-center'>
        <Heading3 className='text-brand'>{value}</Heading3>

        <Muted>{label}</Muted>
      </CardContent>
    </Card>
  );
}
