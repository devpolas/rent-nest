import { KeyRound, Search, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Heading2, Lead } from "@/components/typography/typography";

import StepCard from "./step-card";

const steps = [
  {
    id: 1,
    icon: Search,
    step: "01",
    title: "Search Properties",
    description:
      "Browse thousands of verified rentals and filter by location, budget and category to find your match.",
  },
  {
    id: 2,
    icon: Send,
    step: "02",
    title: "Send a Request",
    description:
      "Message the landlord directly, ask questions and submit a rental request in just a few clicks.",
  },
  {
    id: 3,
    icon: KeyRound,
    step: "03",
    title: "Move In",
    description:
      "Confirm your booking, complete a secure payment and get the keys to your new home.",
  },
];

export default function HowItWorks() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <Badge className='bg-brand/10 mb-4 text-brand'>Simple process</Badge>

        <Heading2 className='border-0'>How Rent Nest Works</Heading2>

        <Lead className='mt-3'>
          Renting your next home is only three simple steps away.
        </Lead>
      </div>

      <div className='gap-6 grid md:grid-cols-3'>
        {steps.map((step) => (
          <StepCard
            key={step.id}
            icon={step.icon}
            step={step.step}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
