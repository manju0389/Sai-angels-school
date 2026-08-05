"use client";

import { useState } from "react";
import useSWR from "swr";

// ==========================================
// Gallery Interfaces
// ==========================================
interface GalleryImage {
  url: string;
  public_id: string;
}

interface SaiCherubsInternational {
  _id: string;
  title: string;
  date: string;
  images: GalleryImage[];
}

// ==========================================
// API Fetcher
// ==========================================
const fetcher = async (
  url: string
): Promise<SaiCherubsInternational[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Sai Cherubs International data");
  }

  const result = await response.json();

  console.log("Gallery API Response:", result);

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result.data)) {
    return result.data;
  }

  return [];
};

export default function SaiCherubsInternationalPage() {
  // ==========================================
  // API Endpoint
  // ==========================================

  const API = `${process.env.NEXT_PUBLIC_API_URL}/activities/sai-cherubs-international`;

  // ==========================================
  // Fetch Gallery Data
  // ==========================================
  const {
    data: galleryData = [],
    error,
    isLoading,
  } = useSWR<SaiCherubsInternational[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // ==========================================
  // Component States
  // ==========================================
  // Accordion open item
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Popup images
  const [popupImages, setPopupImages] = useState<string[]>([]);
  // Current popup image
  const [currentIndex, setCurrentIndex] = useState(0);
  // Popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ==========================================
  // Loading State
  // ==========================================
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading Sai Cherubs International...
        </p>
      </main>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load Sai Cherubs International details.
        </p>
      </main>
    );
  }

  // ==========================================
  // Open Image Popup
  // ==========================================
  const openImage = (
    images: GalleryImage[],
    index: number
  ) => {
    setPopupImages(images.map((image) => image.url));
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  // ==========================================
  // Next Image
  // ==========================================
  const nextImage = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % popupImages.length
    );
  };

  // ==========================================
  // Previous Image
  // ==========================================
  const prevImage = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + popupImages.length) %
      popupImages.length
    );
  };

  // ==========================================
  // Close Popup
  // ==========================================
  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupImages([]);
  };

  return (
    <main className="min-h-screen bg-[#f9f7f7]">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-16">
        <h1 className="text-center text-5xl font-bold">
          Sai Cherubs International
        </h1>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto px-6 py-8">
        <p className="mb-8 text-justify leading-7 text-gray-800">
          A recent addition to our group of institutions, Sai Cherubs began its journey in 2017. 
          Equipped with spacious and colourful class rooms, a dedicated activity room, smart class, 
          library, indoor play station and a paddle pool, Cherubs lays a solid foundation
          for your child’s learning and all round development. Activities specially designed for the 3-6 
          age group for learning by doing, one to one attention, and the well experienced teaching
          staff make the school going a fun experience for your kid.
        </p>

        {/* Empty Data */}
        {galleryData.length === 0 && (
          <p className="text-center text-gray-600">
            No gallery records found.
          </p>
        )}

        {/* Accordion Gallery */}
        <div className="mx-auto w-[70%] space-y-4">
          {Array.isArray(galleryData) && galleryData.map((item, index) => (

            <div key={item._id} className="overflow-hidden rounded-xl border shadow" >

              {/* Accordion Header */}
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full justify-between bg-[#1E293B] px-5 py-4 font-semibold text-white cursor-pointer"
              >
                <span>
                  {item.title}
                </span>

                <span>
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>

              {/* Accordion Content */}
              <div className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "max-h-[700px]" : "max-h-0"
                }`}
              >

                <div className="grid grid-cols-2 gap-4 bg-white p-5 md:grid-cols-4 ">
                  {item.images?.map((img, imgIndex) => (
                    <img key={imgIndex} src={img.url} alt={item.title}
                      onClick={() => openImage(item.images, imgIndex)
                      }
                      className="h-36 w-full cursor-pointer rounded-lg object-cover transition hover:scale-105"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Popup */}
        {isPopupOpen &&
          popupImages.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

            {/* Close */}
            <button onClick={closePopup} className="absolute right-5 top-5 cursor-pointer text-4xl text-white" >
              ✕
            </button>

            {/* Previous */}
            <button onClick={prevImage} className="absolute left-5 cursor-pointer text-6xl text-white" >
              ‹
            </button>

            {/* Image */}
            <img src={popupImages[currentIndex]} alt="Gallery" className="max-h-[85vh] max-w-[85%] rounded-xl object-contain" />

            {/* Next */}
            <button onClick={nextImage} className="absolute right-5 cursor-pointer text-6xl text-white" >
              ›
            </button>
          </div>
        )}
      </section>
    </main>
  );
}