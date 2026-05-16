"use client";

import { useState } from "react";
import { CalendarDays, Users, ChevronDown, Search } from "lucide-react";

export default function BookingBar() {
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="relative z-40 w-full px-3 sm:px-4 transition-all duration-300 md:sticky md:top-[90px]">
      <div className="mx-auto mt-0 max-w-7xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:rounded-[2rem]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Check In */}
            <button className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 text-left shadow-sm transition-all duration-200 hover:bg-white hover:shadow-lg sm:gap-4 sm:p-5">
              {/* Separator */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-slate-200 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-10 lg:w-px lg:-translate-y-1/2" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-200 group-hover:rounded-3xl group-hover:bg-slate-900 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                <CalendarDays size={20} className="sm:hidden" />
                <CalendarDays size={22} className="hidden sm:block" />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  Check In
                </span>

                <span className="mt-0.5 text-sm font-semibold text-slate-900 sm:mt-1 sm:text-base">
                  Select Date
                </span>
              </div>
            </button>

            {/* Check Out */}
            <button className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 text-left shadow-sm transition-all duration-200 hover:bg-white hover:shadow-lg sm:gap-4 sm:p-5">
              {/* Separator */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-slate-200 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-10 lg:w-px lg:-translate-y-1/2" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-200 group-hover:rounded-3xl group-hover:bg-slate-900 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                <CalendarDays size={20} className="sm:hidden" />
                <CalendarDays size={22} className="hidden sm:block" />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  Check Out
                </span>

                <span className="mt-0.5 text-sm font-semibold text-slate-900 sm:mt-1 sm:text-base">
                  Select Date
                </span>
              </div>
            </button>

            {/* Adults */}
            <div className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-lg sm:gap-4 sm:p-5">
              {/* Separator */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-slate-200 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-10 lg:w-px lg:-translate-y-1/2" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-200 group-hover:rounded-3xl group-hover:bg-slate-900 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                <Users size={20} className="sm:hidden" />
                <Users size={22} className="hidden sm:block" />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  Adults
                </span>

                <div className="relative mt-1">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-semibold text-slate-900 outline-none sm:text-base"
                  >
                    {numbers.map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Adult" : "Adults"}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Kids */}
            <div className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-lg sm:gap-4 sm:p-5">
              {/* Separator */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-slate-200 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-10 lg:w-px lg:-translate-y-1/2" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm transition-all duration-200 group-hover:rounded-3xl group-hover:bg-slate-900 group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                <Users size={20} className="sm:hidden" />
                <Users size={22} className="hidden sm:block" />
              </div>

              <div className="flex flex-1 flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                  Kids
                </span>

                <div className="relative mt-1">
                  <select
                    value={kids}
                    onChange={(e) => setKids(Number(e.target.value))}
                    className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-semibold text-slate-900 outline-none sm:text-base"
                  >
                    {numbers.map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Kid" : "Kids"}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center p-3 sm:p-4">
              <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 px-4 text-xs font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/30 sm:h-14 sm:gap-3 sm:rounded-2xl sm:px-6 sm:text-sm">
                <Search size={16} className="sm:hidden" />
                <Search size={18} className="hidden sm:block" />
                Search Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
