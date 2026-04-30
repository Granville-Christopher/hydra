import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import productJar from "@/assets/optimized/product-jar.png";
import creamImage from "@/assets/optimized/cream.jpg";
import bundleImage from "@/assets/optimized/bundle.png";

const showcaseItems = [
  {
    title: "The daily jar",
    description: "A daily moisturizer for face and neck that helps keep skin soft, balanced, and comfortably hydrated.",
    label: "50 ml daily essential",
    image: productJar,
    alt: "HydraShield product jar",
  },
  {
    title: "Rich look, comfortable feel",
    description: "The formula looks indulgent while still settling into skin with a clean, wearable finish for day or night.",
    label: "Comfort without heaviness",
    image: creamImage,
    alt: "HydraShield cream displayed on a table",
  },
  {
    title: "Better together",
    description: "Perfect for shared bathrooms, gifting, or keeping a second jar ready at home so your routine never misses a day.",
    label: "Made to share",
    image: bundleImage,
    alt: "Two HydraShield jars placed side by side",
  },
];

const ProductShowcaseSection = () => (
  <section className="py-16 sm:py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">HydraShield essentials</p>
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            Everything your skin needs, in one simple routine
          </h2>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
            Explore the daily jar, the rich cream texture, and the shareable duo that makes HydraShield easy to keep on hand.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-medium text-foreground transition-colors hover:text-primary sm:text-sm"
        >
          Shop all products
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {showcaseItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card sm:rounded-[2rem]"
          >
            <div className="aspect-[4/3] overflow-hidden border-b border-border bg-background">
              <img
                src={item.image}
                alt={item.alt}
                width={900}
                height={700}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">{item.label}</p>
              <h3 className="mt-2 font-heading text-xl font-semibold text-foreground sm:mt-3 sm:text-2xl">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProductShowcaseSection;
