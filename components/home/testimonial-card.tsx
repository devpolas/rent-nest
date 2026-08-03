import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import { Large, Muted, Paragraph } from "../typography/typography";

type TestimonialCardProps = {
  name: string;
  role: string;
  text: string;
};

export function TestimonialCard({ name, role, text }: TestimonialCardProps) {
  return (
    <Card className='bg-brand-surface'>
      <CardContent className='space-y-5 p-6'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <Large>{name}</Large>

            <Muted>{role}</Muted>
          </div>
        </div>

        <Paragraph>{text}</Paragraph>
      </CardContent>
    </Card>
  );
}
