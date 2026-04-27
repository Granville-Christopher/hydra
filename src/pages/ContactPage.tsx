import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 sm:space-y-12">
          <div className="text-center">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              Get in Touch
            </p>
            <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">Contact Us</h1>
          </div>

          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground sm:text-sm">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-background"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground sm:text-sm">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-background"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground sm:text-sm">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={5}
                  className="bg-background"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full gradient-rose text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 sm:text-sm sm:normal-case sm:tracking-normal"
              >
                Send Message
              </Button>
            </form>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="mb-4 font-heading text-base font-semibold text-foreground sm:text-lg">Information</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-xs font-medium text-foreground sm:text-sm">Email</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">hello@hydrashield.com</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-xs font-medium text-foreground sm:text-sm">Location</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">Los Angeles, California</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-6">
                <h4 className="font-heading text-base font-semibold text-foreground">Policies</h4>
                <div className="space-y-2 text-xs text-muted-foreground sm:text-sm">
                  <p>
                    <span className="font-medium text-foreground">Shipping:</span> Free standard shipping on all US
                    orders. Delivered in 3-5 business days.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Returns:</span> 30-day hassle-free returns. Even on
                    opened products.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Privacy:</span> We never sell your data. See our full
                    privacy policy for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;
