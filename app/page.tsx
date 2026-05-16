import Image from "next/image";
import BookingBar from "@/components/booking/BookingBar";
import Gallery from "@/components/gallery/gallery";
import galleries from "@/data/galleries";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-4 sm:pt-4">
      <BookingBar />

      <section className="w-full mt-6">
        <div className="w-full overflow-hidden  bg-slate-950/5 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.35)]">
          <Image
            src="/hero/below-booking-form.jpg"
            alt="Hotel lobby and booking hero image"
            width={1920}
            height={1080}
            quality={100}
            sizes="100vw"
            className="w-full object-contain"
          />
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12">
        {galleries.map((g) => (
          <Gallery
            key={g.folder}
            folder={g.folder}
            images={g.images}
            title={g.title}
          />
        ))}

        <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">
            Sample content
          </h2>
          <p className="mt-4 text-slate-700">
            Replace this with the full page content.
          </p>
        </section>
      </main>
    </div>
  );
}
