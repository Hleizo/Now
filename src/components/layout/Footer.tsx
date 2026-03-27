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

  const socialLinks = [
    { label: "Facebook", icon: "📘", href: "#" },
    { label: "Twitter", icon: "🐦", href: "#" },
    { label: "Instagram", icon: "📷", href: "#" },
    { label: "YouTube", icon: "📺", href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-white mt-8 pb-24 md:pb-8">
      {/* Newsletter Section */}
      <div className="bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Get exclusive offers & updates
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                Subscribe to our newsletter and never miss a deal!
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl hover:bg-slate-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-extrabold text-2xl">N</span>
              </div>
              <span className="text-2xl font-extrabold">Now</span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Shop smarter, live better. Your one-stop destination for everything you need, delivered fast.
            </p>
            
            {/* App Download Buttons */}
            <p className="text-sm font-semibold text-slate-300 mb-3">Download Our App</p>
            <div className="flex gap-2">
              <a
                href="#"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
              >
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Download on</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
              >
                <span className="text-2xl">▶️</span>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Shop</h3>
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
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Support</h3>
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
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-slate-300">Company</h3>
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

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 bg-slate-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <span className="text-lg">{social.icon}</span>
              </a>
            ))}
          </div>
          <p className="text-slate-500 text-sm text-center">
            © 2024 Now. All rights reserved.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-4">
          <span className="text-slate-500 text-sm">We accept:</span>
          <div className="flex items-center gap-3 text-2xl">
            <span title="Visa">💳</span>
            <span title="Mastercard">💳</span>
            <span title="PayPal">💰</span>
            <span title="Apple Pay">🍎</span>
            <span title="Google Pay">📱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
