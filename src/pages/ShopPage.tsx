import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const ShopPage = () => {
  const { addProductItem } = useCart();
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/shop/products`);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load shop products.");
        }
        setProducts(payload.data ?? []);
      } catch (error) {
        toast({
          title: "Shop unavailable",
          description: error instanceof Error ? error.message : "Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm">
            HydraShield Shop
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Products
          </h1>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">Loading products...</CardContent>
          </Card>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              No shop product is selected yet. Choose one in the admin dashboard.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const price = Number(product.retailPrice || product.productCost || 0);
              return (
                <Card key={product._id} className="overflow-hidden shadow-card">
                  <div className="aspect-square bg-card">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {(product.variantName || product.variantColor) && (
                      <p className="text-xs text-muted-foreground">
                        {[product.variantName, product.variantColor].filter(Boolean).join(" / ")}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {product.description || "Imported CJ product ready for your storefront."}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-heading text-xl font-semibold text-foreground">
                        {formatMoney(price)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(product.inventory ?? 0)} in stock
                      </p>
                    </div>
                    <Button
                      className="w-full gradient-rose text-primary-foreground"
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
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
