import { Link } from "react-router-dom";
import logoIcon from "@/assets/optimized/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-10 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <img src={logoIcon} alt="HydraShield" width={160} height={48} className="h-6 w-auto object-contain sm:h-7" />
            <span className="font-heading text-base font-semibold text-foreground sm:text-lg">HydraShield</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
            One cream for everyone. Clinically formulated with ceramides, hyaluronic acid, and niacinamide for stronger, healthier skin.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground sm:mb-4 sm:text-sm sm:normal-case sm:tracking-normal">Shop</h4>
          <div className="space-y-2">
            <Link to="/shop" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Shop
            </Link>
            <Link to="/single-product" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Product Single Page
            </Link>
            <Link to="/about" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Our Story
            </Link>
            <Link to="/faq" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              FAQ
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-foreground sm:mb-4 sm:text-sm sm:normal-case sm:tracking-normal">Support</h4>
          <div className="space-y-2">
            <Link to="/contact" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Contact
            </Link>
            <Link to="/contact" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Shipping Policy
            </Link>
            <Link to="/contact" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Returns
            </Link>
            <Link to="/contact" className="block text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center">
        <p className="text-xs text-muted-foreground">Copyright 2026 HydraShield. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
