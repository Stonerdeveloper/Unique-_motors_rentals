"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/blue_logo.jpg"
                                alt="Unique Motors Logo"
                                width={160}
                                height={40}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/cars" className="text-sm font-medium hover:text-accent transition-colors">Find a Car</Link>
                            <Link href="/how-it-works" className="text-sm font-medium hover:text-accent transition-colors">How it works</Link>
                            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        <a href="tel:+2348000000000" className="flex items-center gap-1 text-sm font-medium">
                            <Phone size={16} />
                            <span>Call Us</span>
                        </a>
                        <Link href="/cars" className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-muted">
                            Book Now
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-border transition-colors">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn("lg:hidden bg-background border-b border-border transition-all duration-300 overflow-hidden", isOpen ? "max-h-96" : "max-h-0")}>
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Link href="/cars" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-border">Find a Car</Link>
                    <Link href="/how-it-works" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-border">How it works</Link>
                    <Link href="/contact" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-border">Contact</Link>
                    <div className="pt-4 border-t border-border flex flex-col gap-2">
                        <a href="tel:+2348000000000" className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-border">
                            <Phone size={20} /> Call Support
                        </a>
                        <a href="https://wa.me/2348000000000" className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium bg-green-500 text-white hover:bg-green-600">
                            <MessageSquare size={20} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
