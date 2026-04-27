import { motion } from "framer-motion";
import ingredientsVisual from "@/assets/optimized/ingredients.jpg";

const ingredients = [
  { name: "Ceramides", pct: "3%", desc: "Help replenish the moisture barrier and reduce the look of dryness over time." },
  { name: "Hyaluronic Acid", pct: "2%", desc: "Supports lasting hydration so skin looks plumper and feels less tight." },
  { name: "Niacinamide", pct: "5%", desc: "Helps visibly calm uneven tone while supporting a smoother overall look." },
  { name: "Squalane", pct: "1%", desc: "Adds cushion and comfort without leaving behind a heavy, greasy finish." },
];

const IngredientsSection = () => (
  <section className="py-16 sm:py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
            <img
              src={ingredientsVisual}
              alt="HydraShield ingredients arranged to highlight the formula"
              width={1000}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">The Formula</p>
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">Science-Backed Ingredients</h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              Every jar centers on a focused ingredient lineup so customers know exactly what they are putting
              on their skin and why it is there.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-5">
            {ingredients.map((ingredient) => (
              <div key={ingredient.name} className="flex gap-3 rounded-xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
                <span className="min-w-[34px] text-xs font-semibold text-primary sm:min-w-[40px] sm:text-sm">{ingredient.pct}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground sm:text-sm">{ingredient.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{ingredient.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 min-[420px]:grid-cols-3">
            {["No added fragrance", "Comfortable under SPF", "Made for daily AM and PM use"].map((item) => (
              <div key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-xs text-muted-foreground sm:text-sm">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default IngredientsSection;
