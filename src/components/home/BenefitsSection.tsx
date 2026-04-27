import { motion } from "framer-motion";
import { Droplets, Heart, Shield } from "lucide-react";

const benefits = [
  {
    icon: Droplets,
    title: "Deep Hydration",
    desc: "Hyaluronic acid helps pull moisture into the skin so your face feels softer, smoother, and comfortably hydrated all day.",
  },
  {
    icon: Shield,
    title: "Barrier Repair",
    desc: "Ceramides help reinforce your moisture barrier so skin feels less tight, less stressed, and more resilient to daily dryness.",
  },
  {
    icon: Heart,
    title: "Gentle and Soothing",
    desc: "Niacinamide supports a calmer-looking complexion in a fragrance-free formula that fits sensitive and everyday skin routines.",
  },
];

const BenefitsSection = () => (
  <section className="bg-card py-16 sm:py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center sm:mb-14"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">Why HydraShield</p>
        <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
          The three reasons customers keep coming back
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
          HydraShield brings moisture, barrier support, and everyday comfort into one clean routine so your
          shelf stays simple and your skin stays supported.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="rounded-2xl border border-border bg-background p-5 text-center shadow-card sm:p-6 lg:p-8"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full gradient-rose sm:mb-5 sm:h-14 sm:w-14">
              <benefit.icon className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
            </div>
            <h3 className="mb-2 font-heading text-base font-semibold text-foreground sm:mb-3 sm:text-lg">{benefit.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
