import {
  BadgeCheck,
  CreditCard,
  Headphones,
  MessagesSquare,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Heading2, Lead } from "@/components/typography/typography";

import FeatureCard from "./feature-card";

const features = [
  {
    id: 1,
    icon: BadgeCheck,
    title: "Verified Listings",
    description:
      "Every property is reviewed and verified so you only see genuine, up-to-date rentals.",
  },
  {
    id: 2,
    icon: Search,
    title: "Smart Search",
    description:
      "Filter by location, budget, category and amenities to find your match in seconds.",
  },
  {
    id: 3,
    icon: MessagesSquare,
    title: "Direct Messaging",
    description:
      "Chat directly with landlords, ask questions and schedule visits without middlemen.",
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Pay deposits and rent safely through protected, transparent transactions.",
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: "Trusted Reviews",
    description:
      "Read honest reviews from real tenants to rent with complete confidence.",
  },
  {
    id: 6,
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our team is always available to help you at every step of your rental journey.",
  },
];

export default function WhyRentNest() {
  return (
    <section className='bg-brand-surface'>
      <div className='mx-auto px-4 py-20 container'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Why Rent Nest</Badge>

          <Heading2 className='border-0'>
            A smarter way to rent your next home
          </Heading2>

          <Lead className='mt-3'>
            We built Rent Nest to make finding and renting a home simple,
            transparent and stress-free.
          </Lead>
        </div>

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
