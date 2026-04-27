import { motion } from "framer-motion";
import { Stethoscope, Leaf, Truck, FlaskConical } from "lucide-react";

const badges = [
  { icon: Stethoscope, label: "Dermatologist Recommended" },
  { icon: Leaf, label: "Cruelty-Free & Vegan" },
  { icon: Truck, label: "Free US Shipping" },
  { icon: FlaskConical, label: "Fragrance-Free" },
];

const TrustBadges = () => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border p-4 text-center sm:gap-3 sm:p-6"
          >
            <b.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <span className="text-[11px] font-medium text-foreground sm:text-xs">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
