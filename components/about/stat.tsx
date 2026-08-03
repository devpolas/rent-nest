import { Heading3, Muted } from "../typography/typography";

export default function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <Heading3>{value}</Heading3>
      <Muted className='text-brand-foreground/70'>{label}</Muted>
    </div>
  );
}
