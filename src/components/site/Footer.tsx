import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 bg-[#0B1F3B] pb-24 text-white md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-3 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white font-black text-[#0B1F3B]">N</span>
            <span className="text-xl font-black">Now</span>
          </div>
          <p className="text-sm text-slate-300">
            Jordan&apos;s local marketplace for electronics, laptop accessories, and school essentials.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-200">Company</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/category/deals" className="hover:text-white">Deals</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-200">Support</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link href="/contact#help-center" className="hover:text-white">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-white">Shipping Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Returns & Refunds</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-200">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Abdali Boulevard, Amman</li>
            <li><a href="tel:+96265009900" className="hover:text-white">+962 6 500 9900</a></li>
            <li><a href="mailto:support@now.jo" className="hover:text-white">support@now.jo</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-slate-700 px-3 py-4 text-xs text-slate-400 sm:px-6">
        <p>Now Marketplace LLC - Registered in Jordan</p>
        <div className="flex items-center gap-3">
          <Link href="/about" className="hover:text-white">Privacy</Link>
          <Link href="/about" className="hover:text-white">Terms</Link>
          <Link href="/contact" className="hover:text-white">Support</Link>
        </div>
      </div>
    </footer>
  );
}
