import { CheckCircle2 } from "lucide-react";
import { Heading4 } from "../typography/typography";
import { Card, CardContent } from "../ui/card";

export default function RoleCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
}) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-4 p-6'>
        <Icon className='size-8 text-brand' />

        <Heading4>{title}</Heading4>

        <ul className='space-y-2'>
          {items.map((item: string) => (
            <li
              key={item}
              className='flex items-center gap-2 text-muted-foreground'
            >
              <CheckCircle2 className='size-4 text-brand-success' />

              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
