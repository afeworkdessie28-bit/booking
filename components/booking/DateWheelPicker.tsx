"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type DateValue = {
  day: number;
  month: string;
  year: number;
};

type Props = {
  open: boolean;
  title?: string;
  value: DateValue;
  onClose: () => void;
  onChange: (value: DateValue) => void;
  onConfirm: (value: DateValue) => void;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const years = Array.from({ length: 16 }, (_, i) => 2020 + i);

const ITEM_HEIGHT = 52;
const WHEEL_HEIGHT = 340;

// 🔥 allows first/last item to reach center selection zone
const SPACER_HEIGHT = WHEEL_HEIGHT / 2 - ITEM_HEIGHT / 2;

const createDays = (monthIndex: number, year: number) => {
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const isLeap = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

  const length = monthIndex === 1 && isLeap ? 29 : monthLengths[monthIndex];

  return Array.from({ length }, (_, i) => i + 1);
};

export default function DateWheelPicker({
  open,
  title,
  value,
  onClose,
  onChange,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<DateValue>(value);

  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const scrollTimeout = useRef<number | null>(null);

  const dayItems = useMemo(
    () => createDays(months.indexOf(selected.month), selected.year),
    [selected.month, selected.year],
  );

  const handleScroll = (
    wheel: HTMLDivElement | null,
    type: "day" | "month" | "year",
  ) => {
    if (!wheel) return;

    if (scrollTimeout.current) {
      window.clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = window.setTimeout(() => {
      const itemNodes = wheel.querySelectorAll<HTMLElement>("[data-item]");
      const items = Array.from(itemNodes);

      const rect = wheel.getBoundingClientRect();
      const center = rect.top + rect.height / 2;

      let closest: HTMLElement | null = null;
      let minDist = Infinity;

      for (const item of items) {
        const r = item.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(center - c);

        if (d < minDist) {
          minDist = d;
          closest = item;
        }
      }

      if (!closest) return;

      const raw = closest.getAttribute("data-value");
      if (!raw) return;

      const next: DateValue = { ...selected };

      if (type === "day") next.day = Number(raw);
      if (type === "month") next.month = raw;
      if (type === "year") next.year = Number(raw);

      setSelected(next);
    }, 70);
  };

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 text-white">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
              Select Date
            </p>

            <h2 className="text-2xl font-semibold mt-2">{title || "Select Date"}</h2>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
          >
            Close
          </button>
        </div>

        {/* WHEELS */}
        <div className="flex justify-center gap-6 px-6 pb-6">
          {/* DAY */}
          <div className="relative w-[100px]">
            <div className="mb-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Day
              </p>
            </div>
            {/* selection zone */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-10">
              <div className="h-[52px] border-y border-cyan-400/30" />
            </div>

            <div
              ref={dayRef}
              onScroll={() => handleScroll(dayRef.current, "day")}
              className="h-[340px] overflow-y-scroll scroll-smooth text-center scrollbar-none"
              style={{ scrollSnapType: "y mandatory" }}
            >
              {/* TOP SPACER */}
              <div style={{ height: SPACER_HEIGHT }} />

              {dayItems.map((d) => (
                <div
                  key={d}
                  data-item
                  data-value={d}
                  style={{ scrollSnapAlign: "center" }}
                  className="h-[52px] flex items-center justify-center text-white/40 text-[18px]"
                >
                  {d}
                </div>
              ))}

              {/* BOTTOM SPACER */}
              <div style={{ height: SPACER_HEIGHT }} />
            </div>
          </div>

          {/* MONTH */}
          <div className="relative w-[100px]">
            <div className="mb-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Month
              </p>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-10">
              <div className="h-[52px] border-y border-cyan-400/30" />
            </div>

            <div
              ref={monthRef}
              onScroll={() => handleScroll(monthRef.current, "month")}
              className="h-[340px] overflow-y-scroll scroll-smooth text-center scrollbar-none"
              style={{ scrollSnapType: "y mandatory" }}
            >
              <div style={{ height: SPACER_HEIGHT }} />

              {months.map((m) => (
                <div
                  key={m}
                  data-item
                  data-value={m}
                  style={{ scrollSnapAlign: "center" }}
                  className="h-[52px] flex items-center justify-center text-white/40 text-[18px]"
                >
                  {m}
                </div>
              ))}

              <div style={{ height: SPACER_HEIGHT }} />
            </div>
          </div>

          {/* YEAR */}
          <div className="relative w-[100px]">
            <div className="mb-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Year
              </p>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-10">
              <div className="h-[52px] border-y border-cyan-400/30" />
            </div>

            <div
              ref={yearRef}
              onScroll={() => handleScroll(yearRef.current, "year")}
              className="h-[340px] overflow-y-scroll scroll-smooth text-center scrollbar-none"
              style={{ scrollSnapType: "y mandatory" }}
            >
              <div style={{ height: SPACER_HEIGHT }} />

              {years.map((y) => (
                <div
                  key={y}
                  data-item
                  data-value={y}
                  style={{ scrollSnapAlign: "center" }}
                  className="h-[52px] flex items-center justify-center text-white/40 text-[18px]"
                >
                  {y}
                </div>
              ))}

              <div style={{ height: SPACER_HEIGHT }} />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-white/10 text-white/70">
          <div>
            Selected:{" "}
            <span className="text-white font-semibold">
              {selected.day} {selected.month} {selected.year}
            </span>
          </div>

          <button
            onClick={() => {
              onConfirm(selected);
              onClose();
            }}
            className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* 🔥 hide scrollbars */}
      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
