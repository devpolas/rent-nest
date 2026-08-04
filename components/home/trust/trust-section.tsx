import { Building2, ShieldCheck, Smile, Users } from "lucide-react";

import { Heading2, Lead } from "@/components/typography/typography";

import TrustCard from "./trust-card";

const stats = [
  { id: 1, icon: Building2, value: "1,500+", label: "Verified Properties" },
  { id: 2, icon: Users, value: "500+", label: "Trusted Landlords" },
  { id: 3, icon: Smile, value: "5,000+", label: "Happy Tenants" },
  { id: 4, icon: ShieldCheck, value: "100%", label: "Verified Listings" },
];

export default function TrustSection() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='relative bg-brand p-10 md:p-16 rounded-3xl overflow-hidden'>
        {/* Decorative glow */}
        <div className='top-0 right-0 absolute bg-white/10 blur-[120px] rounded-full size-80' />

        <div className='relative space-y-12'>
          <div className='mx-auto max-w-2xl text-center'>
            <Heading2 className='border-0 text-brand-foreground'>
              Trusted by thousands across Bangladesh
            </Heading2>

            <Lead className='mt-3 text-brand-foreground/80'>
              Join a growing community renting smarter with Rent Nest every day.
            </Lead>
          </div>

          <div className='gap-8 grid grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <TrustCard
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
