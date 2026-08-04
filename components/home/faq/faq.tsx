import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Heading2, Lead } from "@/components/typography/typography";

import FaqItem from "./faq-item";

const faqs = [
  {
    id: "item-1",
    question: "How do I know a property listing is genuine?",
    answer:
      "Every property on Rent Nest is reviewed and verified before it goes live. Look for the verified badge, and read reviews from real tenants for extra peace of mind.",
  },
  {
    id: "item-2",
    question: "Is it free to search and contact landlords?",
    answer:
      "Yes. Browsing properties, saving favorites and messaging landlords is completely free for tenants. You only pay the rent and deposit once you confirm a booking.",
  },
  {
    id: "item-3",
    question: "How do rental payments work?",
    answer:
      "Payments are handled through our secure, transparent payment system. You will always see the full breakdown before you pay, with no hidden fees.",
  },
  {
    id: "item-4",
    question: "How can I list my property as a landlord?",
    answer:
      "Create a landlord account, add your property details and photos, and publish. Once approved, your listing reaches thousands of verified tenants instantly.",
  },
  {
    id: "item-5",
    question: "Can I schedule a visit before renting?",
    answer:
      "Absolutely. Message the landlord directly through Rent Nest to ask questions and arrange a convenient time to view the property before making a decision.",
  },
];

export default function Faq() {
  return (
    <section className='mx-auto px-4 py-20 container'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <Badge className='bg-brand/10 mb-4 text-brand'>FAQ</Badge>

        <Heading2 className='border-0'>Frequently asked questions</Heading2>

        <Lead className='mt-3'>
          Everything you need to know about renting and listing on Rent Nest.
        </Lead>
      </div>

      <Accordion
        type='single'
        collapsible
        defaultValue='item-1'
        className='gap-4 mx-auto max-w-3xl'
      >
        {faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            value={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </Accordion>
    </section>
  );
}
