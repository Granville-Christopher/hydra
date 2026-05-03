import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const formatMoney = (value: number) => `₦${value.toLocaleString()}`;

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="space-y-4 px-4 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">Your Cart is Empty</h1>
          <p className="text-sm text-muted-foreground">Add some products to get started.</p>
          <Link to="/shop">
            <Button className="gradient-rose text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-sm sm:normal-case sm:tracking-normal">
              Shop
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:mb-8 sm:text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Continue Shopping
        </Link>

        <h1 className="mb-6 font-heading text-2xl font-semibold text-foreground sm:mb-8 sm:text-3xl">Your Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:p-6"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="mt-1 text-xs font-semibold text-primary sm:text-sm">₦{item.price.toLocaleString()} each</p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-between">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <p className="font-heading text-base font-semibold text-foreground sm:text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex justify-between text-xs text-muted-foreground sm:text-sm">
            <span>Subtotal</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground sm:text-sm">
            <span>Shipping</span>
            <span className="font-medium text-primary">Free</span>
          </div>
          <div className="flex justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold text-foreground sm:text-base">Total</span>
            <span className="font-heading text-lg font-semibold text-foreground sm:text-xl">₦{totalPrice.toLocaleString()}</span>
          </div>
          <Button
            className="w-full gradient-rose text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-sm sm:normal-case sm:tracking-wide"
            size="lg"
          >
            Proceed to Checkout
          </Button>
          <p className="text-center text-xs text-muted-foreground">Secure checkout powered by Paystack</p>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
