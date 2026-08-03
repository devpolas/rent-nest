export default function SupportItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className='flex items-center gap-3 text-muted-foreground'>
      <Icon className='size-5 text-brand' />

      <span>{text}</span>
    </div>
  );
}
