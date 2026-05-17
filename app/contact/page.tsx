"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Send,
  CheckCircle2,
  MessageSquare,
  User,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const contactCards = [
  {
    icon: Phone,
    label: "Call Us",
    lines: [
      { text: "+251 58 111 0634", href: "tel:+251581110634", sub: "Main Line" },
      { text: "+251 912 679 216", href: "tel:+251912679216", sub: "Alternative Mobile" },
      { text: "+251 58 111 1920", href: undefined, sub: "Fax" },
    ],
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: [
      { text: "hello@goha-hotel.com", href: "mailto:hello@goha-hotel.com", sub: "General Enquiries" },
      { text: "reservations@goha-hotel.com", href: "mailto:reservations@goha-hotel.com", sub: "Reservations" },
    ],
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    icon: MapPin,
    label: "Find Us",
    lines: [
      { text: "Hilltop Ridge Area, Gondar", href: undefined, sub: "Physical Address" },
      { text: "Amhara Region, Ethiopia", href: undefined, sub: "" },
      { text: "P.O. Box 182, 6200", href: undefined, sub: "Postal" },
    ],
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Clock,
    label: "Reception Hours",
    lines: [
      { text: "24 / 7", href: undefined, sub: "Front Desk" },
      { text: "Check-in from 2:00 PM", href: undefined, sub: "" },
      { text: "Check-out by 12:00 PM", href: undefined, sub: "" },
    ],
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

const socialLinks = [
  {
    icon: Globe,
    label: "Instagram — Goha Hotel Gondar",
    href: "https://www.instagram.com/explore/locations/284825813/goha-hotel-gondar-ethiopie/",
  },
  {
    icon: ExternalLink,
    label: "Facebook — Goha Hotel",
    href: "https://web.facebook.com/p/Goha-Hotel-%E1%8C%8E%E1%88%83-%E1%88%86%E1%89%B4%E1%88%8D-100063693654371/",
  },
];

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
        {required && <span className="ml-1 text-emerald-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-slate-200/60 bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/8 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-2">
                Get In Touch
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                Whether you&apos;re planning a stay, have a question, or simply want to learn more
                about Goha Hotel Gondar — our team is always ready to help.
              </p>
            </div>

            {/* Map link badge */}
            <a
              href="https://maps.google.com/?q=Goha+Hotel+Gondar+Ethiopia"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 shrink-0"
            >
              <MapPin className="size-4" />
              View on Map
            </a>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-5 py-12">

        {/* Contact info cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {contactCards.map((card) => (
            <div
              key={card.label}
              className={`rounded-3xl border ${card.border} ${card.bg} p-6 flex flex-col gap-4`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-md`}>
                <card.icon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
                  {card.label}
                </p>
                <ul className="space-y-2.5">
                  {card.lines.map((line, i) =>
                    line.href ? (
                      <li key={i}>
                        {line.sub && (
                          <p className="text-[10px] text-slate-400 leading-none mb-0.5">{line.sub}</p>
                        )}
                        <a
                          href={line.href}
                          className="text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors"
                        >
                          {line.text}
                        </a>
                      </li>
                    ) : (
                      <li key={i}>
                        {line.sub && (
                          <p className="text-[10px] text-slate-400 leading-none mb-0.5">{line.sub}</p>
                        )}
                        <p className="text-sm font-semibold text-slate-800">{line.text}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: form + map/social */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Message Form ── */}
          <div className="flex-1 min-w-0">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-md shadow-emerald-500/20">
                  <MessageSquare className="size-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Send a Message</h2>
                  <p className="text-xs text-slate-500">We reply within 24 hours</p>
                </div>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 mb-5 ring-8 ring-emerald-50/60">
                    <CheckCircle2 className="size-8 text-emerald-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName(""); setEmail(""); setSubject(""); setMessage("");
                    }}
                    className="mt-6 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputCls + " pl-11"}
                        />
                      </div>
                    </Field>

                    <Field label="Email Address" required>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputCls + " pl-11"}
                        />
                      </div>
                    </Field>
                  </div>

                  <Field label="Subject" required>
                    <div className="relative">
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        placeholder="What is your enquiry about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </Field>

                  <Field label="Message" required>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-4 top-4 size-4 text-slate-400" />
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        placeholder="Tell us how we can help you…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={inputCls + " pl-11 resize-none leading-relaxed"}
                      />
                    </div>
                  </Field>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    By submitting you agree to our{" "}
                    <span className="text-emerald-600 cursor-pointer hover:underline">Privacy Policy.</span>
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── Right: Map embed + Social ── */}
          <div className="w-full lg:w-[360px] shrink-0 space-y-6">

            {/* Embedded map */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
              <iframe
                title="Goha Hotel Gondar on Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.1234567!2d37.4643!3d12.6036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644a5d8e31a3d7b%3A0x1234567890abcdef!2sGoha%20Hotel%2C%20Gondar%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="bg-white px-5 py-4">
                <p className="text-sm font-semibold text-slate-800">Goha Hotel</p>
                <p className="text-xs text-slate-500 mt-0.5">Hilltop Ridge Area, Gondar, Amhara Region, Ethiopia</p>
                <a
                  href="https://maps.google.com/?q=Goha+Hotel+Gondar+Ethiopia"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Open in Google Maps
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            {/* Social / Connect */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-4">
                Follow Us
              </p>
              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <s.icon className="size-4 shrink-0" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick book */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 p-6 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.2),transparent_70%)]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 mb-2">
                Ready to Visit?
              </p>
              <p className="relative text-base font-bold text-white mb-4">
                Book your hilltop stay directly with us.
              </p>
              <Link
                href="/booking"
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
