import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import coupleImage from "@/assets/optimized/couple.jpg";

const EmailCapture = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Welcome to HydraShield!", description: "You'll receive 10% off your first order." });
      setEmail("");
    }
  };

  return (
    <section className="bg-card py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-card sm:rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="p-5 sm:p-8 lg:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">Join the list</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:mt-3 sm:text-3xl">
              Get 10% off your first HydraShield order
            </h2>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              Join customers who want early access to restock reminders, skincare tips, and special bundle offers.
              Unsubscribe anytime.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-background"
                required
              />
              <Button
                type="submit"
                className="gradient-rose whitespace-nowrap px-6 text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-sm sm:normal-case sm:tracking-normal"
              >
                Subscribe
              </Button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-muted-foreground sm:mt-6 sm:gap-3 sm:text-xs">
              <span className="rounded-full border border-border px-3 py-1.5">10% first-order savings</span>
              <span className="rounded-full border border-border px-3 py-1.5">Restock reminders</span>
              <span className="rounded-full border border-border px-3 py-1.5">Bundle announcements</span>
            </div>
          </div>

          <div className="min-h-[240px] border-t border-border sm:min-h-[320px] lg:min-h-full lg:border-l lg:border-t-0">
            <img
              src={coupleImage}
              alt="Couple applying HydraShield moisturizer together"
              width={1200}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailCapture;
