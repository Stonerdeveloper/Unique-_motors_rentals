"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    ArrowLeft,
    Save,
    Loader2,
    Car,
    MapPin,
    ShieldCheck,
    DollarSign,
    Type as TypeIcon,
    Tag,
    Upload,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewCarPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        type: "SUV",
        price_per_day: 0,
        with_driver: true,
        location: "Lagos",
        image_url: ""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let finalImageUrl = formData.image_url;

        // Upload image if selected
        if (imageFile) {
            setUploading(true);
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('car-images')
                .upload(filePath, imageFile);

            if (uploadError) {
                alert("Error uploading image: " + uploadError.message);
                setLoading(false);
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('car-images')
                .getPublicUrl(filePath);

            finalImageUrl = publicUrl;
        }

        const { error } = await supabase.from("cars").insert([{
            ...formData,
            image_url: finalImageUrl
        }]);

        if (!error) {
            router.push("/admin/cars");
        } else {
            alert("Error adding car: " + error.message);
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/cars" className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Add New Vehicle</h1>
                        <p className="text-muted text-xs">Enter the vehicle specifications for your fleet.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                        <Car size={16} /> Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <Tag size={12} /> Model Name
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Prado J150"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <Tag size={12} /> Brand
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Toyota"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <TypeIcon size={12} /> Vehicle Type
                            </label>
                            <select
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>SUV</option>
                                <option>Sedan</option>
                                <option>Bus</option>
                                <option>Luxury</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <DollarSign size={12} /> Price Per Day (₦)
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="50000"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, price_per_day: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                        <MapPin size={16} /> Service & Availability
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <MapPin size={12} /> Primary Location
                            </label>
                            <select
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            >
                                <option>Lagos</option>
                                <option>Abuja</option>
                                <option>Port Harcourt</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                                <ShieldCheck size={12} /> Service Mode
                            </label>
                            <select
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-amber-500"
                                onChange={(e) => setFormData({ ...formData, with_driver: e.target.value === "true" })}
                            >
                                <option value="true">Professional Chauffeur Driven</option>
                                <option value="false">Self-Drive Policy</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest flex items-center gap-1">
                            <ImageIcon size={12} /> Vehicle Image
                        </label>

                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="relative w-full md:w-48 h-32 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl overflow-hidden flex items-center justify-center group hover:border-amber-500 transition-colors">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-zinc-400">
                                        <Upload size={24} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Upload PNG/JPG</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-xs text-zinc-500 font-medium">Click the card to browse or drag and drop an image of the vehicle.</p>
                                <p className="text-[10px] text-zinc-400 italic">Images are stored securely on Supabase Storage. Max size 2MB recommended.</p>
                                {imageFile && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold">
                                        <ShieldCheck size={12} />
                                        {imageFile.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading || uploading}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-5 bg-black text-white rounded-full font-bold hover:bg-zinc-800 transition-all shadow-xl disabled:opacity-50"
                >
                    {loading || uploading ? <Loader2 className="animate-spin" size={24} /> : (
                        <>
                            <Save size={20} />
                            <span>Save Vehicle to Fleet</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
