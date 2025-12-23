"use client";

import { useState } from "react";
import { Calendar, User, Phone, Mail, MapPin, ArrowRight, Loader2 } from "lucide-react";

interface BookingFormProps {
    car: any;
}

export default function BookingForm({ car }: BookingFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        pickup_date: "",
        return_date: "",
        pickup_location: car.location,
        with_driver: car.with_driver,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Use local proxy
            const response = await fetch("/api/proxy-booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    car_id: car.id,
                    customer_name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    pickup_location: formData.pickup_location,
                    pickup_date: formData.pickup_date,
                    return_date: formData.return_date,
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                alert(`Booking failed: ${errorData.error || "Please check your information and try again."}`);
            }
        } catch (err) {
            console.error(err);
            alert("Connection error. Please check your internet and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center">
                <div className="h-16 w-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar size={32} />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Booking Requested!</h3>
                <p className="text-green-800 text-sm mb-6">Our team will call you shortly to confirm availability and payment details.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-green-700 font-bold text-sm hover:underline"
                >
                    Make another booking
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                        <User size={12} /> Full Name
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                        <Phone size={12} /> Phone Number
                    </label>
                    <input
                        required
                        type="tel"
                        placeholder="+234..."
                        className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                    <Mail size={12} /> Email Address
                </label>
                <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                        <Calendar size={12} /> Pickup Date
                    </label>
                    <input
                        required
                        type="date"
                        className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                        onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                        <Calendar size={12} /> Return Date
                    </label>
                    <input
                        required
                        type="date"
                        className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                        onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase font-bold text-muted tracking-widest flex items-center gap-1">
                    <MapPin size={12} /> Pickup Location
                </label>
                <select
                    className="w-full bg-muted/20 border border-border rounded-xl p-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                    value={formData.pickup_location}
                    onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                >
                    <option>Lagos (Island)</option>
                    <option>Lagos (Mainland)</option>
                    <option>Abuja (Central)</option>
                    <option>Abuja (Airport)</option>
                    <option>Port Harcourt</option>
                </select>
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-bold hover:bg-muted transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                        <span>Confirm Booking</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            <p className="text-[10px] text-muted text-center uppercase tracking-widest font-bold">
                Zero secure deposit. Payment handled after confirmation.
            </p>
        </form>
    );
}
