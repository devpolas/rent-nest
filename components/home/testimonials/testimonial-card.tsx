import { Quote, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Large, Muted, Paragraph } from "@/components/typography/typography";

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
};

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className='h-full glass-card'>
      <CardContent className='flex flex-col gap-6 p-8 h-full'>
        <Quote className='size-10 text-brand/30' />

        <div className='flex items-center gap-1'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={
                index < testimonial.rating
                  ? "size-4 fill-current text-brand"
                  : "size-4 text-muted-foreground/30"
              }
            />
          ))}
        </div>

        <Paragraph className='flex-1 mt-0 text-foreground leading-relaxed'>
          {`"${testimonial.quote}"`}
        </Paragraph>

        <div className='flex items-center gap-3 pt-2 border-border/50 border-t'>
          <Avatar className='size-11'>
            <AvatarFallback className='bg-brand/10 font-semibold text-brand'>
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <Large>{testimonial.name}</Large>

            <Muted>{testimonial.role}</Muted>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
