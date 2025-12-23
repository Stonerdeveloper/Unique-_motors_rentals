"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-zinc-100 overflow-hidden">
            <div className="h-full bg-amber-500 animate-[loading_2s_ease-in-out_infinite] w-1/3" />
            <style jsx global>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); width: 10%; }
                    50% { transform: translateX(100%); width: 30%; }
                    100% { transform: translateX(300%); width: 10%; }
                }
            `}</style>
        </div>
    );
}
