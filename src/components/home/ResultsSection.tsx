import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import resultsImage from "@/assets/optimized/results.jpg";

const results = [
  "Supports skin that looks smoother and less depleted",
  "Helps soften the feel of dry patches and post-cleanse tightness",
  "Creates a healthy-looking finish without turning your routine into a long process",
];

const stats = [
  { value: "72 hrs", label: "hydration support" },
  { value: "3 core actives", label: "ceramides, HA, niacinamide" },
  { value: "AM + PM", label: "easy daily use" },
];

const ResultsSection = () => (
  <section className="py-16 sm:py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated"
        >
          <img
            src={resultsImage}
            alt="Comparison image showing dry damaged skin and hydrated glowing skin"
            width={1200}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">Real results</p>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              From stressed-looking skin to a healthier glow
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              HydraShield is made to bring lasting hydration, daily comfort, and a smoother, healthier-looking finish to skin that feels dry or depleted.
            </p>
          </div>

          <div className="grid gap-3 min-[420px]:grid-cols-3 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:px-5 sm:py-4">
                <p className="font-heading text-xl font-semibold text-foreground sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 sm:space-y-4">
            {results.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:py-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ResultsSection;
