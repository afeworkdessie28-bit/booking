/**
 * Simulated data mapping for Goha Hotel's 82 total rooms.
 * Formatted directly to match your TypeScript data structures.
 */

export type RoomCategory =
  | "Standard"
  | "Deluxe"
  | "Executive"
  | "Suite"
  | "Family";

export type RoomVariant =
  | "Single"
  | "Double"
  | "Twin"
  | "King"
  | "Queen"
  | "Family"
  | "Connecting"
  | "Presidential";

export type RoomAmenity =
  | "WiFi"
  | "Breakfast Included"
  | "Air Conditioning"
  | "Balcony"
  | "Lake View"
  | "City View"
  | "Garden View"
  | "Workspace"
  | "Bathtub"
  | "Living Room"
  | "Lounge Access"
  | "Private Dining"
  | "Mini Bar"
  | "Smart TV";

export type BedType =
  | "Single Bed"
  | "Double Bed"
  | "Twin Beds"
  | "Queen Bed"
  | "King Bed"
  | "2 Queen Beds"
  | "2 Double Beds";

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: RoomCategory;
  variant: RoomVariant;
  guests: number;
  beds: BedType;
  pricePerNight: number;
  currency: "USD" | "ETB";
  size?: number; // m²
  floor?: number;
  thumbnail: string;
  images: string[];
  amenities: RoomAmenity[];
  available: boolean;
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
}

const roomPhotoSet = {
  standardTwin: {
    thumbnail: "/Rooms & Suites/one.jpg",
    images: ["/Rooms & Suites/one.jpg", "/Rooms & Suites/two.jpg"],
  },
  standardDouble: {
    thumbnail: "/Rooms & Suites/three.jpg",
    images: ["/Rooms & Suites/three.jpg", "/Rooms & Suites/four.jpg"],
  },
  deluxeKing: {
    thumbnail: "/Rooms & Suites/five.jpg",
    images: ["/Rooms & Suites/five.jpg", "/Rooms & Suites/six.jpg"],
  },
  familySuite: {
    thumbnail: "/Rooms & Suites/seven.jpg",
    images: ["/Rooms & Suites/seven.jpg", "/Rooms & Suites/eight.jpg"],
  },
  presidentialSuite: {
    thumbnail: "/Rooms & Suites/nine.jpg",
    images: ["/Rooms & Suites/nine.jpg", "/Rooms & Suites/ten.jpg"],
  },
};

/**
 * -------------------------------------------------------------
 * ESTIMATED ROOM DISTRIBUTION TO TOTAL EXACTLY 82 ROOMS
 * -------------------------------------------------------------
 * 1. Standard Category: 68 Rooms (38 Twin, 30 Double)
 * 2. Deluxe Category:    8 Rooms (8 King)
 * 3. Family Category:    4 Rooms (4 Family)
 * 4. Suite Category:     2 Rooms (2 Presidential)
 * -------------------------------------------------------------
 * Total: 82 Rooms
 */

// Helper function to dynamically generate unique individual rooms to reach the 82 total count.
const generateGohaRooms = (): Room[] => {
  const rooms: Room[] = [];
  let currentId = 1;

  // 1. STANDARD TWIN (38 Rooms)
  for (let i = 0; i < 38; i++) {
    rooms.push({
      id: `GH-${String(currentId++).padStart(3, "0")}`,
      name: `Standard Twin Room`,
      slug: `standard-twin-room-${i + 1}`,
      description:
        "Comfortable room featuring traditional Ethiopian accents and views of the historic city.",
      category: "Standard",
      variant: "Twin",
      guests: 2,
      beds: "Twin Beds",
      pricePerNight: 85,
      currency: "USD",
      size: 28,
      floor: Math.floor(Math.random() * 3) + 1,
      thumbnail: roomPhotoSet.standardTwin.thumbnail,
      images: roomPhotoSet.standardTwin.images,
      amenities: ["WiFi", "Breakfast Included", "City View", "Workspace"],
      available: true,
      rating: 4.1,
      reviewsCount: 14,
    });
  }

  // 2. STANDARD DOUBLE (30 Rooms)
  for (let i = 0; i < 30; i++) {
    rooms.push({
      id: `GH-${String(currentId++).padStart(3, "0")}`,
      name: `Standard Double Room`,
      slug: `standard-double-room-${i + 1}`,
      description:
        "Cozy layout with a spacious double bed, practical for couples exploring historic Gondar.",
      category: "Standard",
      variant: "Double",
      guests: 2,
      beds: "Double Bed",
      pricePerNight: 90,
      currency: "USD",
      size: 28,
      floor: Math.floor(Math.random() * 3) + 1,
      thumbnail: roomPhotoSet.standardDouble.thumbnail,
      images: roomPhotoSet.standardDouble.images,
      amenities: ["WiFi", "Breakfast Included", "City View", "Workspace"],
      available: true,
      rating: 4.2,
      reviewsCount: 11,
    });
  }

  // 3. DELUXE KING (8 Rooms)
  for (let i = 0; i < 8; i++) {
    rooms.push({
      id: `GH-${String(currentId++).padStart(3, "0")}`,
      name: `Deluxe King Room`,
      slug: `deluxe-king-room-${i + 1}`,
      description:
        "Spacious luxury room featuring panoramic garden vistas, absolute privacy, and soundproof architecture.",
      category: "Deluxe",
      variant: "King",
      guests: 2,
      beds: "King Bed",
      pricePerNight: 135,
      currency: "USD",
      size: 55,
      floor: 3,
      thumbnail: roomPhotoSet.deluxeKing.thumbnail,
      images: roomPhotoSet.deluxeKing.images,
      amenities: [
        "WiFi",
        "Breakfast Included",
        "Garden View",
        "Workspace",
        "Mini Bar",
      ],
      available: true,
      featured: true,
      rating: 4.5,
      reviewsCount: 8,
    });
  }

  // 4. FAMILY ROOM (4 Rooms)
  for (let i = 0; i < 4; i++) {
    rooms.push({
      id: `GH-${String(currentId++).padStart(3, "0")}`,
      name: `Family Suite`,
      slug: `family-suite-${i + 1}`,
      description:
        "Generous footprint engineered specifically for groups, delivering panoramic mountain valley scenery.",
      category: "Family",
      variant: "Family",
      guests: 4,
      beds: "2 Double Beds",
      pricePerNight: 160,
      currency: "USD",
      size: 54,
      floor: 2,
      thumbnail: roomPhotoSet.familySuite.thumbnail,
      images: roomPhotoSet.familySuite.images,
      amenities: [
        "WiFi",
        "Breakfast Included",
        "Balcony",
        "Workspace",
        "Smart TV",
      ],
      available: true,
      rating: 4.4,
      reviewsCount: 5,
    });
  }

  // 5. PRESIDENTIAL SUITE (2 Rooms)
  for (let i = 0; i < 2; i++) {
    rooms.push({
      id: `GH-${String(currentId++).padStart(3, "0")}`,
      name: `Presidential Suite`,
      slug: `presidential-suite-${i + 1}`,
      description:
        "The ultimate pinnacle of luxury overlooking the Fasil Ghebbi palaces. Includes an independent private lounge zone.",
      category: "Suite",
      variant: "Presidential",
      guests: 2,
      beds: "King Bed",
      pricePerNight: 280,
      currency: "USD",
      size: 57,
      floor: 3,
      thumbnail: roomPhotoSet.presidentialSuite.thumbnail,
      images: roomPhotoSet.presidentialSuite.images,
      amenities: [
        "WiFi",
        "Breakfast Included",
        "Balcony",
        "City View",
        "Workspace",
        "Living Room",
        "Mini Bar",
        "Smart TV",
      ],
      available: true,
      featured: true,
      rating: 4.8,
      reviewsCount: 3,
    });
  }

  return rooms;
};

export const gohaHotelRoomsDatabase: Room[] = generateGohaRooms();

// Verification log (Can be stripped out in production)
console.log(
  `Successfully generated data for ${gohaHotelRoomsDatabase.length} rooms.`,
);
// Returns: "Successfully generated data for 82 rooms."
