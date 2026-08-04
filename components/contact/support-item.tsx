import type { LucideIcon } from "lucide-react";

export default function SupportItem({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className='flex items-center gap-3 text-muted-foreground'>
      <div className='flex justify-center items-center bg-brand/10 rounded-lg size-9 text-brand shrink-0'>
        <Icon className='size-5' />
      </div>

      <span>{text}</span>
    </div>
  );
}
