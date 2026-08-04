import { Heading3, Muted } from "../typography/typography";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className='p-4 rounded-xl glass'>
      <Heading3 className='text-brand'>{value}</Heading3>
      <Muted>{label}</Muted>
    </div>
  );
}
