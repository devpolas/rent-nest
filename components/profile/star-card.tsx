import { Heading3, Muted } from "../typography/typography";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className='bg-background p-4 border border-border rounded-xl'>
      <Heading3 className='text-brand'>{value}</Heading3>
      <Muted>{label}</Muted>
    </div>
  );
}
