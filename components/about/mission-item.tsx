import { Large, Muted } from "../typography/typography";

export default function MissionItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className='flex gap-4'>
      <Icon className='size-7 text-brand' />
      <div>
        <Large>{title}</Large>
        <Muted>{description}</Muted>
      </div>
    </div>
  );
}
