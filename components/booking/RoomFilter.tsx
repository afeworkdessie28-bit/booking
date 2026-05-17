"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  SlidersHorizontal,
  RotateCcw,
  Tag,
  DollarSign,
  Users,
  Bed,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import type { RoomCategory, RoomVariant, RoomAmenity } from "@/data/rooms";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const categories: RoomCategory[] = [
  "Standard",
  "Deluxe",
  "Executive",
  "Suite",
  "Family",
];

const variants: RoomVariant[] = [
  "Single",
  "Double",
  "Twin",
  "King",
  "Queen",
  "Family",
  "Connecting",
  "Presidential",
];

const amenityOptions: RoomAmenity[] = [
  "WiFi",
  "Breakfast Included",
  "Air Conditioning",
  "Balcony",
  "Lake View",
  "City View",
  "Garden View",
  "Workspace",
  "Bathtub",
  "Living Room",
  "Lounge Access",
  "Mini Bar",
  "Smart TV",
];

const priceTiers = [
  { label: "All", min: 0, max: Infinity },
  { label: "Budget", min: 0, max: 100 },
  { label: "Mid‑Range", min: 100, max: 200 },
  { label: "Premium", min: 200, max: 500 },
];

const guestPresets = [
  { label: "Any", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

/* ------------------------------------------------------------------ */
/*  Exported filter state type                                         */
/* ------------------------------------------------------------------ */

export interface RoomFilterState {
  categories: RoomCategory[];
  variants: RoomVariant[];
  amenities: RoomAmenity[];
  priceTierIndex: number;
  minGuests: number;
}

export const defaultFilters: RoomFilterState = {
  categories: [],
  variants: [],
  amenities: [],
  priceTierIndex: 0,
  minGuests: 0,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value];
}

function countActive(f: RoomFilterState): number {
  return (
    f.categories.length +
    f.variants.length +
    f.amenities.length +
    (f.priceTierIndex > 0 ? 1 : 0) +
    (f.minGuests > 0 ? 1 : 0)
  );
}

/* ------------------------------------------------------------------ */
/*  Sub‑components                                                     */
/* ------------------------------------------------------------------ */

function Section({
  icon: Icon,
  label,
  defaultOpen = true,
  children,
}: {
  icon: React.ElementType;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 py-2 text-left cursor-pointer group"
      >
        <span className="flex items-center gap-2.5">
          <Icon className="size-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-950 transition-colors">
            {label}
          </span>
        </span>
        <ChevronDown
          className={`size-4 text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/10"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

interface RoomFilterProps {
  filters: RoomFilterState;
  onChange: (next: RoomFilterState) => void;
  resultCount?: number;
}

export default function RoomFilter({
  filters,
  onChange,
  resultCount,
}: RoomFilterProps) {
  const activeCount = countActive(filters);

  const update = useCallback(
    (patch: Partial<RoomFilterState>) => onChange({ ...filters, ...patch }),
    [filters, onChange],
  );

  const reset = useCallback(
    () => onChange(defaultFilters),
    [onChange],
  );

  /* ---- Mobile dropdown state ---- */
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) =>
    setActiveDropdown((cur) => (cur === name ? null : name));
  const closeDropdown = () => setActiveDropdown(null);

  /* ---- Shared filter body (desktop sidebar) ---- */
  const filterBody = (
    <div className="space-y-6">
      {/* Category */}
      <Section icon={Tag} label="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              active={filters.categories.includes(cat)}
              onClick={() =>
                update({ categories: toggle(filters.categories, cat) })
              }
            >
              {cat}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Variant / Bed Type */}
      <Section icon={Bed} label="Bed Type">
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <Chip
              key={v}
              active={filters.variants.includes(v)}
              onClick={() =>
                update({ variants: toggle(filters.variants, v) })
              }
            >
              {v}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Guests */}
      <Section icon={Users} label="Guests">
        <div className="flex flex-wrap gap-2">
          {guestPresets.map((g) => (
            <Chip
              key={g.label}
              active={filters.minGuests === g.value}
              onClick={() => update({ minGuests: g.value })}
            >
              {g.label === "Any" ? "Any" : `${g.label}${g.value >= 4 ? "+" : ""}`}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Amenities */}
      <Section icon={Sparkles} label="Amenities" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((a) => (
            <Chip
              key={a}
              active={filters.amenities.includes(a)}
              onClick={() =>
                update({ amenities: toggle(filters.amenities, a) })
              }
            >
              {a}
            </Chip>
          ))}
        </div>
      </Section>

      {/* Price Tier */}
      <Section icon={DollarSign} label="Price Range">
        <div className="flex flex-wrap gap-2">
          {priceTiers.map((tier, i) => (
            <Chip
              key={tier.label}
              active={filters.priceTierIndex === i}
              onClick={() => update({ priceTierIndex: i })}
            >
              {tier.label}
            </Chip>
          ))}
        </div>
      </Section>
    </div>
  );

  /* ---- Mobile filter dropdown definitions ---- */
  const mobileFilterDefs = [
    {
      key: "category",
      label: "Category",
      icon: Tag,
      hasActive: filters.categories.length > 0,
      activeCount: filters.categories.length,
    },
    {
      key: "bedType",
      label: "Bed Type",
      icon: Bed,
      hasActive: filters.variants.length > 0,
      activeCount: filters.variants.length,
    },
    {
      key: "guests",
      label: "Guests",
      icon: Users,
      hasActive: filters.minGuests > 0,
      activeCount: filters.minGuests > 0 ? 1 : 0,
    },
    {
      key: "amenities",
      label: "Amenities",
      icon: Sparkles,
      hasActive: filters.amenities.length > 0,
      activeCount: filters.amenities.length,
    },
    {
      key: "price",
      label: "Price",
      icon: DollarSign,
      hasActive: filters.priceTierIndex > 0,
      activeCount: filters.priceTierIndex > 0 ? 1 : 0,
    },
  ];

  /* ---- Active filter chips for mobile bar ---- */
  const activeChips: { key: string; label: string; onClear: () => void }[] = [
    ...filters.categories.map((c) => ({
      key: `cat-${c}`,
      label: c,
      onClear: () => update({ categories: toggle(filters.categories, c) }),
    })),
    ...filters.variants.map((v) => ({
      key: `var-${v}`,
      label: v,
      onClear: () => update({ variants: toggle(filters.variants, v) }),
    })),
    ...(filters.minGuests > 0
      ? [
          {
            key: "guests",
            label: `${filters.minGuests}${filters.minGuests >= 4 ? "+" : ""} Guest${filters.minGuests !== 1 ? "s" : ""}`,
            onClear: () => update({ minGuests: 0 }),
          },
        ]
      : []),
    ...filters.amenities.map((a) => ({
      key: `amen-${a}`,
      label: a,
      onClear: () => update({ amenities: toggle(filters.amenities, a) }),
    })),
    ...(filters.priceTierIndex > 0
      ? [
          {
            key: "price",
            label: priceTiers[filters.priceTierIndex].label,
            onClear: () => update({ priceTierIndex: 0 }),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* ============================================================ */}
      {/*  DESKTOP — sticky independently‑scrolling sidebar            */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-col sticky top-[74px] self-start h-[calc(100vh-74px)] w-[320px] shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <SlidersHorizontal className="size-4 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            {activeCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-none">
          {filterBody}
        </div>

        {/* Footer */}
        {typeof resultCount === "number" && (
          <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 text-center">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
              room{resultCount !== 1 ? "s" : ""} found
            </p>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/*  MOBILE — sticky horizontal bar below navbar                  */}
      {/* ============================================================ */}
      <div ref={mobileBarRef} className="lg:hidden sticky top-[58px] z-40 -mx-5 bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-sm">
        {/* Top row: filter icon + scrollable pills + optional reset */}
        <div className="flex items-center gap-2 px-4 py-2.5">
          {/* Filter icon */}
          <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-200/70 mr-1">
            <SlidersHorizontal className="size-3.5 text-slate-500" />
            {activeCount > 0 && (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>

          {/* Scrollable filter pills */}
          <div className="flex-1 overflow-x-auto scrollbar-none">
            <div className="flex gap-2 min-w-max pr-2">
              {mobileFilterDefs.map((def) => (
                <button
                  key={def.key}
                  type="button"
                  onClick={() => toggleDropdown(def.key)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    def.hasActive
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : activeDropdown === def.key
                        ? "border-slate-400 bg-slate-100 text-slate-800"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <def.icon className="size-3" />
                  {def.label}
                  {def.activeCount > 0 && (
                    <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white">
                      {def.activeCount}
                    </span>
                  )}
                  <ChevronDown
                    className={`size-3 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === def.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="shrink-0 ml-1 text-[11px] font-medium text-rose-500 hover:text-rose-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active filter chips row */}
        {activeChips.length > 0 && (
          <div className="px-4 pb-2.5 overflow-x-auto scrollbar-none">
            <div className="flex gap-1.5 min-w-max">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.onClear}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-slate-300 bg-slate-900 text-white px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="size-2.5" />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown panel — fixed below the visually stuck bar */}
        {activeDropdown && (
          <>
            {/* Invisible backdrop to close on tap outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={closeDropdown}
            />

            <div
              className="fixed left-0 right-0 z-50 border-b border-slate-200/70 bg-white shadow-lg max-h-[55vh] overflow-y-auto"
              style={{
                top: mobileBarRef.current
                  ? mobileBarRef.current.getBoundingClientRect().bottom
                  : 100,
              }}
            >
              <div className="px-4 py-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 capitalize">
                    {mobileFilterDefs.find((d) => d.key === activeDropdown)?.label}
                  </h3>
                  <button
                    type="button"
                    onClick={closeDropdown}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* Category dropdown */}
                {activeDropdown === "category" && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Chip
                        key={cat}
                        active={filters.categories.includes(cat)}
                        onClick={() =>
                          update({ categories: toggle(filters.categories, cat) })
                        }
                      >
                        {cat}
                      </Chip>
                    ))}
                  </div>
                )}

                {/* Bed Type dropdown */}
                {activeDropdown === "bedType" && (
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => (
                      <Chip
                        key={v}
                        active={filters.variants.includes(v)}
                        onClick={() =>
                          update({ variants: toggle(filters.variants, v) })
                        }
                      >
                        {v}
                      </Chip>
                    ))}
                  </div>
                )}

                {/* Guests dropdown */}
                {activeDropdown === "guests" && (
                  <div className="flex flex-wrap gap-2">
                    {guestPresets.map((g) => (
                      <Chip
                        key={g.label}
                        active={filters.minGuests === g.value}
                        onClick={() => update({ minGuests: g.value })}
                      >
                        {g.label === "Any"
                          ? "Any"
                          : `${g.label}${g.value >= 4 ? "+" : ""} Guest${g.value !== 1 ? "s" : ""}`}
                      </Chip>
                    ))}
                  </div>
                )}

                {/* Amenities dropdown */}
                {activeDropdown === "amenities" && (
                  <div className="flex flex-wrap gap-2">
                    {amenityOptions.map((a) => (
                      <Chip
                        key={a}
                        active={filters.amenities.includes(a)}
                        onClick={() =>
                          update({ amenities: toggle(filters.amenities, a) })
                        }
                      >
                        {a}
                      </Chip>
                    ))}
                  </div>
                )}

                {/* Price dropdown */}
                {activeDropdown === "price" && (
                  <div className="flex flex-wrap gap-2">
                    {priceTiers.map((tier, i) => (
                      <Chip
                        key={tier.label}
                        active={filters.priceTierIndex === i}
                        onClick={() => update({ priceTierIndex: i })}
                      >
                        {tier.label}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
