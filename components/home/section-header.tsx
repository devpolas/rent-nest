import { Heading2, Lead } from "../typography/typography";

export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='space-y-3'>
      <Heading2 className='border-0'>{title}</Heading2>

      <Lead>{description}</Lead>
    </div>
  );
}
