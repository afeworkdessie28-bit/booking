"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Users, Wifi, Star, Heart, X } from "lucide-react";

export interface RoomCardProps {
  id?: string | number;
  title: string;
  subtitle?: string;
  image: string; // path under /public or external
  price: number | string;
  currency?: string;
  rating?: number; // 0-5
  reviews?: number;
  features?: string[];
  href?: string; // link to room details
  reserveHref?: string; // link for reserve button
  onReserve?: () => void;
}

export default function RoomCard({
  id,
  title,
  subtitle,
  image,
  price,
  currency = "USD",
  rating = 0,
  reviews = 0,
  features = [],
  href = "#",
  reserveHref = "/booking",
  onReserve,
}: RoomCardProps) {
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <article className="group bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div
        className="relative w-full aspect-[4/3] bg-gray-100 cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />

        <button
          aria-label="Toggle favorite"
          onClick={(e) => {
            e.stopPropagation();
            setFav((s) => !s);
          }}
          className="absolute left-3 top-3 z-20 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/80 backdrop-blur hover:bg-white p-1 shadow"
        >
          <Heart
            className={`h-5 w-5 ${fav ? "text-rose-600" : "text-gray-600"}`}
          />
        </button>

        <div className="absolute right-3 top-3 flex flex-col items-end gap-2 sm:gap-0">
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1 text-sm font-semibold shadow">
            <Star className="h-4 w-4 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-zinc-500 font-normal">({reviews})</span>
          </div>
        </div>

        <div className="absolute left-0 bottom-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute left-4 bottom-4 z-20 text-white">
          <div className="text-2xl font-bold leading-tight">{title}</div>
          {subtitle && <div className="text-sm opacity-90">{subtitle}</div>}
        </div>

        <div className="absolute right-4 bottom-4 z-20 text-right">
          <div className="bg-white/95 text-zinc-900 px-3 py-2 rounded-2xl font-semibold">
            <span className="text-xl">
              {currency === "USD" ? "$" : ""}
              {price}
            </span>
            <div className="text-xs text-zinc-600">per night</div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {features.slice(0, 5).map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-700 rounded-full px-3 py-1 text-xs"
                >
                  {f.toLowerCase().includes("bed") ? (
                    <Bed className="h-3 w-3 text-zinc-500" />
                  ) : f.toLowerCase().includes("wifi") ? (
                    <Wifi className="h-3 w-3 text-zinc-500" />
                  ) : f.toLowerCase().includes("guest") ||
                    f.toLowerCase().includes("occup") ? (
                    <Users className="h-3 w-3 text-zinc-500" />
                  ) : (
                    <span className="h-3 w-3" />
                  )}
                  <span>{f}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:underline"
            >
              View
            </Link>
            <Link
              href={reserveHref}
              className="rounded-full bg-rose-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-rose-700"
            >
              Reserve
            </Link>
          </div>
        </div>
      </div>

      {/* Modal preview */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-30 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-white/90 shadow"
              aria-label="Close preview"
            >
              <X className="h-5 w-5 text-zinc-700" />
            </button>

            <div className="relative w-full h-[60vh] bg-gray-100">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain bg-black"
                sizes="100vw"
              />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{title}</h4>
                  {subtitle && (
                    <p className="text-sm text-zinc-600">{subtitle}</p>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold">
                    {currency === "USD" ? "$" : ""}
                    {price}
                  </div>
                  <div className="text-sm text-zinc-500">per night</div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-600">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="opacity-80">({reviews} reviews)</span>
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  href={reserveHref}
                  className="rounded-full bg-rose-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-rose-700"
                >
                  Reserve
                </Link>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
