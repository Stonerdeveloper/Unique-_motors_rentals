"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CarCard from "@/components/home/CarCard";
import { Search, SlidersHorizontal, MapPin, ShieldCheck, Tag } from "lucide-react";

export default function CarsListingClient() {
    const [cars, setCars] = useState<any[]>([]);
    const [filteredCars, setFilteredCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [location, setLocation] = useState("All");
    const [type, setType] = useState("All");
    const [withDriver, setWithDriver] = useState<boolean | string>("All");
    const [maxPrice, setMaxPrice] = useState(100000);

    useEffect(() => {
        async function fetchCars() {
            const { data, error } = await supabase.from("cars").select("*");
            if (!error && data) {
                setCars(data);
                setFilteredCars(data);
            }
            setLoading(false);
        }
        fetchCars();
    }, []);

    useEffect(() => {
        let result = cars;
        if (location !== "All") result = result.filter(c => c.location === location);
        if (type !== "All") result = result.filter(c => c.type === type);
        if (withDriver !== "All") result = result.filter(c => c.with_driver === (withDriver === "true"));
        result = result.filter(c => c.price_per_day <= maxPrice);
        setFilteredCars(result);
    }, [location, type, withDriver, maxPrice, cars]);

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 space-y-8 shrink-0">
                <div className="p-6 border border-border rounded-3xl bg-background/50 backdrop-blur-sm lg:sticky lg:top-24">
                    <div className="flex items-center gap-2 mb-6 font-bold uppercase text-xs tracking-widest text-muted">
                        <SlidersHorizontal size={14} />
                        <span>Filters</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-muted mb-3 flex items-center gap-1 text-nowrap">
                                <MapPin size={12} /> Location
                            </label>
                            <select
                                className="w-full bg-muted/50 border-none rounded-xl text-sm p-3 outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option>All</option>
                                <option>Lagos</option>
                                <option>Abuja</option>
                                <option>Port Harcourt</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-muted mb-3 flex items-center gap-1 text-nowrap">
                                <Tag size={12} /> Vehicle Type
                            </label>
                            <select
                                className="w-full bg-muted/50 border-none rounded-xl text-sm p-3 outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option>All</option>
                                <option>Sedan</option>
                                <option>SUV</option>
                                <option>Bus</option>
                                <option>Luxury</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-muted mb-3 flex items-center gap-1 text-nowrap">
                                <ShieldCheck size={12} /> Driver Option
                            </label>
                            <select
                                className="w-full bg-muted/50 border-none rounded-xl text-sm p-3 outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
                                value={withDriver.toString()}
                                onChange={(e) => setWithDriver(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="true">With Driver</option>
                                <option value="false">Self-drive</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-muted mb-3 flex justify-between">
                                <span className="text-nowrap">Max Price (Daily)</span>
                                <span className="text-foreground">₦{maxPrice.toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min="5000"
                                max="200000"
                                step="5000"
                                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            />
                            <div className="flex justify-between text-[10px] text-muted mt-2 font-bold uppercase tracking-tighter">
                                <span>5k</span>
                                <span>200k+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-96 bg-muted animate-pulse rounded-3xl" />)}
                    </div>
                ) : filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCars.map(car => <CarCard key={car.id} {...car} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
                            <Search size={32} className="text-muted" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No cars found</h3>
                        <p className="text-muted">Try adjusting your filters or search criteria.</p>
                        <button
                            onClick={() => { setLocation("All"); setType("All"); setWithDriver("All"); setMaxPrice(200000); }}
                            className="mt-6 text-accent font-bold hover:underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
