"use client";

import React from "react";

import Link from "next/link";
import {
    LayoutDashboard,
    Car,
    CalendarCheck,
    Users as UsersIcon,
    Settings,
    LogOut,
    ChevronRight,
    X,
    Menu
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Auth Guard
    React.useEffect(() => {
        if (pathname === "/admin/login" || pathname === "/admin/signup") return;

        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace("/admin/login");
            }
        };
        checkUser();
    }, [pathname, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    // Don't show sidebar on login/signup pages
    if (pathname === "/admin/login" || pathname === "/admin/signup") return <>{children}</>;

    const menuItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
        { label: "Cars Fleet", icon: <Car size={20} />, href: "/admin/cars" },
        { label: "Bookings", icon: <CalendarCheck size={20} />, href: "/admin/bookings" },
        { label: "Drivers", icon: <UsersIcon size={20} />, href: "/admin/drivers" },
        { label: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
    ];

    return (
        <div className="flex h-screen bg-zinc-50/50 overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200 bg-white flex flex-col transition-transform duration-300 transform
                lg:translate-x-0 lg:static lg:inset-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-lg font-bold tracking-tighter hover:opacity-80 transition-opacity uppercase italic">
                            UNIQUE<span className="text-amber-500">MOTORS</span>
                            <span className="block text-[10px] not-italic uppercase text-zinc-400 font-bold tracking-widest mt-1">Admin Portal</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-zinc-400">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${pathname === item.href
                                ? "bg-black text-white shadow-lg"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                            {pathname === item.href && <ChevronRight size={14} className="opacity-50" />}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-zinc-100">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto flex flex-col">
                <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 lg:hidden shrink-0">
                    <Link href="/" className="text-sm font-bold tracking-tighter uppercase italic">
                        UNIQUE<span className="text-amber-500">MOTORS</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -mr-2 text-zinc-600">
                        <Menu size={24} />
                    </button>
                </header>
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
