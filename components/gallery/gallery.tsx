"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  folder: string;
  title?: string;
};

function prettyName(filename: string) {
  const name = filename.replace(/\.[^.]+$/, "");

  return name
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Untitled\b/i, "")
    .trim();
}

export default function Gallery({ images, folder, title = "Gallery" }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.75;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const openImage = (img: string) => {
    setActiveItem({
      src: `/${folder}/${img}`,
      alt: prettyName(img) || "Goha View",
    });
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2 sm:px-6">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-full border border-slate-200/60 bg-slate-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm">
              Goha Hotel Collection
            </span>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-4">
              {title}
            </h2>

            <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
              Immerse yourself in our beautifully designed spaces. Elegant
              details, refined comfort, and memorable experiences crafted for
              every stay.
            </p>
          </div>

          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg sm:w-auto w-full">
            View Collection
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Gallery Carousel */}
        <div className="relative group/gallery w-full">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 sm:-left-6 top-[calc(50%-1.5rem)] z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 sm:p-4 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 sm:-right-6 top-[calc(50%-1.5rem)] z-20 -translate-y-1/2 rounded-full bg-white/95 p-3 sm:p-4 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl opacity-100 sm:opacity-0 sm:group-hover/gallery:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>

          {/* Masked Container for blurred edges */}
          <div
            className="w-full overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%)",
            }}
          >
            {/* Scrollable Area */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory px-6 sm:px-10 pb-12 pt-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img) => {
                const displayName = prettyName(img) || "Goha View";
                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => openImage(img)}
                    aria-label={`View full image of ${displayName}`}
                    className="group/card relative h-[400px] w-[85vw] sm:h-[500px] sm:w-[380px] md:w-[440px] shrink-0 snap-center sm:snap-start overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,23,42,0.15)]"
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      <img
                        src={`/${folder}/${img}`}
                        alt={displayName}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                      />
                      {/* Premium dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover/card:opacity-90" />
                    </div>

                    {/* Card Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="flex items-end justify-between gap-4 translate-y-4 transition-transform duration-500 ease-out group-hover/card:translate-y-0">
                        <div className="flex-1 min-w-0">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 group-hover/card:text-emerald-400">
                            Goha Hotel
                          </p>
                          <h3 className="text-2xl font-semibold text-white tracking-wide truncate">
                            {displayName}
                          </h3>
                        </div>

                        {/* Hover Action Button */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 group-hover/card:bg-white group-hover/card:text-slate-900 group-hover/card:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                          <ArrowUpRight size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white transition hover:bg-white hover:text-slate-900"
              aria-label="Close image preview"
            >
              <X size={20} />
            </button>
            <div className="relative h-[72vh] w-full sm:h-[80vh] bg-slate-900">
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="border-t border-white/10 bg-slate-950/90 px-6 py-5 text-white">
              <p className="text-base font-medium">{activeItem.alt}</p>
            </div>
          </div>
        </div>
      ) : null}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `,
        }}
      />
    </section>
  );
}
