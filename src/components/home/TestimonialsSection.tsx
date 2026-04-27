import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "My skin has never felt this hydrated. I used to rotate between three products, and now HydraShield covers what I actually need every day.",
    rating: 5,
  },
  {
    name: "James K.",
    text: "As a guy who never cared about skincare, this made it easy. No fragrance, no confusion, and my skin finally looks healthy instead of tired.",
    rating: 5,
  },
  {
    name: "Priya R.",
    text: "My partner and I both use it. It works for my dry skin and his oilier skin, so we keep one jar on the counter and reorder together.",
    rating: 5,
  },
  {
    name: "Alex T.",
    text: "The difference for my redness and tightness has been huge. It feels rich going on but never heavy after it settles in.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  const next = () => setIdx((current) => (current === testimonials.length - 1 ? 0 : current + 1));

  return (
    <section className="bg-card py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">Real Results</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            What customers say after switching to HydraShield
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
            The most common feedback is simple: softer skin, less guesswork, and one product that actually earns its
            place on the counter.
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[1.75rem] border border-border bg-background p-5 text-center shadow-card sm:rounded-[2rem] sm:p-8 lg:p-12"
          >
            <div className="mb-4 flex justify-center gap-1">
              {[...Array(testimonials[idx].rating)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current text-primary sm:h-4 sm:w-4" />
              ))}
            </div>
            <p className="mb-5 text-sm italic leading-relaxed text-foreground sm:mb-6 sm:text-base lg:text-lg">"{testimonials[idx].text}"</p>
            <p className="text-xs font-semibold text-foreground sm:text-sm">{testimonials[idx].name}</p>
            <p className="text-xs text-muted-foreground">Verified Buyer</p>
          </motion.div>

          <div className="mt-5 flex justify-center gap-3 sm:mt-6 sm:gap-4">
            <button
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-2 w-2 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
