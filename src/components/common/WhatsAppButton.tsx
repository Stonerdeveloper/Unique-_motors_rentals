"use client";

import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/2348000000000" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group flex items-center gap-2"
      aria-label="Chat on WhatsApp"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-xs font-bold text-sm pl-0 group-hover:pl-2">
        Chat with us
      </span>
      <MessageSquare size={24} />
    </a>
  );
}
