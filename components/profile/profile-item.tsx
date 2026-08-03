import { Large, Muted } from "../typography/typography";

export default function ProfileItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className='flex gap-3'>
      <Icon className='mt-1 size-5 text-brand' />

      <div>
        <Muted>{label}</Muted>

        <Large>{value}</Large>
      </div>
    </div>
  );
}
