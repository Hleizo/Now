import React from "react";

export function Footer() {
  const footerLinks = {
    shop: [
      { label: "All Categories", href: "/categories" },
      { label: "Flash Deals", href: "/deals" },
      { label: "New Arrivals", href: "/new" },
      { label: "Best Sellers", href: "/bestsellers" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Track Order", href: "/track" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-white mt-8 pb-20 md:pb-8">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold">Now</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Shop smarter, live better. Your one-stop destination for everything you need.
            </p>
            {/* App Download Buttons */}
            <div className="flex gap-2">
              <a
                href="#"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Download on</p>
                  <p className="text-xs font-semibold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Get it on</p>
                  <p className="text-xs font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © 2024 Now. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
