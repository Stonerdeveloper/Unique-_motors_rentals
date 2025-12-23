"use client";

import { useState } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert("Login failed: " + error.message);
            } else {
                router.push("/admin");
            }
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-block mb-4">
                        <Image
                            src="/blue_logo.jpg"
                            alt="Unique Motors Logo"
                            width={200}
                            height={50}
                            className="h-12 w-auto object-contain mx-auto"
                            priority
                        />
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900">Sign in to Admin Portal</h2>
                    <p className="mt-2 text-sm text-zinc-500 font-medium">Enter your credentials to manage the fleet.</p>
                </div>

                <div className="bg-white p-8 border border-zinc-200 rounded-3xl shadow-xl shadow-zinc-200/50">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <Mail size={12} /> Email Address
                            </label>
                            <input
                                required
                                type="email"
                                placeholder="admin@uniquemotors.ng"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <Lock size={12} /> Password
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-full font-bold hover:bg-zinc-800 transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-400 font-medium italic">
                    Authorized personnel only. Sessions are logged.
                </p>
            </div>
        </div>
    );
}
