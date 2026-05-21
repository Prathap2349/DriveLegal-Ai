import Link from "next/link";
import { ShieldAlert, MapPin, BookOpen, MessageSquare } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-[var(--color-brand-dark)] text-white sticky top-0 z-50 border-b border-[var(--color-brand-gray-light)]">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-[var(--color-brand-green-light)]" />
          <span className="text-xl font-bold tracking-tight">Drive<span className="text-[var(--color-brand-green-light)]">Legal TN</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/calculator" className="text-sm font-medium hover:text-[var(--color-brand-green-light)] flex items-center gap-2 transition-colors">
            <MapPin className="w-4 h-4" /> Challan Calculator
          </Link>
          <Link href="/laws" className="text-sm font-medium hover:text-[var(--color-brand-green-light)] flex items-center gap-2 transition-colors">
            <BookOpen className="w-4 h-4" /> Law Database
          </Link>
          <Link href="/chat" className="bg-[var(--color-brand-green)] hover:bg-[var(--color-brand-green-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <MessageSquare className="w-4 h-4" /> AI Chatbot
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          <button className="text-[var(--color-brand-green-light)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
