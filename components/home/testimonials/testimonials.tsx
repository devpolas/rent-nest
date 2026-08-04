import { Badge } from "@/components/ui/badge";
import { Heading2, Lead } from "@/components/typography/typography";

import TestimonialCarousel from "./testimonial-carousel";
import type { Testimonial } from "./testimonial-card";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Tenant · Dhaka",
    initials: "AR",
    rating: 5,
    quote:
      "Rent Nest made finding my apartment so easy. Every listing was verified and I could message the landlord directly. Moved in within a week!",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Landlord · Chittagong",
    initials: "TH",
    rating: 5,
    quote:
      "As a landlord, managing my listings and rental requests from one dashboard is a game changer. The quality of tenants has been excellent.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Tenant · Sylhet",
    initials: "NJ",
    rating: 4,
    quote:
      "I loved being able to save my favorite homes and compare them. The reviews from other tenants gave me real confidence before renting.",
  },
  {
    id: 4,
    name: "Rakib Chowdhury",
    role: "Tenant · Khulna",
    initials: "RC",
    rating: 5,
    quote:
      "Secure payments and transparent pricing meant no surprises. The whole process felt safe and professional from start to finish.",
  },
  {
    id: 5,
    name: "Farhana Akter",
    role: "Landlord · Dhaka",
    initials: "FA",
    rating: 5,
    quote:
      "Listing my property took minutes and I started receiving genuine requests the same day. Support was responsive whenever I needed help.",
  },
];

export default function Testimonials() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <Badge className='bg-brand/10 mb-4 text-brand'>Testimonials</Badge>

        <Heading2 className='border-0'>Loved by tenants and landlords</Heading2>

        <Lead className='mt-3'>
          Hear from the people who found their perfect home and grew their
          rental business with Rent Nest.
        </Lead>
      </div>

      <TestimonialCarousel testimonials={testimonials} />
    </section>
  );
}
