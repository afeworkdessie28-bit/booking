"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Services", href: "/#services" },
  { label: "Location", href: "/#location" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
  { label: "About", href: "/#about" },
  { label: "Book now", href: "/#book" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-sm shadow-slate-900/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-white shadow-lg shadow-fuchsia-500/25 overflow-hidden">
            <img
              src="/logo/logo-image.jpg"
              alt="GohaHotel logo"
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

        <nav className="hidden items-center gap-1 md:flex">
          {links.slice(0, -1).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-100 hover:text-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={links[links.length - 1].href}
          className="hidden rounded-full bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:shadow-xl hover:shadow-cyan-500/30 md:inline-flex"
        >
          Book now
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm shadow-slate-900/10 transition hover:border-slate-300 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex h-5 w-5 flex-col justify-between">
            <span className="block h-0.5 w-full rounded-full bg-slate-900" />
            <span className="block h-0.5 w-full rounded-full bg-slate-900" />
            <span className="block h-0.5 w-full rounded-full bg-slate-900" />
          </div>
        </button>
      </div>

      {menuOpen ? (
        <div className="absolute inset-x-4 top-full rounded-3xl border border-slate-200/80 bg-white px-5 py-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Menu
            </p>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {links.slice(0, -1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-3xl px-5 py-4 text-base font-medium text-slate-900 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5">
            <Link
              href={links[links.length - 1].href}
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
            >
              Book now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
