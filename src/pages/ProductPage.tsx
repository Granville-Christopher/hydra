import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import productJar from "@/assets/optimized/product-jar.png";
import productTexture from "@/assets/optimized/cream.jpg";
import productSerum from "@/assets/optimized/serum.png";
import productBundle from "@/assets/optimized/bundle.png";

const images = [productJar, productTexture, productSerum, productBundle];

const ProductPage = () => {
  const { addItem } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [variant, setVariant] = useState<"single" | "bundle">("single");

  const handleAdd = () => {
    addItem(variant);
    toast({ title: "Added to cart!", description: variant === "single" ? "1 jar - $28" : "2-pack bundle - $52" });
  };

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-card shadow-elevated">
              <img src={images[selectedImg]} alt="HydraShield Moisturizer" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImg(i)}
                  className={`h-16 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 ${i === selectedImg ? "border-primary" : "border-border"}`}
                >
                  <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
                HydraShield
              </p>
              <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
                Hydrating Barrier Repair Moisturizer
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-0.5 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">4.9 (2,400+ reviews)</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              A rich yet lightweight moisturizer that helps support your skin barrier with ceramides, deeply hydrates
              with hyaluronic acid, and comforts skin with niacinamide. Fragrance-free, unisex, and designed to fit
              dry, balanced, and combination routines.
            </p>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground sm:text-sm sm:normal-case sm:tracking-normal">
                Select Option
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setVariant("single")}
                  className={`w-full rounded-xl border-2 p-3 text-left transition-colors sm:p-4 ${variant === "single" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground sm:text-sm">Single Jar</p>
                      <p className="text-xs text-muted-foreground">50ml / 1.7 fl oz</p>
                    </div>
                    <p className="font-heading text-base font-semibold text-foreground sm:text-lg">$28</p>
                  </div>
                </button>
                <button
                  onClick={() => setVariant("bundle")}
                  className={`relative w-full rounded-xl border-2 p-3 text-left transition-colors sm:p-4 ${variant === "bundle" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <span className="absolute -top-2 right-4 rounded-full gradient-rose px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    SAVE $4
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground sm:text-sm">Bundle - 2 Jars</p>
                      <p className="text-xs text-muted-foreground">Share with your partner</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-base font-semibold text-foreground sm:text-lg">$52</p>
                      <p className="text-xs text-muted-foreground line-through">$56</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              size="lg"
              className="w-full gradient-rose text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-sm sm:normal-case sm:tracking-wide"
            >
              Add to Cart - ${variant === "single" ? 28 : 52}
            </Button>

            <div className="grid gap-3 pt-4 min-[420px]:grid-cols-3 sm:gap-4">
              {["Free Shipping", "30-Day Returns", "Dermatologist Tested"].map((badge) => (
                <div key={badge} className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs font-medium text-muted-foreground">{badge}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">How to Use</h3>
              <ol className="list-inside list-decimal space-y-2 text-xs text-muted-foreground sm:text-sm">
                <li>Cleanse your face with a gentle cleanser</li>
                <li>Apply a dime-sized amount to fingertips</li>
                <li>Gently press and pat into face and neck</li>
                <li>Use morning and night for best results</li>
              </ol>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">Key Ingredients</h3>
              <div className="grid gap-3 min-[420px]:grid-cols-3">
                {[
                  { name: "Ceramides", pct: "3%" },
                  { name: "Hyaluronic Acid", pct: "2%" },
                  { name: "Niacinamide", pct: "5%" },
                ].map((ingredient) => (
                  <div key={ingredient.name} className="rounded-lg border border-border bg-card p-3 text-center">
                    <p className="font-heading text-base font-semibold text-primary sm:text-lg">{ingredient.pct}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{ingredient.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
