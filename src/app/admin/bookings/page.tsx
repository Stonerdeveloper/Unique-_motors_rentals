"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Search,
    Calendar,
    User,
    Phone,
    CreditCard,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    ChevronDown
} from "lucide-react";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        setLoading(true);
        const { data, error } = await supabase
            .from("bookings")
            .select("*, cars(name, brand)")
            .order("created_at", { ascending: false });

        if (!error && data) setBookings(data);
        setLoading(false);
    }

    const updateStatus = async (id: string, field: string, value: string) => {
        const { error } = await supabase
            .from("bookings")
            .update({ [field]: value })
            .eq("id", id);

        if (!error) fetchBookings();
    };

    const filteredBookings = bookings.filter(b =>
        b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase()) ||
        (b.cars as any)?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
                <p className="text-muted text-sm">Track and manage all car rental reservations.</p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 border border-zinc-200 rounded-3xl shadow-sm">
                <Search size={20} className="text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search by customer name, email or vehicle..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Customer</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Vehicle</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Dates</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Finance</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {loading ? (
                                [1, 2, 3].map(i => <tr key={i} className="h-20 bg-zinc-50/50 animate-pulse" />)
                            ) : filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-sm text-zinc-900">{booking.customer_name}</div>
                                        <div className="text-xs text-zinc-500 font-medium flex items-center gap-1 mt-1">
                                            <Phone size={10} /> {booking.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-sm text-zinc-900">{(booking.cars as any)?.brand} {(booking.cars as any)?.name}</div>
                                        <div className="text-xs text-zinc-500 font-medium">{booking.pickup_location}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                                            <Calendar size={12} className="text-amber-500" />
                                            <span>{booking.pickup_date} - {booking.return_date}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-sm text-zinc-900">₦{booking.total_price.toLocaleString()}</div>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <select
                                                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-transparent cursor-pointer ${booking.payment_status === "paid" ? "text-green-600 border-green-200" : "text-amber-600 border-amber-200"
                                                    }`}
                                                value={booking.payment_status}
                                                onChange={(e) => updateStatus(booking.id, "payment_status", e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-transparent cursor-pointer ${booking.booking_status === "confirmed" ? "text-blue-600 border-blue-200" :
                                                    booking.booking_status === "cancelled" ? "text-red-600 border-red-200" : "text-zinc-600 border-zinc-200"
                                                }`}
                                            value={booking.booking_status}
                                            onChange={(e) => updateStatus(booking.id, "booking_status", e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                                                <ExternalLink size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredBookings.length === 0 && !loading && (
                    <div className="py-12 text-center">
                        <p className="text-zinc-400 font-medium italic">No bookings found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
