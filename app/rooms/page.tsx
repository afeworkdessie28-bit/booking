"use client";

import React, { useState, useMemo } from "react";
import RoomFilter, {
  defaultFilters,
  type RoomFilterState,
} from "@/components/booking/RoomFilter";
import RoomCard from "@/components/rooms/RoomCard";
import { gohaHotelRoomsDatabase as allRooms } from "@/data/rooms";
import { Search } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Images mapped by index for the first batch of rooms                */
/* ------------------------------------------------------------------ */

const roomImages = [
  "/Rooms%20%26%20Suites/one.jpg",
  "/Rooms%20%26%20Suites/two.jpg",
  "/Rooms%20%26%20Suites/three.jpg",
  "/Rooms%20%26%20Suites/four.jpg",
  "/Rooms%20%26%20Suites/five.jpg",
  "/Rooms%20%26%20Suites/six.jpg",
  "/Rooms%20%26%20Suites/seven.jpg",
  "/Rooms%20%26%20Suites/eight.jpg",
  "/Rooms%20%26%20Suites/nine.jpg",
  "/Rooms%20%26%20Suites/ten.jpg",
  "/Rooms%20%26%20Suites/eleven.jpg",
  "/Rooms%20%26%20Suites/tweelve.jpg",
];

/* Price tier boundaries (matches the RoomFilter constants) */
const priceTiers = [
  { min: 0, max: Infinity },
  { min: 0, max: 100 },
  { min: 100, max: 200 },
  { min: 200, max: 500 },
];

export default function RoomsPage() {
  const [filters, setFilters] = useState<RoomFilterState>(defaultFilters);
  const [search, setSearch] = useState("");

  /* ---------- filter logic ---------- */
  const filtered = useMemo(() => {
    const tier = priceTiers[filters.priceTierIndex] ?? priceTiers[0];
    const q = search.trim().toLowerCase();

    return allRooms.filter((room) => {
      // text search
      if (
        q &&
        !room.name.toLowerCase().includes(q) &&
        !room.category.toLowerCase().includes(q) &&
        !room.variant.toLowerCase().includes(q) &&
        !room.description.toLowerCase().includes(q)
      )
        return false;

      // category
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(room.category)
      )
        return false;

      // variant
      if (
        filters.variants.length > 0 &&
        !filters.variants.includes(room.variant)
      )
        return false;

      // guests
      if (filters.minGuests > 0 && room.guests < filters.minGuests)
        return false;

      // amenities
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((a) => room.amenities.includes(a))
      )
        return false;

      // price
      if (room.pricePerNight < tier.min || room.pricePerNight > tier.max)
        return false;

      return true;
    });
  }, [filters, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero header */}
      <div className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-3">
            Accommodation
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Our Rooms &amp; Suites
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-500 sm:text-lg leading-relaxed">
            Discover 82 thoughtfully designed rooms and suites offering
            panoramic views of historic Gondar. Use the filters to find your
            perfect stay.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search rooms…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
            />
          </div>
        </div>
      </div>
      {/* Mobile filter bar — rendered outside the flex layout */}
      <div className="lg:hidden">
        <RoomFilter
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />
      </div>

      {/* Content: filter sidebar + room grid */}
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex gap-8">
          {/* Desktop filter sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <RoomFilter
              filters={filters}
              onChange={setFilters}
              resultCount={filtered.length}
            />
          </div>

          {/* Room grid */}
          <main className="flex-1 min-w-0 lg:h-[calc(100vh-74px)] lg:sticky lg:top-[74px] lg:overflow-y-auto lg:scrollbar-none py-8">
            {/* Results summary */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filtered.length}
                </span>{" "}
                of {allRooms.length} rooms
              </p>
              <p className="hidden sm:block text-xs text-slate-400">
                Sorted by: Recommended
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((room, i) => (
                  <RoomCard
                    key={room.id}
                    title={room.name}
                    subtitle={`${room.category} · ${room.beds} · ${room.guests} guest${room.guests > 1 ? "s" : ""}`}
                    image={roomImages[i % roomImages.length]}
                    price={room.pricePerNight}
                    currency={room.currency}
                    rating={room.rating ?? 4.2}
                    reviews={room.reviewsCount ?? 0}
                    features={[
                      room.beds,
                      `${room.guests} guests`,
                      ...room.amenities.slice(0, 2),
                    ]}
                    href={`/rooms/${room.slug}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-5">
                  <Search className="size-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                  No rooms found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Try adjusting your filters or search query to discover more
                  options.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilters(defaultFilters);
                    setSearch("");
                  }}
                  className="mt-5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
