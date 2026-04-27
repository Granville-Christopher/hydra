import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What skin types is HydraShield suitable for?",
    a: "HydraShield is formulated for all skin types - dry, oily, combination, sensitive, and normal. The lightweight, non-comedogenic formula hydrates without clogging pores or feeling greasy.",
  },
  {
    q: "Is it really fragrance-free?",
    a: "Yes, 100% fragrance-free. We don't use any synthetic fragrances, essential oils, or masking fragrances. This makes it ideal for sensitive skin and people who prefer unscented products.",
  },
  {
    q: "Can my partner and I both use it?",
    a: "Absolutely! HydraShield is unisex by design. Skin is skin - ceramides, hyaluronic acid, and niacinamide work for everyone regardless of gender. Many of our customers share one jar with their partner or family.",
  },
  {
    q: "What does 'barrier repair' mean?",
    a: "Your skin barrier is the outermost layer that protects against environmental stressors, pollution, and moisture loss. When damaged by over-exfoliation, harsh products, or weather, skin becomes dry, red, and irritated. Our ceramide-rich formula helps rebuild this protective barrier.",
  },
  {
    q: "How long does one jar last?",
    a: "With daily morning and evening use, one 50ml jar typically lasts 6-8 weeks for a single user, or about 4 weeks when shared between two people.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently, we ship within the United States with free standard shipping on all orders. International shipping is coming soon - join our email list to be notified.",
  },
  {
    q: "What's your return policy?",
    a: "We offer a 30-day satisfaction guarantee. If you're not completely happy with HydraShield, return the jar, even if opened, for a full refund.",
  },
  {
    q: "Is it tested on animals?",
    a: "Never. HydraShield is 100% cruelty-free and vegan. We do not test on animals at any stage of product development.",
  },
];

const FAQPage = () => (
  <main className="pt-20 pb-24 sm:pt-24 sm:pb-20">
    <div className="container mx-auto max-w-3xl px-4 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 sm:space-y-10">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
            Help Center
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border px-4 data-[state=open]:bg-card sm:px-6"
            >
              <AccordionTrigger className="text-left text-xs font-medium text-foreground transition-colors hover:text-primary sm:text-sm">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </main>
);

export default FAQPage;
