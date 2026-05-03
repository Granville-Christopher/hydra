import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";
const PRODUCTS_PER_PAGE = 20;

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

const formatMoney = (value: number) => `₦${value.toLocaleString()}`;

const ShopPage = () => {
  const { addProductItem } = useCart();
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/shop/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message ?? "Unable to load shop products.");
        }
        setProducts(payload.data ?? []);
        setTotalPages(payload.meta?.totalPages ?? 1);
        setTotalProducts(payload.meta?.total ?? 0);
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
  }, [page]);

  const goToPage = (nextPage: number) => {
    const boundedPage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(boundedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {!loading && totalProducts > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing page {page} of {totalPages} with up to {PRODUCTS_PER_PAGE} products per page.
            </p>
          )}
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
          <div className="space-y-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const price = Number(product.retailPrice || product.productCost || 0);
                return (
                  <Card key={product._id} className="flex h-full flex-col overflow-hidden shadow-card">
                    <Link to={`/product/${product._id}`} className="block aspect-square bg-card">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          No image
                        </div>
                      )}
                    </Link>
                    <CardHeader>
                      <Link to={`/product/${product._id}`} className="transition-colors hover:text-primary">
                        <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
                      </Link>
                      {(product.variantName || product.variantColor) && (
                        <p className="text-xs text-muted-foreground">
                          {[product.variantName, product.variantColor].filter(Boolean).join(" / ")}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col space-y-4">
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {product.description || "Imported CJ product ready for your storefront."}
                      </p>
                      <div className="mt-auto space-y-4 pt-2">
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
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-disabled={page === 1}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem className="px-3 text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      aria-disabled={page === totalPages}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
