"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Users as UsersIcon,
    Plus,
    Search,
    Phone,
    Mail,
    Trash2,
    Loader2,
    UserCheck,
} from "lucide-react";

export default function DriversPage() {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDrivers();
    }, []);

    async function fetchDrivers() {
        setLoading(true);
        const { data, error } = await supabase.from("drivers").select("*").order("name");
        if (!error && data) setDrivers(data);
        setLoading(false);
    }

    const filteredDrivers = drivers.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        (d.email && d.email.toLowerCase().includes(search.toLowerCase())) ||
        d.phone.includes(search)
    );

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
                    <p className="text-muted text-sm">Manage your professional chauffeurs for driver-led rentals.</p>
                </div>
                <button
                    className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                    onClick={() => alert("Add Driver feature coming soon in version 1.1")}
                >
                    <Plus size={18} />
                    <span>Register New Driver</span>
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 border border-zinc-200 rounded-3xl shadow-sm">
                <Search size={20} className="text-zinc-400" />
                <input
                    type="text"
                    placeholder="Search by name, phone or email..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="animate-spin text-zinc-300" size={48} />
                </div>
            ) : (
                <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-zinc-100 bg-zinc-50/50">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Driver</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact Info</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {filteredDrivers.map((driver) => (
                                <tr key={driver.id} className="hover:bg-zinc-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                                                {driver.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">{driver.name}</div>
                                                <div className="text-[10px] text-zinc-400 uppercase tracking-tighter">Verified Professional</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-zinc-600">
                                                <Phone size={12} className="text-zinc-400" />
                                                <span>{driver.phone}</span>
                                            </div>
                                            {driver.email && (
                                                <div className="flex items-center gap-2 text-xs text-zinc-600">
                                                    <Mail size={12} className="text-zinc-400" />
                                                    <span>{driver.email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">
                                            <UserCheck size={10} />
                                            <span>Active</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredDrivers.length === 0 && (
                        <div className="py-24 text-center">
                            <UsersIcon size={48} className="mx-auto text-zinc-100 mb-4" />
                            <p className="text-zinc-400 font-medium italic">No drivers found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
