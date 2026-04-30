import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type ShopProduct = {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  retailPrice?: number;
  productCost?: number;
  inventory?: number;
  variantName?: string;
  variantColor?: string;
  supplierName?: string;
  warehouse?: string;
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const ProductPage = () => {
  const { productId } = useParams();
  const { addProductItem } = useCart();
  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/shop/products/${productId}`);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load this product.");
        }
        setProduct(payload.data ?? null);
      } catch (error) {
        toast({
          title: "Product unavailable",
          description: error instanceof Error ? error.message : "Please choose another product.",
        });
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">Loading product...</CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card>
            <CardContent className="space-y-4 p-6">
              <p className="text-sm text-muted-foreground">This product is not available in the shop.</p>
              <Button asChild variant="outline">
                <Link to="/shop">Back to shop</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const price = Number(product.retailPrice || product.productCost || 0);
  const variantDetails = [product.variantName, product.variantColor].filter(Boolean).join(" / ");

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 px-0 text-muted-foreground hover:text-foreground">
          <Link to="/shop">
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>
        </Button>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="aspect-square overflow-hidden rounded-2xl bg-card shadow-elevated">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image
                </div>
              )}
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
                HydraShield Shop
              </p>
              <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-0.5 text-primary">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Shop-selected product</span>
              </div>
            </div>

            {variantDetails && (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-primary">Variant</p>
                <p className="mt-1 text-sm font-medium text-foreground">{variantDetails}</p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description || "Imported CJ product ready for your storefront."}
            </p>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Price</p>
                  <p className="mt-1 font-heading text-3xl font-semibold text-foreground">{formatMoney(price)}</p>
                </div>
                <p className="text-sm text-muted-foreground">{Number(product.inventory ?? 0)} in stock</p>
              </div>
              <Button
                size="lg"
                className="mt-5 w-full gradient-rose text-primary-foreground"
                onClick={() =>
                  addProductItem({
                    id: product._id,
                    name: product.name,
                    price,
                    imageUrl: product.imageUrl,
                  })
                }
              >
                <ShoppingBag className="h-4 w-4" />
                Add to cart
              </Button>
            </div>

            <div className="grid gap-3 pt-2 min-[420px]:grid-cols-3 sm:gap-4">
              {["Secure Checkout", "Tracked Shipping", "Shop Support"].map((badge) => (
                <div key={badge} className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs font-medium text-muted-foreground">{badge}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
