import Navbar from "@/components/layout/Navbar";
import CarsListingClient from "@/components/cars/CarsListingClient";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const metadata = {
    title: "Available Cars - Unique Motors",
    description: "Browse our premium fleet at Unique Motors. Vehicles available in Lagos, Abuja, and Port Harcourt. Filter by car type, price, and driver options.",
};

export default function CarsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <div className="pt-24 pb-12 bg-muted/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Our Fleet</h1>
                    <p className="text-muted">Premium vehicles available across major Nigerian cities.</p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <CarsListingClient />
            </div>

            <WhatsAppButton />
        </main>
    );
}
