"use client";

import React, { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  Clock,
  BedDouble,
  Sparkles,
  Send,
} from "lucide-react";
import DateWheelPicker, {
  DateValue,
} from "@/components/booking/DateWheelPicker";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const roomTypes = [
  { value: "standard-twin", label: "Standard Twin Room", price: 85 },
  { value: "standard-double", label: "Standard Double Room", price: 90 },
  { value: "deluxe-king", label: "Deluxe King Room", price: 135 },
  { value: "family-suite", label: "Family Suite", price: 160 },
  { value: "presidential-suite", label: "Presidential Suite", price: 280 },
];

const guestCounts = Array.from({ length: 6 }, (_, i) => i + 1);

const today = new Date();
const defaultCheckIn: DateValue = {
  day: today.getDate(),
  month: today.toLocaleString("en", { month: "short" }),
  year: today.getFullYear(),
};
const defaultCheckOut: DateValue = {
  day: Math.min(today.getDate() + 2, 28),
  month: today.toLocaleString("en", { month: "short" }),
  year: today.getFullYear(),
};

/* ------------------------------------------------------------------ */
/*  Small helper: labelled input                                       */
/* ------------------------------------------------------------------ */
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

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20";

/* ------------------------------------------------------------------ */
/*  Date trigger button                                                */
/* ------------------------------------------------------------------ */
function DateTrigger({
  label,
  value,
  onClick,
}: {
  label: string;
  value: DateValue;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-left transition-all hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 active:translate-y-0 active:shadow-sm"
    >
      <CalendarDays className="size-4 text-emerald-500 shrink-0" />
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          {label}
        </span>
        <span className="text-sm font-semibold text-slate-900">
          {value.day} {value.month} {value.year}
        </span>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Success state                                                      */
/* ------------------------------------------------------------------ */
function SuccessCard({ quick }: { quick: boolean }) {
  return (
    <div className="flex flex-col items-center py-16 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 mb-6 ring-8 ring-emerald-50/60">
        <CheckCircle2 className="size-10 text-emerald-500" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Request Received!
      </h2>
      <p className="max-w-sm text-sm text-slate-500 leading-relaxed mb-8">
        {quick
          ? "Thank you! Our team will reach out to confirm your booking details shortly."
          : "Thank you for your reservation request. We'll confirm availability and send a full itinerary to your email within 24 hours."}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact info sidebar card                                          */
/* ------------------------------------------------------------------ */
function ContactSidebar() {
  return (
    <div className="space-y-6">
      {/* Hotel Info Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-md shadow-emerald-500/20">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Goha Hotel</p>
            <p className="text-xs text-slate-500">Gondar, Ethiopia</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <MapPin className="size-3.5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Address</p>
              <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                123 Goha Street, Gondar<br />
                Amhara Region, Ethiopia
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <Phone className="size-3.5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Phone</p>
              <a
                href="tel:+251912345678"
                className="mt-0.5 text-xs text-emerald-600 hover:underline"
              >
                +251 912 345 678
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <Mail className="size-3.5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Email</p>
              <a
                href="mailto:hello@goha-hotel.com"
                className="mt-0.5 text-xs text-emerald-600 hover:underline"
              >
                hello@goha-hotel.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <Clock className="size-3.5 text-slate-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">Check-in / Check-out</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Check-in from 2:00 PM<br />
                Check-out by 12:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why book direct */}
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 mb-4">
          Why Book Direct?
        </p>
        <ul className="space-y-3">
          {[
            "Best rate guarantee",
            "Free cancellation up to 48 hrs",
            "Complimentary airport pickup",
            "Room upgrade when available",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              <span className="text-xs text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page (inner — needs Suspense wrapper for useSearchParams)     */
/* ------------------------------------------------------------------ */
function BookingForm() {
  const params = useSearchParams();
  // "home" = came from BookingBar quick search → short form
  // "room" = came from room card → pre-selected room, dates, no room selector
  // anything else (or missing) = full form
  const isQuick = params.get("from") === "home";
  const isFromRoom = params.get("from") === "room";

  const showDates = !isQuick;
  const showRoomType = !isQuick && !isFromRoom;
  const showGuests = !isQuick && !isFromRoom;

  /* --- form state --- */
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [roomType, setRoomType] = useState(params.get("roomType") || roomTypes[0].value);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState<DateValue>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<DateValue>(defaultCheckOut);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* --- date picker state --- */
  const [draftDate, setDraftDate] = useState<DateValue>(defaultCheckIn);
  const [pickerFor, setPickerFor] = useState<"checkIn" | "checkOut" | null>(null);

  const openPicker = (which: "checkIn" | "checkOut") => {
    setDraftDate(which === "checkIn" ? checkIn : checkOut);
    setPickerFor(which);
  };
  const confirmDate = useCallback(
    (v: DateValue) => {
      if (pickerFor === "checkIn") setCheckIn(v);
      else if (pickerFor === "checkOut") setCheckOut(v);
      setPickerFor(null);
    },
    [pickerFor],
  );

  /* --- submit --- */
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
      {/* ---- Hero strip ---- */}
      <div className="relative overflow-hidden border-b border-slate-200/60 bg-white">
        {/* Decorative gradient orb */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400/8 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:py-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-5"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1.5">
                {isQuick ? "Quick Reservation" : isFromRoom ? "Complete Booking" : "Full Reservation"}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {isQuick ? "Reserve Your Stay" : "Book Your Room"}
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-xl leading-relaxed">
                {isQuick
                  ? "Tell us a bit about yourself and we'll get in touch to finalise your stay at Goha Hotel, Gondar."
                  : isFromRoom
                  ? "Select your dates and provide your details to reserve this room."
                  : "Fill in your preferences below and our team will confirm your reservation within 24 hours."}
              </p>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 shrink-0">
              <BedDouble className="size-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-800">82 Rooms Available</p>
                <p className="text-[10px] text-emerald-600">Gondar, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Main content ---- */}
      <div className="mx-auto max-w-7xl px-5 py-10">
        {submitted ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
            <SuccessCard quick={isQuick} />
          </div>
        ) : (
          <div className={`flex gap-10 ${isQuick ? "max-w-2xl mx-auto" : ""}`}>
            {/* ===== FORM ===== */}
            <div className="flex-1 min-w-0">
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5 space-y-6"
              >
                {/* ----- Conditional form fields ----- */}
                {showRoomType && (
                  <Field label="Room Type" required>
                    <div className="relative">
                      <BedDouble className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 cursor-pointer"
                      >
                        {roomTypes.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label} — ${r.price}/night
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    </div>
                  </Field>
                )}

                {showDates && (
                  <div className="grid grid-cols-2 gap-4">
                      <Field label="Check-in" required>
                        <DateTrigger
                          label="Check-in"
                          value={checkIn}
                          onClick={() => openPicker("checkIn")}
                        />
                      </Field>
                      <Field label="Check-out" required>
                        <DateTrigger
                          label="Check-out"
                          value={checkOut}
                          onClick={() => openPicker("checkOut")}
                        />
                      </Field>
                    </div>
                )}

                {showGuests && (
                  <>
                    <Field label="Guests" required>
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-10 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 cursor-pointer"
                        >
                          {guestCounts.map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      </div>
                    </Field>
                    <div className="h-px bg-slate-100" />
                  </>
                )}

                {/* ----- Shared: contact fields ----- */}
                <Field label="Email Address" required>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-500" />
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls + " pl-11"}
                    />
                  </div>
                </Field>

                <Field label="Phone Number (optional)">
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="+251 912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls + " pl-11"}
                    />
                  </div>
                </Field>

                <Field label="Message / Special Requests">
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-4 top-4 size-4 text-slate-400" />
                    <textarea
                      id="booking-message"
                      rows={4}
                      placeholder={
                        isQuick
                          ? "Tell us your preferred dates, room type, or anything else…"
                          : "Any special requests, dietary requirements, accessibility needs…"
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={inputCls + " pl-11 resize-none leading-relaxed"}
                    />
                  </div>
                </Field>

                {/* Privacy notice */}
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  By submitting this form you agree to our{" "}
                  <span className="text-emerald-600 cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  . We'll only use your details to process your booking.
                </p>

                {/* Submit */}
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
                      {isQuick ? "Send Reservation Request" : "Confirm Booking Request"}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ===== SIDEBAR (full form only) ===== */}
            {!isQuick && (
              <aside className="hidden lg:block w-[320px] shrink-0">
                <ContactSidebar />
              </aside>
            )}
          </div>
        )}

        {/* Mobile contact sidebar (full form only, below form) */}
        {!isQuick && !submitted && (
          <div className="lg:hidden mt-8">
            <ContactSidebar />
          </div>
        )}
      </div>

      {/* Date Wheel Picker */}
      {pickerFor !== null && (
        <DateWheelPicker
          open
          value={draftDate}
          onChange={setDraftDate}
          onClose={() => setPickerFor(null)}
          onConfirm={confirmDate}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Suspense wrapper — required by Next.js for useSearchParams()       */
/* ------------------------------------------------------------------ */
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BookingForm />
    </Suspense>
  );
}
