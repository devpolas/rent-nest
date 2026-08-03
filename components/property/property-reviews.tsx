import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heading2, Large, Paragraph } from "@/components/typography/typography";
import { ReviewResponse } from "@/types/review";

type Props = {
  reviews: ReviewResponse[];
};

export default function PropertyReviews({ reviews }: Props) {
  return (
    <section className='space-y-5'>
      <Heading2>Reviews</Heading2>
      <div className='gap-5 grid md:grid-cols-2'>
        {reviews.map((review) => (
          <Card key={review.id} className='glass-card'>
            <CardContent className='space-y-4 p-5'>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Large>{review.tenant.name}</Large>
              </div>
              <div className='flex'>
                {Array.from({
                  length: review.rating,
                }).map((_, i) => (
                  <Star
                    key={i}
                    className='fill-yellow-400 size-4 text-yellow-400 // // // //'
                  />
                ))}
              </div>
              <Paragraph>{review.comment}</Paragraph>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
