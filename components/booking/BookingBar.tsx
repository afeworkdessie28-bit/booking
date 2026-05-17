"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, ChevronDown, Search, Plus, Minus } from "lucide-react";
import DateWheelPicker, {
  DateValue,
} from "@/components/booking/DateWheelPicker";

export default function BookingBar() {
  const router = useRouter();
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [checkInDate, setCheckInDate] = useState<DateValue>({
    day: 21,
    month: "May",
    year: 2025,
  });
  const [checkOutDate, setCheckOutDate] = useState<DateValue>({
    day: 24,
    month: "May",
    year: 2025,
  });
  const [draftDate, setDraftDate] = useState<DateValue>(checkInDate);
  const [pickerOpenFor, setPickerOpenFor] = useState<
    "checkIn" | "checkOut" | null
  >(null);



  const formatDate = (date: DateValue) =>
    `${date.day} ${date.month} ${date.year}`;

  const openPicker = (type: "checkIn" | "checkOut") => {
    setDraftDate(type === "checkIn" ? checkInDate : checkOutDate);
    setPickerOpenFor(type);
  };

  const handleDateChange = (next: DateValue) => {
    setDraftDate(next);
  };

  const handleDateConfirm = (next: DateValue) => {
    if (pickerOpenFor === "checkIn") {
      setCheckInDate(next);
    } else if (pickerOpenFor === "checkOut") {
      setCheckOutDate(next);
    }
    setPickerOpenFor(null);
  };

  const closePicker = () => {
    setPickerOpenFor(null);
  };

  return (
    <section className="relative z-40 w-full px-3 sm:px-4 transition-all duration-300 md:sticky md:top-[90px]">
      <div className="mx-auto mt-0 max-w-7xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] backdrop-blur-2xl sm:rounded-[2rem]">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Check In */}
            <button
              type="button"
              onClick={() => openPicker("checkIn")}
              className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 active:translate-y-0 active:shadow-sm sm:gap-4 sm:p-5"
            >
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
                  {formatDate(checkInDate)}
                </span>
              </div>
            </button>

            {/* Check Out */}
            <button
              type="button"
              onClick={() => openPicker("checkOut")}
              className="group relative m-1 flex cursor-pointer items-center gap-3 rounded-3xl bg-white/90 p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10 active:translate-y-0 active:shadow-sm sm:gap-4 sm:p-5"
            >
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
                  {formatDate(checkOutDate)}
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

                <div className="relative mt-1.5 flex items-center gap-2.5 sm:mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAdults(Math.max(1, adults - 1));
                    }}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm hover:bg-emerald-500 hover:text-white hover:shadow-md transition-all active:scale-95"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-slate-900 min-w-[24px] text-center sm:text-base">{adults}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAdults(Math.min(10, adults + 1));
                    }}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm hover:bg-emerald-500 hover:text-white hover:shadow-md transition-all active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
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

                <div className="relative mt-1.5 flex items-center gap-2.5 sm:mt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setKids(Math.max(0, kids - 1));
                    }}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm hover:bg-emerald-500 hover:text-white hover:shadow-md transition-all active:scale-95"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-slate-900 min-w-[24px] text-center sm:text-base">{kids}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setKids(Math.min(6, kids + 1));
                    }}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 shadow-sm hover:bg-emerald-500 hover:text-white hover:shadow-md transition-all active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center p-3 sm:p-4">
              <button type="button" onClick={() => router.push("/booking?from=home")} className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 via-emerald-600 to-cyan-500 px-4 text-xs font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:rounded-3xl hover:shadow-2xl hover:shadow-cyan-500/30 sm:h-14 sm:gap-3 sm:rounded-2xl sm:px-6 sm:text-sm">
                <Search size={16} className="sm:hidden" />
                <Search size={18} className="hidden sm:block" />
                Search Rooms
              </button>
            </div>
          </div>
        </div>
      </div>
      {pickerOpenFor !== null && (
        <DateWheelPicker
          open={pickerOpenFor !== null}
          value={draftDate}
          onChange={handleDateChange}
          onClose={closePicker}
          onConfirm={handleDateConfirm}
        />
      )}
    </section>
  );
}
