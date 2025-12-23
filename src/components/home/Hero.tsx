"use client";

import Image from "next/image";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-16 h-screen overflow-hidden">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-car.png"
                    alt="Premium Car Rental Nigeria"
                    fill
                    className="object-cover object-right brightness-[0.9] dark:brightness-[0.7]"
                    priority
                    quality={85}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Available in Lagos, Abuja & PH
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                        Premium Mobility <br />
                        <span className="text-muted font-normal italic">Tailored for Nigeria</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted max-w-lg mb-10 leading-relaxed">
                        From daily commutes in Lagos to corporate arrivals in Abuja. Rent luxury SUVs, sedans and buses with professional chauffeurs.
                    </p>

                    {/* Quick Search Bar */}
                    <div className="bg-background border border-border p-2 rounded-2xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center gap-2 max-w-4xl glass overflow-hidden lg:overflow-visible">
                        <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b lg:border-b-0 lg:border-r border-border">
                            <MapPin size={18} className="text-accent" />
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest text-nowrap">Location</span>
                                <select className="bg-transparent text-sm font-bold text-foreground outline-none border-none p-0 focus:ring-0 appearance-none cursor-pointer">
                                    <option>Lagos (Island & Mainland)</option>
                                    <option>Abuja (FCT)</option>
                                    <option>Port Harcourt</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center px-4 py-2 gap-3 border-b lg:border-b-0 lg:border-r border-border">
                            <Calendar size={18} className="text-accent" />
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest text-nowrap">Dates</span>
                                <span className="text-sm font-bold text-foreground text-nowrap">Select Pickup Date</span>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center px-4 py-2 gap-3 lg:border-none">
                            <Users size={18} className="text-accent" />
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] uppercase font-extrabold text-zinc-500 tracking-widest text-nowrap">Service</span>
                                <select className="bg-transparent text-sm font-bold text-foreground outline-none border-none p-0 focus:ring-0 appearance-none cursor-pointer">
                                    <option>With Driver (Recommended)</option>
                                    <option>Self-drive (Verified only)</option>
                                </select>
                            </div>
                        </div>

                        <button className="bg-foreground text-background px-8 py-4 rounded-xl lg:rounded-full font-bold hover:bg-muted transition-all flex items-center justify-center gap-2 group shrink-0">
                            <Search size={18} className="group-hover:scale-110 transition-transform" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
