import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-gray-400 py-8 border-t border-[var(--color-brand-gray-light)] mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2026 DriveLegal TN. Hackathon Submission.</p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/laws" className="hover:text-white transition-colors">Laws Database</Link>
          <Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link>
          <span className="text-gray-600">|</span>
          <Link href="/admin/login" className="text-[var(--color-brand-green-light)] hover:text-white transition-colors font-bold">Authority Login</Link>
        </div>
      </div>
    </footer>
  );
}
