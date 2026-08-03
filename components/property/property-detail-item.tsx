import { Large, Muted } from "../typography/typography";

export default function PropertyDetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className='bg-brand-surface p-4 border border-border rounded-xl'>
      <Icon className='mb-2 size-6 text-brand' />
      <Muted>{label}</Muted>
      <Large>{value}</Large>
    </div>
  );
}
