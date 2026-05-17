import Link from "next/link";
import {
  ArrowLeft,
  Mountain,
  Star,
  Users,
  UtensilsCrossed,
  Waves,
  Building2,
  Crown,
  Globe,
  Sunrise,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const highlights = [
  {
    icon: Crown,
    title: "A Legacy of Royalty",
    body: "Situated on the hilltop overlooking the Fasil Ghebbi Royal Enclosure, Goha Hotel has hosted dignitaries, explorers, and culture-seekers for decades.",
  },
  {
    icon: Mountain,
    title: "Panoramic Hilltop Views",
    body: "Our ridge-top position offers an unmatched 360° vantage of Gondar city, the ancient castles, and the vast Amhara highland horizons.",
  },
  {
    icon: UtensilsCrossed,
    title: "Authentic Cuisine",
    body: "Savor traditional Ethiopian injera, honey-wine tej, and international dishes at our panoramic hilltop restaurant with views as stunning as the menu.",
  },
  {
    icon: Waves,
    title: "Hilltop Pool",
    body: "Our famous hilltop swimming pool is one of Gondar's most iconic experiences — watching the sun dip below the valley from the water's edge is unforgettable.",
  },
  {
    icon: Building2,
    title: "82 Appointed Rooms",
    body: "Each guestroom and suite is fitted with traditional Ethiopian textiles, rustic stone masonry finishes, and every modern comfort you'd expect.",
  },
  {
    icon: Globe,
    title: "Gateway to Africa's Heritage",
    body: "We sit minutes from Gondar's UNESCO World Heritage sites — the perfect base for history buffs, adventure travelers, and cultural explorers alike.",
  },
];

const stats = [
  { value: "82", label: "Rooms & Suites" },
  { value: "17th C", label: "History Below Us" },
  { value: "3 km", label: "From City Centre" },
  { value: "★ 4.7", label: "Guest Rating" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-slate-200/60 bg-white">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-amber-400/8 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-2">
              Our Story
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl leading-[1.1]">
              Goha Hotel Gondar —{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                A Hilltop Sanctuary
              </span>{" "}
              in the City of Kings
            </h1>
            <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-2xl">
              For decades, Goha Hotel has stood as Gondar&apos;s premier hilltop destination,
              blending historical charm with world-class hospitality. Named after the Amharic
              word for <em>&quot;dawn,&quot;</em> we are situated on a high ridge overlooking the
              legendary 17th-century capital of the Ethiopian Empire.
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats band ── */}
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-emerald-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main story ── */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-16">

        {/* Full narrative */}
        <div className="mx-auto max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
              <Sunrise className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">The Goha Experience</h2>
          </div>

          <div className="space-y-5 text-[15px] leading-[1.8] text-slate-600">
            <p>
              Appropriately named after the Amharic word for <strong className="text-slate-800">&quot;dawn,&quot;</strong> the hotel is
              situated on a high ridge overlooking the legendary 17th-century capital of the
              Ethiopian Empire. It offers travelers an unmatched panoramic vantage point where
              the ancient silhouettes of the <strong className="text-slate-800">Fasil Ghebbi Royal Enclosure</strong> meet the
              vast horizons of the Amhara Region.
            </p>
            <p>
              The property features <strong className="text-slate-800">82 well-appointed guestrooms and suites,</strong> each
              thoughtfully designed with traditional Ethiopian textiles, rustic stone masonry,
              and modern comforts. Guests can indulge in authentic traditional and international
              cuisine at our panoramic restaurant, relax with local honey wine on our terrace,
              or take a swim in our <strong className="text-slate-800">famous hilltop pool</strong> while watching the sunset
              over the valley below.
            </p>
            <p>
              Whether you are a global explorer discovering Africa&apos;s historic castles, a
              corporate traveler seeking a serene conference environment, or a family exploring
              the heritage of Ethiopia, Goha Hotel provides a majestic, secure, and deeply
              authentic retreat.
            </p>
            <p>
              Experience the rich culture, warm hospitality, and timeless views that make Goha
              Hotel a <strong className="text-slate-800">legendary landmark in the City of Kings.</strong>
            </p>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-2">
              What Sets Us Apart
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Six Reasons to Choose Goha
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-100 mb-4 transition-all duration-300 group-hover:from-emerald-500 group-hover:to-cyan-500 group-hover:border-transparent">
                  <h.icon className="size-5 text-emerald-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{h.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guest types */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 border border-amber-100">
              <Users className="size-5 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Who We Welcome</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "🌍",
                type: "Global Explorers",
                desc: "Discovering Africa's historic castles and UNESCO-listed heritage sites of Gondar.",
              },
              {
                emoji: "💼",
                type: "Corporate Travelers",
                desc: "Seeking a serene conference environment with premium facilities and connectivity.",
              },
              {
                emoji: "👨‍👩‍👧",
                type: "Families",
                desc: "Exploring the living heritage of Ethiopia in a comfortable, safe, authentic setting.",
              },
            ].map((g) => (
              <div
                key={g.type}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
              >
                <span className="text-3xl mb-3 block">{g.emoji}</span>
                <p className="text-sm font-bold text-slate-900 mb-1.5">{g.type}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-8 sm:p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Star className="size-6 text-amber-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl mb-3">
              Ready to Experience the City of Kings?
            </h2>
            <p className="text-sm text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
              Reserve your stay at Goha Hotel and wake up to panoramic views of ancient castles and
              the timeless Amhara highlands.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Book Your Room
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
