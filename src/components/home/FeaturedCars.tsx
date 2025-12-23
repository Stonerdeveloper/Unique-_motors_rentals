import { supabase } from "@/lib/supabase";
import CarCard from "./CarCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function FeaturedCars() {
    // Fetch on the server
    const { data: cars, error } = await supabase
        .from("cars")
        .select("*")
        .limit(3);

    const hasCars = cars && cars.length > 0;

    return (
        <section className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Vehicles</h2>
                        <p className="text-muted max-w-lg">Hand-picked premium vehicles for your business and personal needs in Nigeria.</p>
                    </div>
                    <Link href="/cars" className="hidden md:flex items-center gap-2 font-bold hover:text-accent transition-colors">
                        <span>View All Fleet</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                {!hasCars ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[400px] bg-muted animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <CarCard key={car.id} {...car} />
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Link href="/cars" className="inline-flex items-center gap-2 font-bold hover:text-accent transition-colors">
                        <span>View All Fleet</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
