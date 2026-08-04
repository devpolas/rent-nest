import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  value: string;
  question: string;
  answer: string;
};

export default function FaqItem({ value, question, answer }: Props) {
  return (
    <AccordionItem
      value={value}
      className='bg-card px-5 border-border/60 rounded-2xl overflow-hidden glass-card'
    >
      <AccordionTrigger className='py-5 text-base hover:no-underline'>
        {question}
      </AccordionTrigger>

      <AccordionContent className='text-muted-foreground text-base leading-relaxed'>
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
