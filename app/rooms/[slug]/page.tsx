import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bed, Users, Wifi, Star, Check } from "lucide-react";
import { gohaHotelRoomsDatabase } from "@/data/rooms";

interface RoomDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return gohaHotelRoomsDatabase.map((room) => ({
    slug: room.slug,
  }));
}

export default async function RoomDetailsPage({ params }: RoomDetailsPageProps) {
  const { slug } = await params;
  const room = gohaHotelRoomsDatabase.find((room) => room.slug === slug);

  if (!room) {
    notFound();
  }

  const heroImage = room.images?.[0] ?? room.thumbnail;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
        >
          <ArrowLeft className="size-4" />
          Back to rooms
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">
          <section className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="relative h-[420px] sm:h-[520px]">
                <Image
                  src={heroImage}
                  alt={room.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-600">
                    {room.category} {room.variant}
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    {room.name}
                  </h1>
                </div>
                <div className="rounded-3xl bg-slate-950 px-5 py-4 text-right text-white shadow-xl">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    Starting from
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {room.currency === "USD" ? "$" : "ETB"}
                    {room.pricePerNight}
                  </p>
                  <p className="text-sm text-slate-300">per night</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
                <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    About this room
                  </p>
                  <p className="text-base leading-7 text-slate-700">
                    {room.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Guests
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {room.guests} guest{room.guests > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Bed type
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {room.beds}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Room size
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {room.size ?? 38} m²
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Floor
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {room.floor ?? 1}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Key highlights
                  </p>
                  <div className="mt-5 space-y-3">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-sm"
                      >
                        <Check className="size-4 text-emerald-600" />
                        <span className="text-sm text-slate-700">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Room status
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-950">
                    {room.available ? "Available now" : "Currently unavailable"}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                  {room.category}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                  <span className="text-sm text-slate-500">Reviews</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Star className="size-4 text-amber-400" />
                    {room.rating?.toFixed(1) ?? "4.0"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                  <span className="text-sm text-slate-500">Guest rating</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {room.reviewsCount ?? 0} reviews
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                  <span className="text-sm text-slate-500">Room type</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {room.variant}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href={`/booking?from=room&roomType=${room.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700"
                >
                  Reserve this room
                </Link>
                <Link
                  href="/rooms"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View all rooms
                </Link>
              </div>
            </div>

            {room.images.length > 1 ? (
              <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Gallery
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {room.images.slice(1).map((src) => (
                    <div
                      key={src}
                      className="relative h-40 overflow-hidden rounded-3xl bg-slate-100"
                    >
                      <Image
                        src={src}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 320px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  );
}
