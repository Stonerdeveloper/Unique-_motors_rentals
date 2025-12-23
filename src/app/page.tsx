import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import HowItWorks from "@/components/home/HowItWorks";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unique Motors | Premium Car Rental Lagos, Abuja & PH",
  description: "Experience premium mobility with Unique Motors. Luxury SUVs, Sedans, and Buses available for self-drive or with professional chauffeurs in Lagos, Abuja, and Port Harcourt.",
  keywords: ["car rental lagos", "rent a car abuja", "car hire nigeria", "luxury car rental lagos", "chauffeur driven cars nigeria"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <HowItWorks />

      {/* Trust Signals / Corporate Partners */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted mb-8">Trusted by clients in</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
            <span className="text-xl font-bold italic">LAGOS</span>
            <span className="text-xl font-bold italic">ABUJA</span>
            <span className="text-xl font-bold italic">PH CITY</span>
            <span className="text-xl font-bold italic">ENUGU</span>
            <span className="text-xl font-bold italic">KANO</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-lg font-bold tracking-tighter uppercase italic">
              UNIQUE<span className="text-accent">MOTORS</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted">
              <a href="#" className="hover:text-accent transition-colors">Terms</a>
              <a href="#" className="hover:text-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-accent transition-colors">Fleet</a>
              <a href="#" className="hover:text-accent transition-colors">Admin</a>
            </div>
            <p className="text-xs text-muted">© 2025 Unique Motors. Premium Mobility Solutions.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
}
