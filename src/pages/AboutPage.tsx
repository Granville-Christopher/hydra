import { motion } from "framer-motion";
import storyImage from "@/assets/optimized/couple.jpg";

const AboutPage = () => (
  <main className="pt-20 pb-24 sm:pt-24 sm:pb-20">
    <div className="container mx-auto max-w-4xl px-4 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 sm:space-y-12">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
            Our Story
          </p>
          <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            Built on Science, Made for Everyone
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-elevated">
          <img
            src={storyImage}
            alt="Couple applying HydraShield moisturizer together"
            width={1200}
            height={900}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose-sm mx-auto max-w-2xl space-y-5 sm:space-y-6">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            HydraShield started with a simple frustration: the skincare aisle was overwhelming. Too many products,
            confusing claims, and inflated routines for something as basic as keeping your skin comfortable and hydrated.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            We built HydraShield around one versatile moisturizer that works across skin types, genders, and everyday
            routines. The formula focuses on three proven essentials: ceramides to support the skin barrier,
            hyaluronic acid for deep hydration, and niacinamide to help calm and visibly balance the complexion.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            No added fragrance. No unnecessary filler steps. No overcomplicated positioning. Just effective skincare
            that couples, roommates, and families can share from one jar on the counter. That is the HydraShield philosophy.
          </p>

          <div className="grid gap-3 pt-4 min-[420px]:grid-cols-3 sm:gap-6 sm:pt-6">
            {[
              { stat: "50,000+", label: "Happy Customers" },
              { stat: "4.9/5", label: "Average Rating" },
              { stat: "100%", label: "Cruelty-Free" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="font-heading text-lg font-semibold text-primary sm:text-xl">{stat.stat}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </main>
);

export default AboutPage;
