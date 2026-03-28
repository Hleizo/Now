import { SiteShell } from "@/components/site/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-3 py-6 pb-24 sm:px-6 sm:py-8 md:pb-10">
        <h1 className="text-2xl font-black text-[#0B1F3B] sm:text-3xl">About Now</h1>
        <p className="mt-3 text-slate-600">
          Now is a Jordan-based startup marketplace focused on electronics, phone and laptop accessories,
          and school essentials. We launched with one goal: build a trusted local shopping experience with
          reliable delivery, realistic pricing, and products people actually need.
        </p>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Founded</p>
            <p className="mt-2 text-2xl font-black text-[#0B1F3B]">2024</p>
            <p className="mt-1 text-sm text-slate-600">Built and operated in Amman.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Coverage</p>
            <p className="mt-2 text-2xl font-black text-[#0B1F3B]">Jordan-wide</p>
            <p className="mt-1 text-sm text-slate-600">Same-day in Amman, next-day major cities.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Customer Support</p>
            <p className="mt-2 text-2xl font-black text-[#0B1F3B]">7 days</p>
            <p className="mt-1 text-sm text-slate-600">Arabic and English support team.</p>
          </article>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#0B1F3B]">Our Mission</h2>
            <p className="mt-2 text-sm text-slate-600">
              Make trusted products more accessible for families, students, and professionals across Jordan.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#0B1F3B]">Local First</h2>
            <p className="mt-2 text-sm text-slate-600">
              We partner with reliable local suppliers and offer localized delivery and support.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#0B1F3B]">Trust & Quality</h2>
            <p className="mt-2 text-sm text-slate-600">
              Every listing is reviewed to ensure quality, value, and realistic product information.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-black text-[#0B1F3B]">How We Keep Quality High</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Only approved local and regional suppliers are listed on the platform.</li>
            <li>Best-selling products are checked weekly for stock, pricing, and customer feedback.</li>
            <li>School supply collections are refreshed each term to match real student demand.</li>
            <li>Support tickets are tracked and resolved by a Jordan-based operations team.</li>
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
