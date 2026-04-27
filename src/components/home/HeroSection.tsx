import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLifestyle from "@/assets/optimized/hero-woman.jpg";
import heroJar from "@/assets/optimized/product-jar.png";

const proofPoints = [
  "Barrier support for dry, stressed, and combination skin",
  "Lightweight comfort that fits morning and night routines",
  "Simple enough to share across your household",
];

const HeroSection = () => (
  <section className="flex items-center pt-20 pb-24 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 sm:space-y-6"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">Barrier Repair Skincare</p>
          <h1 className="font-heading text-3xl font-semibold leading-[1.08] text-balance text-foreground min-[380px]:text-[2.4rem] sm:text-5xl lg:text-6xl">
            The everyday moisturizer for <span className="text-primary italic">calmer, stronger, hydrated</span> skin.
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
            HydraShield helps repair the look of a compromised barrier with ceramides, hyaluronic acid,
            and niacinamide in one fragrance-free cream designed for real daily use.
          </p>

          <div className="grid gap-3 sm:grid-cols-3 sm:max-w-2xl">
            {proofPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-border bg-card px-3 py-3 shadow-card sm:px-4">
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{point}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4">
            <Link to="/product" className="w-full min-[430px]:w-auto">
              <Button size="lg" className="gradient-rose w-full px-6 text-xs tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90 sm:px-8 sm:text-sm sm:tracking-wide">
                Shop Now - $28
              </Button>
            </Link>
            <Link to="/about" className="w-full min-[430px]:w-auto">
              <Button size="lg" variant="outline" className="w-full border-border px-6 text-xs tracking-[0.16em] text-foreground transition-colors hover:bg-card sm:px-8 sm:text-sm sm:tracking-wide">
                Our Story
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-3 sm:gap-6 sm:pt-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground sm:text-xs">4.9/5 with 2,400+ verified reviews</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
              <Droplets className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
              <span>72-hour hydration support</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
              <span>Fragrance-free and dermatologist tested</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
            <img
              src={heroLifestyle}
              alt="Woman applying HydraShield moisturizer as part of her skincare routine"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-16 left-3 right-3 rounded-2xl border border-border bg-background/95 p-3 shadow-card backdrop-blur sm:-bottom-6 sm:left-6 sm:right-auto sm:w-[250px] sm:p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-primary sm:text-xs">Customer favorite</p>
            <p className="mt-1.5 font-heading text-base font-semibold text-foreground sm:mt-2 sm:text-lg">The daily barrier jar</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              A single step moisturizer built for soft, balanced skin without a complicated routine.
            </p>
          </div>

          <div className="absolute right-2 top-3 w-24 rounded-2xl border border-border bg-background p-2 shadow-card min-[380px]:right-3 min-[380px]:top-4 min-[380px]:w-28 sm:-right-3 sm:top-6 sm:w-40 sm:p-3">
            <img
              src={heroJar}
              alt="HydraShield product jar"
              width={420}
              height={420}
              className="h-14 w-full object-contain min-[380px]:h-16 sm:h-28"
            />
            <p className="mt-1 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground min-[380px]:text-[10px] sm:mt-2 sm:text-xs sm:tracking-[0.16em]">
              Barrier repair
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
