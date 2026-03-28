"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-3 py-10 pb-24 sm:px-6 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">Contact Now</h1>
        <p className="mt-3 text-slate-600">
          Need help with an order, delivery, or product recommendation? Our Amman-based support team is available every day.
        </p>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <a href="tel:+96265009900" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Call</p>
            <p className="mt-1 text-base font-bold text-[#0B1F3B]">+962 6 500 9900</p>
            <p className="mt-1 text-xs text-slate-600">9:00 AM - 9:00 PM</p>
          </a>
          <a href="mailto:support@now.jo" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-base font-bold text-[#0B1F3B]">support@now.jo</p>
            <p className="mt-1 text-xs text-slate-600">Replies within one business day</p>
          </a>
          <a href="https://wa.me/962799004412" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-200">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">WhatsApp</p>
            <p className="mt-1 text-base font-bold text-[#0B1F3B]">+962 79 900 4412</p>
            <p className="mt-1 text-xs text-slate-600">Quick updates for active orders</p>
          </a>
        </section>

        <section id="help-center" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Full Name
              <input required className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Email
              <input required type="email" className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Order Number (optional)
              <input placeholder="NOW-10293" className="h-11 rounded-xl border border-slate-300 px-3 outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              Message
              <textarea required rows={5} className="rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]" />
            </label>
            <button type="submit" className="rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white">
              Send Message
            </button>
            {sent && (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                Thanks. Our team received your message and will contact you shortly.
              </p>
            )}
          </form>

          <div className="mt-6 grid gap-2 text-sm text-slate-600">
            <p>Address: Abdali Boulevard, Amman, Jordan</p>
            <p>Phone: +962 6 500 9900</p>
            <p>Email: support@now.jo</p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
