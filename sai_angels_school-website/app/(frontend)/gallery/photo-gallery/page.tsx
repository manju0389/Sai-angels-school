"use client";

import { useState } from "react";
import useSWR from "swr";

interface Photo {
  _id: string;
  title: string;
  category: string;
  image: string;
}

interface GalleryResponse {
  success: boolean;
  data: Photo[];
}

// Fetcher function for SWR API calls
const fetcher = async (url: string): Promise<Photo[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Gallery data");
  }

  const result: GalleryResponse = await response.json();

  return result.data;
};

export default function PhotoGalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/PhotoGallery`;

  // Fetch gallery images using SWR
  const {
    data: PhotoData = [],
    error,
    isLoading,
  } = useSWR<Photo[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading Gallery...
        </p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load Gallery details.
        </p>
      </main>
    );
  }

  // Gallery categories
  const categories = [
    "All",
    "Sai Angels School",
    "Little Sai Angels",
    "Sai Cherubs",
    "Sai Boarding Home",
  ];

  // Filter images based on selected category
  const filteredImages =
    activeTab === "All"
      ? PhotoData
      : PhotoData.filter((img) => img.category === activeTab);

  // Get currently selected image for modal
  const currentImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  // Navigate to next image
  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev !== null && prev === filteredImages.length - 1
        ? 0
        : (prev ?? 0) + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev !== null && prev === 0
        ? filteredImages.length - 1
        : (prev ?? 0) - 1
    );
  };

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-24 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black">
            Gallery
          </h1>
        </div>
      </section>

      <section className="container mx-auto py-10 px-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat}
              onClick={() => {
                setActiveTab(cat);
                setSelectedIndex(null);
              }}
              className={`px-5 py-2 rounded-lg font-semibold transition cursor-pointer ${
                activeTab === cat
                  ? "bg-green-700 text-white"
                  : "bg-green-900 text-white hover:bg-green-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((img, index) => (
              <div key={img._id} onClick={() => setSelectedIndex(index)} className="cursor-pointer overflow-hidden rounded-lg shadow-lg group" >
                <img src={img.image} alt={img.title}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No images found.
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedIndex !== null && currentImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedIndex(null)} >
            {/* Close Button */}
            <button onClick={() => setSelectedIndex(null)} className="absolute top-5 right-6 text-white text-4xl cursor-pointer" >
              ✕
            </button>

            {/* Previous Button */}
            {filteredImages.length > 1 && (
              <button onClick={(e) => {e.stopPropagation(); prevImage();}} className="absolute left-5 text-white text-6xl cursor-pointer">
                ‹
              </button>
            )}

            {/* Selected Image */}
            <img onClick={(e) => e.stopPropagation()} src={currentImage.image} alt={currentImage.title} className="max-w-[90%] max-h-[85%] rounded-lg shadow-2xl" />

            {/* Next Button */}
            {filteredImages.length > 1 && (
              <button onClick={(e) => {e.stopPropagation(); nextImage();}} className="absolute right-5 text-white text-6xl cursor-pointer" >
                ›
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}