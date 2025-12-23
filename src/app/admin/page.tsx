"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Car,
    CalendarCheck,
    CreditCard,
    Plus,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        activeBookings: 0,
        totalRevenue: 0,
        pendingPayments: 0
    });
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: carsData, count } = await supabase.from("cars").select("*", { count: "exact" });
            const { data: bookingsData } = await supabase.from("bookings").select("*, cars(name)").order("created_at", { ascending: false }).limit(5);

            if (carsData) {
                setStats({
                    totalCars: count || 0,
                    activeBookings: bookingsData?.filter(b => b.booking_status === "confirmed").length || 0,
                    totalRevenue: 0,
                    pendingPayments: bookingsData?.filter(b => b.payment_status === "pending").length || 0
                });
                setBookings(bookingsData || []);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="space-y-8 min-h-screen bg-zinc-50/50 p-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted text-sm">Welcome back, Admin. Here is what is happening today.</p>
                </div>
                <Link
                    href="/admin/cars/new"
                    className="bg-black text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                >
                    <Plus size={18} />
                    <span>Add New Car</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Fleet" value={stats.totalCars} icon={<Car className="text-blue-500" />} change="+2 new this week" />
                <StatCard title="Confirmed Bookings" value={stats.activeBookings} icon={<CalendarCheck className="text-green-500" />} change="+12% from last month" />
                <StatCard title="Revenue (MTD)" value={`₦${stats.totalRevenue}`} icon={<TrendingUp className="text-amber-500" />} change="Calculated" />
                <StatCard title="Pending Payments" value={stats.pendingPayments} icon={<CreditCard className="text-orange-500" />} change="Requires attention" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <div className="p-8 border border-zinc-200 rounded-3xl bg-white shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-zinc-400" />
                        <span>Recent Bookings</span>
                    </h3>
                    <div className="space-y-4">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-16 bg-zinc-100 animate-pulse rounded-2xl" />)
                        ) : bookings.length > 0 ? bookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-100 hover:bg-zinc-50 transition-colors">
                                <div>
                                    <div className="font-bold text-sm">{(booking as any).cars?.name || "Premium Vehicle"}</div>
                                    <div className="text-xs text-zinc-500 font-medium">{booking.customer_name} • {booking.pickup_date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold">₦{booking.total_price.toLocaleString()}</div>
                                    <StatusBadge status={booking.booking_status} />
                                </div>
                            </div>
                        )) : <p className="text-sm text-zinc-400 py-8 text-center italic">No recent bookings found.</p>}
                    </div>
                    <Link href="/admin/bookings" className="block text-center mt-6 text-sm font-bold text-amber-600 hover:underline">View All Bookings →</Link>
                </div>

                {/* System Activity / Alerts */}
                <div className="p-8 border border-zinc-200 rounded-3xl bg-white shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <AlertCircle size={20} className="text-zinc-400" />
                        <span>Quick Actions & Alerts</span>
                    </h3>
                    <div className="space-y-4">
                        <ActionItem
                            title="Pending Bank Transfers"
                            count={2}
                            description="Manually verify receipts for recent bookings."
                            action="Review"
                            color="orange"
                        />
                        <ActionItem
                            title="Vehicle Maintenance"
                            count={1}
                            description="Toyota Prado J150 due for servicing."
                            action="Log"
                            color="blue"
                        />
                        <ActionItem
                            title="WhatsApp Enquiries"
                            count={5}
                            description="Unanswered messages from the website."
                            action="Open"
                            color="green"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, change }: any) {
    return (
        <div className="p-6 border border-zinc-200 rounded-3xl bg-white shadow-sm space-y-4">
            <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-zinc-50">{icon}</div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">{change}</span>
            </div>
            <div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-tighter mb-1">{title}</div>
                <div className="text-2xl font-bold tracking-tight text-zinc-900">{value}</div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: any = {
        confirmed: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-orange-100 text-orange-700 border-orange-200",
        cancelled: "bg-red-100 text-red-700 border-red-200"
    };
    return (
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors[status] || colors.pending}`}>
            {status}
        </span>
    );
}

function ActionItem({ title, count, description, action, color }: any) {
    const colors: any = {
        orange: "bg-orange-500",
        blue: "bg-blue-500",
        green: "bg-green-500"
    };
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl border border-zinc-100">
            <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${colors[color]} shrink-0`} />
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-zinc-900">{title}</h4>
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">{count}</span>
                </div>
                <p className="text-[11px] text-zinc-500 mb-3 leading-tight">{description}</p>
                <button className="text-[11px] font-bold text-zinc-900 hover:underline">{action} →</button>
            </div>
        </div>
    );
}
