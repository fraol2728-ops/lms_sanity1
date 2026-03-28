"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    id: "faq-free",
    question: "Is this free?",
    answer:
      "Yes. Xybersec includes free starter content, and you can unlock deeper path modules as you progress.",
  },
  {
    id: "faq-experience",
    question: "Do I need experience?",
    answer:
      "No prior experience is required. The academy starts from fundamentals and guides you into advanced tracks.",
  },
  {
    id: "faq-ethiopia",
    question: "Can I learn cybersecurity in Ethiopia?",
    answer:
      "Absolutely. Xybersec is built for Ethiopian learners with online-first access and structured local relevance.",
  },
  {
    id: "faq-legal",
    question: "Is ethical hacking legal?",
    answer:
      "Ethical hacking is legal only with explicit authorization and within applicable laws. Always test systems you are permitted to assess.",
  },
];

export function FAQSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-violet-400/25 bg-gradient-to-b from-violet-500/10 to-[#10101a] p-6 sm:p-8"
    >
      <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
        FAQ
      </h2>
      <Accordion type="single" collapsible className="mt-5 space-y-3">
        {FAQS.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-xl border border-white/10 bg-black/20 px-4"
          >
            <AccordionTrigger className="text-left text-base hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
