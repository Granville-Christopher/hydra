import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const visibleRoutes = new Set(["/", "/about", "/faq"]);

const MobileStickyCTA = () => {
  const { pathname } = useLocation();

  if (!visibleRoutes.has(pathname)) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto max-w-md">
        <Link to="/product" className="block">
          <Button className="gradient-rose flex h-11 w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90">
            Shop HydraShield
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
