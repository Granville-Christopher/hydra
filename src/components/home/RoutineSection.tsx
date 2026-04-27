import { motion } from "framer-motion";
import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import routineImage from "@/assets/optimized/man.jpg";

const steps = [
  {
    icon: SunMedium,
    title: "Morning",
    description: "Apply after cleansing for hydration that sits comfortably under SPF, makeup, or your daily beard care routine.",
  },
  {
    icon: Sparkles,
    title: "Anytime reset",
    description: "Use when skin feels tight, weather-stressed, or depleted and you want quick comfort without a heavy finish.",
  },
  {
    icon: MoonStar,
    title: "Night",
    description: "Finish your evening routine with a generous layer to support overnight moisture and softer-feeling skin by morning.",
  },
];

const RoutineSection = () => (
  <section className="bg-card py-16 sm:py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">How to use</p>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              An easy routine people actually stick with
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              HydraShield fits naturally into busy mornings and simple night routines, making daily barrier care feel easy and consistent.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-3 rounded-2xl border border-border bg-background p-4 shadow-card sm:gap-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-rose sm:h-12 sm:w-12">
                  <step.icon className="h-4 w-4 text-primary-foreground sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Step {index + 1}</p>
                  <h3 className="mt-1 font-heading text-base font-semibold text-foreground sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] border border-border bg-background shadow-elevated"
        >
          <img
            src={routineImage}
            alt="Man applying HydraShield moisturizer to his face"
            width={1200}
            height={1400}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default RoutineSection;
