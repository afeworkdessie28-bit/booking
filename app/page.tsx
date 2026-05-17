import BookingBar from "@/components/booking/BookingBar";
import Gallery from "@/components/gallery/gallery";
import RoomCard from "@/components/rooms/RoomCard";
import galleries from "@/data/galleries";
import { gohaHotelRoomsDatabase as rooms } from "@/data/rooms";

const featuredRoomImages = [
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
];

const deluxeRoom = rooms.find(
  (room) => room.category === "Deluxe" && room.variant === "King",
);
const presidentialSuite = rooms.find(
  (room) => room.category === "Suite" && room.variant === "Presidential",
);
const familySuite = rooms.find(
  (room) => room.category === "Family" && room.variant === "Family",
);

const standardTwinRooms = rooms.filter(
  (room) => room.category === "Standard" && room.variant === "Twin",
);
const standardDoubleRooms = rooms.filter(
  (room) => room.category === "Standard" && room.variant === "Double",
);

const featuredRooms = [deluxeRoom, presidentialSuite, familySuite]
  .filter(Boolean)
  .concat(standardTwinRooms.slice(0, 4))
  .concat(standardDoubleRooms.slice(0, 3))
  .concat(
    rooms.filter(
      (room) =>
        ![deluxeRoom?.id, presidentialSuite?.id, familySuite?.id]
          .concat(standardTwinRooms.slice(0, 4).map((room) => room.id))
          .concat(standardDoubleRooms.slice(0, 3).map((room) => room.id))
          .includes(room.id) &&
        ["Suite", "Deluxe", "Standard", "Family"].includes(room.category),
    ),
  )
  .slice(0, 10) as (typeof rooms)[number][];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <section id="home" className="pt-4 sm:pt-4">
        <div id="book" className="relative z-40 w-full px-3 sm:px-4">
          <BookingBar />
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-6">
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {featuredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                title={room.name}
                subtitle={`${room.category} • ${room.beds} • ${room.guests} guests`}
                image={featuredRoomImages[index] || room.thumbnail}
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
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-12 space-y-16">
        <section
          id="rooms"
          className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900">Rooms</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Discover thoughtful spaces crafted for comfort and character, from
            tranquil standard rooms to spacious suites.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredRooms.map((room) => (
              <div
                key={`summary-${room.id}`}
                className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {room.category} {room.variant}
                </h3>
                <p className="mt-3 text-slate-600">{room.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900">Services</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Enjoy exceptional amenities and warm hospitality throughout your
            stay.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-lg font-semibold text-slate-900">Concierge</p>
              <p className="mt-2 text-slate-600">
                Personalized travel planning and restaurant recommendations.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-lg font-semibold text-slate-900">Dining</p>
              <p className="mt-2 text-slate-600">
                Local cuisine and curated menus in refined dining spaces.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-lg font-semibold text-slate-900">Wellness</p>
              <p className="mt-2 text-slate-600">
                Relaxing treatments and fitness amenities for total
                rejuvenation.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-6">
              <p className="text-lg font-semibold text-slate-900">Events</p>
              <p className="mt-2 text-slate-600">
                Flexible venues tailored for meetings, celebrations, and special
                occasions.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-28 space-y-4">
          {galleries.map((g, i) => (
            <Gallery
              key={g.folder}
              folder={g.folder}
              images={g.images}
              title={g.title}
              index={i}
            />
          ))}
        </section>

        <section
          id="location"
          className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900">Location</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Situated in the heart of the city, Goha Hotel offers easy access to
            historic landmarks, dining, and cultural attractions.
          </p>
          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <p className="text-lg font-semibold">Nearby</p>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>Historic market district</li>
              <li>Local dining and entertainment</li>
              <li>City center landmarks within walking distance</li>
            </ul>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900">About</h2>
          <p className="mt-3 text-slate-600">
            Goha Hotel blends contemporary luxury with local inspiration,
            offering a welcoming retreat for every traveler.
          </p>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-slate-900">Contact</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Address
              </p>
              <p className="mt-3 text-slate-700">
                123 Goha Street, Gondar, Ethiopia
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Phone
              </p>
              <p className="mt-3 text-slate-700">+251 912 345 678</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Email
              </p>
              <p className="mt-3 text-slate-700">hello@goha-hotel.com</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
