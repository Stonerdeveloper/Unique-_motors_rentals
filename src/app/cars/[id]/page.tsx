import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { cache } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Users, Fuel, ShieldCheck, MapPin, ChevronLeft, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import BookingForm from "@/components/cars/BookingForm";
import WhatsAppButton from "@/components/common/WhatsAppButton";
const getCar = cache(async (id: string) => {
    const { data: car } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();
    return car;
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const car = await getCar(id);
    if (!car) return { title: "Car Not Found" };
    return {
        title: `${car.brand} ${car.name} - Unique Motors`,
        description: `Rent this premium ${car.type} in ${car.location}. Standard-leading quality and reliability by Unique Motors.`,
    };
}

export async function generateStaticParams() {
    const { data: cars } = await supabase.from("cars").select("id");
    if (!cars) return [];
    return cars.map((car) => ({
        id: car.id,
    }));
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const car = await getCar(id);

    if (!car) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <Link href="/cars" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8">
                    <ChevronLeft size={16} />
                    <span>Back to fleet</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Images & Info */}
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted group">
                            <Image
                                src={car.image_url || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"}
                                alt={car.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-background/80 backdrop-blur-md text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
                                    {car.type}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl border border-border bg-muted/20 text-center">
                                <Users size={20} className="mx-auto text-accent mb-2" />
                                <span className="block text-xs text-muted uppercase font-bold tracking-tight">Seats</span>
                                <span className="text-sm font-bold">4 People</span>
                            </div>
                            <div className="p-4 rounded-2xl border border-border bg-muted/20 text-center">
                                <Fuel size={20} className="mx-auto text-accent mb-2" />
                                <span className="block text-xs text-muted uppercase font-bold tracking-tight">Fuel</span>
                                <span className="text-sm font-bold">Petrol</span>
                            </div>
                            <div className="p-4 rounded-2xl border border-border bg-muted/20 text-center">
                                <ShieldCheck size={20} className="mx-auto text-accent mb-2" />
                                <span className="block text-xs text-muted uppercase font-bold tracking-tight">Service</span>
                                <span className="text-sm font-bold">{car.with_driver ? "With Driver" : "Self-drive"}</span>
                            </div>
                            <div className="p-4 rounded-2xl border border-border bg-muted/20 text-center">
                                <MapPin size={20} className="mx-auto text-accent mb-2" />
                                <span className="block text-xs text-muted uppercase font-bold tracking-tight">City</span>
                                <span className="text-sm font-bold">{car.location}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">About this vehicle</h2>
                            <p className="text-muted leading-relaxed">
                                This {car.brand} {car.name} is one of our most popular {car.type.toLowerCase()}s in {car.location}.
                                Perfect for corporate travel, wedding events, or a smooth ride through the city.
                                Our fleet is well-maintained and comes with comprehensive insurance coverage.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={18} className="text-green-500" />
                                    <span>Comprehensive Insurance</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={18} className="text-green-500" />
                                    <span>24/7 Roadside Assistance</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 size={18} className="text-green-500" />
                                    <span>Professional Chauffeur (Optional)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:border-l border-border lg:pl-12">
                        <div className="sticky top-24">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <span className="text-sm font-medium text-muted uppercase tracking-widest">{car.brand}</span>
                                    <h1 className="text-4xl font-bold tracking-tight">{car.name}</h1>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-accent mb-1">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm font-bold">4.9</span>
                                        <span className="text-xs text-muted font-medium">(24 reviews)</span>
                                    </div>
                                    <div className="text-2xl font-bold">₦{car.price_per_day.toLocaleString()}</div>
                                    <span className="text-xs text-muted uppercase tracking-widest font-bold">Per Day</span>
                                </div>
                            </div>

                            <BookingForm car={car} />

                            <div className="mt-8 p-6 rounded-3xl bg-accent/5 border border-accent/10">
                                <h4 className="font-bold text-sm mb-2">Need a custom quote?</h4>
                                <p className="text-xs text-muted mb-4 leading-relaxed">For long-term rentals (1 month+) or event fleets, chat with our concierge.</p>
                                <a href="https://wa.me/2348000000000" className="text-accent text-sm font-bold hover:underline">Contact Concierge →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WhatsAppButton />
        </main>
    );
}
