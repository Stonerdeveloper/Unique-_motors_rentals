"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    ExternalLink,
    MapPin,
    ShieldCheck,
    Tag
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminCarsPage() {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCars();
    }, []);

    async function fetchCars() {
        setLoading(true);
        const { data, error } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
        if (!error && data) setCars(data);
        setLoading(false);
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            const { error } = await supabase.from("cars").delete().eq("id", id);
            if (!error) fetchCars();
        }
    };

    const filteredCars = cars.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Fleet Inventory</h1>
                    <p className="text-muted text-sm">Manage your vehicles, pricing, and availability here.</p>
                </div>
                <Link
                    href="/admin/cars/new"
                    className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                >
                    <Plus size={18} />
                    <span>Add New Vehicle</span>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 border border-zinc-200 rounded-3xl shadow-sm">
                <Search size={20} className="text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search by name, brand or type..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-64 bg-zinc-100 animate-pulse rounded-3xl" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <div key={car.id} className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                            <div className="relative h-40 w-full overflow-hidden bg-zinc-50">
                                <Image
                                    src={car.image_url || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"}
                                    alt={car.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Link href={`/admin/cars/edit/${car.id}`} className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white text-zinc-600">
                                        <Edit2 size={16} />
                                    </Link>
                                    <button onClick={() => handleDelete(car.id)} className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-red-50 text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">{car.brand} {car.name}</h3>
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
                                            <Tag size={10} />
                                            <span>{car.type}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold">₦{car.price_per_day.toLocaleString()}</div>
                                        <span className="text-[10px] uppercase font-bold text-zinc-400">Daily Rate</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                                        <MapPin size={12} className="text-amber-500" />
                                        <span>{car.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                                        <ShieldCheck size={12} className="text-amber-500" />
                                        <span>{car.with_driver ? "With Driver" : "Self-drive"}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/cars/${car.id}`}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-3 border border-zinc-200 rounded-2xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    <span>View Public Page</span>
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredCars.length === 0 && (
                        <div className="col-span-full py-24 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
                            <p className="text-zinc-400 font-medium italic">No vehicles found matching your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
