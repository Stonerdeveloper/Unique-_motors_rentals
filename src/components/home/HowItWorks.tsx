"use client";

import { MapPin, CalendarCheck, Key } from "lucide-react";

const steps = [
    {
        title: "Choose your Car",
        description: "Browse our premium fleet in Lagos, Abuja, or Port Harcourt and select your vehicle.",
        icon: <MapPin className="text-accent" size={32} />,
    },
    {
        title: "Book & Pay",
        description: "Choose your dates, driver option, and pay securely via Paystack or Bank Transfer.",
        icon: <CalendarCheck className="text-accent" size={32} />,
    },
    {
        title: "Ride in Style",
        description: "Your car arrives at your location with a professional chauffeur or ready for pickup.",
        icon: <Key className="text-accent" size={32} />,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 border-t border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
                    <p className="text-muted max-w-2xl mx-auto">Three simple steps to experience premium mobility in Nigeria.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group text-center">
                            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/5 ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-accent/10 group-hover:scale-110">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted text-sm leading-relaxed">{step.description}</p>

                            {index < 2 && (
                                <div className="hidden md:block absolute top-10 -right-6 w-12 border-t-2 border-dashed border-border pointer-events-none" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
