"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Expand,
  Camera,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  images: string[];
  folder: string;
  title?: string;
  /** Gallery index to alternate layouts (0-indexed) */
  index?: number;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function prettyName(filename: string) {
  const name = filename.replace(/\.[^.]+$/, "");
  return name
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/Untitled\b/i, "")
    .trim();
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  folder,
  startIndex,
  onClose,
}: {
  images: string[];
  folder: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const img = images[index];
  const displayName = prettyName(img) || "Goha Hotel";

  const prev = useCallback(
    () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length],
  );

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl"
        onClick={onClose}
      />

      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      {/* Chrome */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <Camera className="size-4 text-white/80" />
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.25em]">
                {index + 1} <span className="text-white/30 mx-1">/</span>{" "}
                {images.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
            aria-label="Close"
          >
            <X className="size-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* Image area */}
        <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
          {/* Nav arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6 -ml-0.5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="size-6 -mr-0.5" strokeWidth={2.5} />
          </button>

          {/* Main image */}
          <div className="relative h-[60vh] sm:h-[70vh] w-full max-w-6xl overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-[0_20px_100px_rgba(0,0,0,0.8)] border border-white/5 ring-1 ring-white/10">
            <Image
              key={`${img}-${index}`}
              src={`/${folder}/${img}`}
              alt={displayName}
              fill
              className="object-contain bg-transparent animate-[fadeIn_400ms_ease-out]"
            />
          </div>
        </div>

        {/* Bottom caption */}
        <div className="flex items-center justify-center px-5 py-4 sm:py-6">
          <div className="text-center transform transition-all duration-300 translate-y-0">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-white/20" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
                Goha Collection
              </p>
              <div className="h-px w-6 bg-white/20" />
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white tracking-widest uppercase">
              {displayName || folder}
            </h3>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="px-4 pb-6 sm:pb-8 overflow-x-auto scrollbar-none mask-thumbnails">
          <div className="flex gap-3 justify-center min-w-max mx-auto p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
            {images.map((thumb, i) => (
              <button
                key={`${thumb}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-xl transition-all duration-500 cursor-pointer group/thumb ${
                  i === index
                    ? "ring-2 ring-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                <Image
                  src={`/${folder}/${thumb}`}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    i === index ? "scale-110" : "group-hover/thumb:scale-110"
                  }`}
                />
                {i !== index && (
                  <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .mask-thumbnails {
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Gallery Component                                             */
/* ------------------------------------------------------------------ */

export default function Gallery({
  images,
  folder,
  title = "Gallery",
  index = 0,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ---- Intersection Observer for reveal animation ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).dataset.card;
          if (key && entry.isIntersecting) {
            setVisibleCards((prev) =>
              prev[key] ? prev : { ...prev, [key]: true },
            );
          }
        });
      },
      { root: scrollRef.current, threshold: 0.15 },
    );

    const nodes =
      scrollRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    nodes?.forEach((node) => observer.observe(node));

    return () => {
      nodes?.forEach((node) => observer.unobserve(node));
      observer.disconnect();
    };
  }, [images]);

  /* ---- Track scroll position for arrow visibility ---- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    return () => el.removeEventListener("scroll", check);
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  /* Alternate between warm / cool accent per gallery row */
  const isWarm = index % 2 === 0;

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Subtle ambient glow behind the section */}
      <div
        className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full blur-[160px] opacity-[0.07] ${
          isWarm
            ? "bg-gradient-to-br from-amber-400 to-rose-500"
            : "bg-gradient-to-br from-cyan-400 to-indigo-500"
        }`}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* ── Header ── */}
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5 px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`h-px w-8 ${isWarm ? "bg-amber-400/60" : "bg-cyan-400/60"}`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                  isWarm ? "text-amber-600" : "text-cyan-600"
                }`}
              >
                Goha Hotel
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base max-w-md">
              {images.length} curated moments from our collection.
            </p>
          </div>

          {/* Photo count pill + View All */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
              <Camera className="size-3.5" />
              {images.length} photos
            </span>

            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer ${
                isWarm
                  ? "bg-gradient-to-r from-amber-500 to-rose-500 shadow-rose-500/20 hover:shadow-rose-500/30"
                  : "bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/30"
              }`}
            >
              View All
              <Expand className="size-3.5" />
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative group/gallery">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className={`absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] cursor-pointer ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-5 sm:size-6" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className={`absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] cursor-pointer ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-5 sm:size-6" strokeWidth={2.5} />
          </button>

          {/* Blurred‑edge mask */}
          <div
            className="w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            }}
          >
            {/* Scrollable track */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 lg:px-12 pb-8 pt-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((img, i) => {
                const displayName = prettyName(img) || "Goha Hotel";
                /* Vary card heights for visual rhythm */
                const isTall = i % 3 === 0;
                const isMedium = i % 3 === 1;

                return (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    data-card={img}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View ${displayName}`}
                    className={`group/card relative shrink-0 snap-center overflow-hidden bg-slate-200 cursor-pointer transition-all ease-out select-none ${
                      isTall
                        ? "h-[420px] w-[78vw] sm:h-[520px] sm:w-[400px]"
                        : isMedium
                          ? "h-[360px] w-[72vw] sm:h-[440px] sm:w-[340px]"
                          : "h-[380px] w-[75vw] sm:h-[480px] sm:w-[360px]"
                    } ${
                      visibleCards[img]
                        ? "opacity-100 translate-y-0 duration-700"
                        : "opacity-0 translate-y-10 duration-700"
                    }`}
                    style={{
                      borderRadius: "1.75rem",
                      transitionDelay: visibleCards[img]
                        ? `${Math.min(i * 80, 400)}ms`
                        : "0ms",
                    }}
                  >
                    {/* Image */}
                    <Image
                      src={`/${folder}/${img}`}
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 80vw, 400px"
                      quality={100}
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover/card:scale-[1.08]"
                    />

                    {/* Multi‑layered overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5 opacity-70 transition-opacity duration-500 group-hover/card:opacity-85" />

                    {/* Subtle top vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

                    {/* Index badge */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold backdrop-blur-xl border transition-all duration-500 ${
                          isWarm
                            ? "bg-amber-500/20 border-amber-400/30 text-amber-200 group-hover/card:bg-amber-500/40"
                            : "bg-white/10 border-white/20 text-white/70 group-hover/card:bg-white/20"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Zoom indicator (top right) */}
                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 opacity-0 -translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white">
                        <ZoomIn className="size-4" />
                      </div>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10">
                      {/* Animated accent line */}
                      <div
                        className={`h-0.5 w-0 rounded-full transition-all duration-700 ease-out group-hover/card:w-12 mb-3 ${
                          isWarm
                            ? "bg-gradient-to-r from-amber-400 to-rose-400"
                            : "bg-gradient-to-r from-cyan-400 to-indigo-400"
                        }`}
                      />

                      <div className="flex items-end justify-between gap-3">
                        <div className="flex-1 min-w-0 translate-y-3 transition-transform duration-500 ease-out group-hover/card:translate-y-0">
                          <p
                            className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-1.5 transition-colors duration-500 ${
                              isWarm
                                ? "text-amber-300/60 group-hover/card:text-amber-300"
                                : "text-white/40 group-hover/card:text-cyan-300"
                            }`}
                          >
                            Goha Hotel
                          </p>
                          <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide truncate">
                            {displayName}
                          </h3>
                        </div>

                        {/* Action button */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 transition-all duration-500 group-hover/card:bg-white group-hover/card:text-slate-900 group-hover/card:scale-110 group-hover/card:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                          <ArrowUpRight
                            className="size-4.5"
                            strokeWidth={2.5}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll progress indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 px-8">
            <ScrollIndicator scrollRef={scrollRef} count={images.length} />
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          folder={folder}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll progress dots                                               */
/* ------------------------------------------------------------------ */

function ScrollIndicator({
  scrollRef,
  count,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  count: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [scrollRef, count]);

  /* Show max 8 dots */
  const dots = Math.min(count, 8);
  const activeIndex = Math.round(progress * (dots - 1));

  return (
    <>
      {Array.from({ length: dots }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "w-6 h-1.5 bg-slate-800"
              : "w-1.5 h-1.5 bg-slate-300"
          }`}
        />
      ))}
    </>
  );
}
