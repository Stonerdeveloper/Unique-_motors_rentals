import Image from "next/image";
import { Users, Fuel, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

interface CarCardProps {
    id: string;
    name: string;
    brand: string;
    type: string;
    price_per_day: number;
    with_driver: boolean;
    location: string;
    image_url?: string;
}

export default function CarCard({ id, name, brand, type, price_per_day, with_driver, location, image_url }: CarCardProps) {
    return (
        <div className="group bg-background border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                    src={image_url || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {type}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-xs font-medium text-muted uppercase tracking-wider">{brand}</span>
                        <h3 className="text-xl font-bold">{name}</h3>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-muted">Daily</span>
                        <div className="text-lg font-bold">₦{price_per_day.toLocaleString()}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <Users size={14} className="text-accent" />
                        <span>4 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <Fuel size={14} className="text-accent" />
                        <span>Petrol</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <ShieldCheck size={14} className="text-accent" />
                        <span>{with_driver ? "With Driver" : "Self-drive"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <MapPin size={14} className="text-accent" />
                        <span>{location}</span>
                    </div>
                </div>

                <Link
                    href={`/cars/${id}`}
                    className="block w-full text-center py-3 bg-foreground text-background rounded-xl font-bold hover:bg-muted transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
