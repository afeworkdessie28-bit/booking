import React from "react";
import Link from "next/link";
import {
  Phone,
  Smartphone,
  Printer,
  MapPin,
  Globe,
  ExternalLink,
  Mail,
  BedDouble,
  Info,
  MessageSquare,
  CalendarCheck,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book Now", href: "/booking" },
];

export default function Footer() {
  return (
    <footer className="mx-4 mb-4 mt-6 rounded-3xl border border-slate-200/70 bg-white/95 px-6 py-10 shadow-sm sm:mx-6 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Top: brand + columns */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-white shadow-lg shadow-fuchsia-500/25 overflow-hidden shrink-0">
                <img
                  src="/logo/logo-image.jpg"
                  alt="Goha Hotel logo"
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950">
                  GohaHotel
                </span>
                <span className="text-xs text-rose-500 font-medium">official</span>
              </div>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              A hilltop sanctuary in Gondar — where ancient castles meet panoramic horizons and warm Ethiopian hospitality.
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/explore/locations/284825813/goha-hotel-gondar-ethiopie/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-700"
                aria-label="Instagram"
              >
                <Globe size={15} />
              </a>
              <a
                href="https://web.facebook.com/p/Goha-Hotel-%E1%8C%8E%E1%88%83-%E1%88%86%E1%89%B4%E1%88%8D-100063693654371/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-700"
                aria-label="Facebook"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-700 transition hover:text-emerald-600"
                  >
                    {link.label === "Rooms & Suites" && <BedDouble size={13} className="text-slate-400" />}
                    {link.label === "About Us" && <Info size={13} className="text-slate-400" />}
                    {link.label === "Contact" && <MessageSquare size={13} className="text-slate-400" />}
                    {link.label === "Book Now" && <CalendarCheck size={13} className="text-slate-400" />}
                    {!["Rooms & Suites","About Us","Contact","Book Now"].includes(link.label) && (
                      <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </h4>
            <ul className="text-sm text-slate-700 space-y-3">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Phone size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Phone</div>
                  <a href="tel:+251581110634" className="font-medium hover:text-emerald-600 transition-colors">
                    +251 58 111 0634
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Smartphone size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Mobile</div>
                  <a href="tel:+251912679216" className="font-medium hover:text-emerald-600 transition-colors">
                    +251 912 679 216
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Printer size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Fax</div>
                  <span className="font-medium">+251 58 111 1920</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Mail size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Email</div>
                  <a href="mailto:hello@goha-hotel.com" className="font-medium hover:text-emerald-600 transition-colors">
                    hello@goha-hotel.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Address
            </h4>
            <div className="text-sm text-slate-700 space-y-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <MapPin size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Physical</div>
                  <div className="font-medium leading-snug">
                    Hilltop Ridge Area, Gondar<br />
                    Amhara Region, Ethiopia
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <MapPin size={14} />
                </span>
                <div>
                  <div className="text-[10px] text-slate-400">Postal</div>
                  <div className="font-medium">P.O. Box 182, Gondar, Ethiopia 6200</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-100 pt-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} GohaHotel — All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>P.O. Box 182 • Gondar • Ethiopia</span>
              <Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
