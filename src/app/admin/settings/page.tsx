"use client";

import { useState } from "react";
import {
    Settings as SettingsIcon,
    MessageSquare,
    Phone,
    Mail,
    Globe,
    CreditCard,
    Save,
    Bell,
    Shield,
    Loader2
} from "lucide-react";

export default function SettingsPage() {
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("Settings updated successfully!");
        }, 1000);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-24">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted text-sm">Configure Unique Motors platform’s contact info, integrations, and fleet defaults.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Navigation/Tabs (Simulated) */}
                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-2xl text-sm font-bold shadow-lg">
                        <Globe size={18} />
                        <span>General & Contact</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 rounded-2xl text-sm font-bold transition-colors">
                        <CreditCard size={18} />
                        <span>Payment Gateways</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 rounded-2xl text-sm font-bold transition-colors">
                        <Bell size={18} />
                        <span>Notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 rounded-2xl text-sm font-bold transition-colors">
                        <Shield size={18} />
                        <span>Security & API</span>
                    </button>
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Info Card */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                            <MessageSquare size={16} /> Contact Integrations
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                    WhatsApp Business Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="+234 800 000 0000"
                                        defaultValue="+2348000000000"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 pl-12 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                    />
                                </div>
                                <p className="text-[10px] text-zinc-400 italic">This number will be used for all WhatsApp CTAs on the site.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                    Support Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                    <input
                                        type="email"
                                        placeholder="support@uniquemotors.ng"
                                        defaultValue="hello@uniquemotors.ng"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 pl-12 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Regional Settings Card */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                            <Globe size={16} /> Regional Configuration
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                                    Active Cities
                                </label>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {["Lagos", "Abuja", "Port Harcourt"].map(city => (
                                        <span key={city} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-full text-[10px] font-bold uppercase border border-zinc-200">
                                            {city}
                                        </span>
                                    ))}
                                    <button className="px-3 py-1.5 border border-dashed border-zinc-300 text-zinc-400 rounded-full text-[10px] font-bold uppercase hover:border-amber-500 hover:text-amber-500 transition-colors">
                                        + Add City
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                                    Base Currency
                                </label>
                                <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500">
                                    <option>NGN (₦) - Nigerian Naira</option>
                                    <option>USD ($) - US Dollar</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Gateways (Mock) */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm opacity-60 grayscale cursor-not-allowed">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                            <CreditCard size={16} /> Payment Gateways
                        </h3>
                        <p className="text-xs text-zinc-500 italic">Advanced payment configuration is currently managed by the developer. Contact support to change keys.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-black text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            <span>Save Changes</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
