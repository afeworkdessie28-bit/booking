"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import RoomFilter, {
  defaultFilters,
  type RoomFilterState,
} from "@/components/booking/RoomFilter";
import RoomCard from "@/components/rooms/RoomCard";
import { gohaHotelRoomsDatabase as allRooms } from "@/data/rooms";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

/* ------------------------------------------------------------------ */
/*  Scrollable Row Component                                          */
/* ------------------------------------------------------------------ */
interface RowScrollerProps {
  row: typeof allRooms;
  rowIndex: number;
  rowSize: number;
  roomImages: string[];
  roomType?: string;
}

function RowScroller({
  row,
  rowIndex,
  rowSize,
  roomImages,
  roomType,
}: RowScrollerProps) {
  const rowScrollRef = useRef<HTMLDivElement>(null);
  const [rowCanScrollLeft, setRowCanScrollLeft] = useState(false);
  const [rowCanScrollRight, setRowCanScrollRight] = useState(true);

  useEffect(() => {
    const el = rowScrollRef.current;
    if (!el) return;

    const check = () => {
      setRowCanScrollLeft(el.scrollLeft > 10);
      setRowCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 10,
      );
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, [row]);

  const scroll = (direction: "left" | "right") => {
    if (!rowScrollRef.current) return;
    const amount = rowScrollRef.current.clientWidth * 0.7;
    rowScrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="sm:hidden">
      {/* Row Type Header */}
      {roomType && (
        <div className="mb-4 px-2">
          <h3 className="text-base font-semibold text-slate-800">{roomType}</h3>
        </div>
      )}
      <div className="relative group/row">
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white cursor-pointer ${
            rowCanScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white cursor-pointer ${
            rowCanScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </button>

        {/* Blurred-edge mask */}
        <div
          className="w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Scrollable track */}
          <div
            ref={rowScrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-2 pb-4 pt-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {row.map((room, i) => (
              <div key={room.id} className="shrink-0 snap-center w-[75vw]">
                <RoomCard
                  title={room.name}
                  subtitle={`${room.category} · ${room.beds} · ${room.guests} guest${room.guests > 1 ? "s" : ""}`}
                  image={
                    roomImages[(rowIndex * rowSize + i) % roomImages.length]
                  }
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
                  reserveHref={`/booking?from=room&roomType=${room.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [filters, setFilters] = useState<RoomFilterState>(defaultFilters);

  /* ---------- filter logic ---------- */
  const filtered = useMemo(() => {
    const tier = priceTiers[filters.priceTierIndex] ?? priceTiers[0];

    return allRooms.filter((room) => {
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
  }, [filters]);

  /* Determine layout based on card count */
  const getRowConfig = (count: number) => {
    if (count > 40) return { rowSize: 10 };
    if (count > 20) return { rowSize: 8 };
    if (count > 10) return { rowSize: 5 };
    return { rowSize: 1 };
  };

  const { rowSize } = getRowConfig(filtered.length);
  const shouldShowHorizontalScroll = filtered.length > 10;

  /* Room type cycle for each row */
  const roomTypeCycle = [
    { category: "Standard", variant: "Twin" },
    { category: "Suite", variant: "Presidential" },
    { category: "Family", variant: "Family" },
    { category: "Deluxe", variant: "King" },
    { category: "Standard", variant: "Double" },
  ];

  /* Break cards into rows with cycling room types */
  const rows = [];
  for (let rowIndex = 0; rowIndex < filtered.length; rowIndex += rowSize) {
    const typeConfig =
      roomTypeCycle[(rowIndex / rowSize) % roomTypeCycle.length];
    const rowRooms = filtered
      .filter(
        (room) =>
          room.category === typeConfig.category &&
          room.variant === typeConfig.variant,
      )
      .slice(0, rowSize);

    if (rowRooms.length > 0) {
      rows.push({ rooms: rowRooms, typeConfig, rowIndex: rows.length });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero header */}
      <div className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:py-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1.5">
            Accommodation
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Our Rooms &amp; Suites
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-500 leading-relaxed">
            Discover 82 thoughtfully designed rooms and suites offering
            panoramic views of historic Gondar. Use the filters to find your
            perfect stay.
          </p>
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
      <div className="mx-auto max-w-7xl px-5 py-8 lg:py-0">
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
              <>
                {/* Desktop/Tablet Grid Layout - always shown on larger screens */}
                <div className="hidden sm:grid gap-6 grid-cols-2 xl:grid-cols-3">
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
                      reserveHref={`/booking?from=room&roomType=${room.slug}`}
                    />
                  ))}
                </div>

                {/* Mobile: Horizontal Scrolleable Rows (if > 10 cards) or vertical grid (if <= 10 cards) */}
                {shouldShowHorizontalScroll ? (
                  <div className="sm:hidden space-y-6">
                    {rows.map((rowData) => (
                      <RowScroller
                        key={`row-${rowData.rowIndex}`}
                        row={rowData.rooms}
                        rowIndex={rowData.rowIndex}
                        rowSize={rowSize}
                        roomImages={roomImages}
                        roomType={`${rowData.typeConfig.category} ${rowData.typeConfig.variant}`}
                      />
                    ))}
                  </div>
                ) : (
                  /* Mobile: Vertical Grid (if <= 10 cards) */
                  <div className="sm:hidden grid gap-4 grid-cols-1">
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
                        reserveHref={`/booking?from=room&roomType=${room.slug}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-5">
                  <ChevronRight className="size-6 text-slate-400" />
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
