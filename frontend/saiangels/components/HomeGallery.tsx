
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type GalleryImage = {
  src: string;
  alt: string;
};

const galleryImages: GalleryImage[] = [
  { src: "/images/travel1.jpg", alt: "Annual Day 1" },
  { src: "/images/travel2.jpg", alt: "Annual Day 2" },
  { src: "/images/travel3.jpg", alt: "Annual Day 3" },
  { src: "/images/travel4.jpg", alt: "Annual Day 4" },
  { src: "/images/travel5.jpg", alt: "Annual Day 5" },
  { src: "/images/travel6.jpg", alt: "Annual Day 6" },
  { src: "/images/travel7.jpg", alt: "Annual Day 7" },
  { src: "/images/travel8.jpg", alt: "Annual Day 8" },
];

const SLIDE_INTERVAL = 3000;
const VISIBLE_IMAGES = 4;

export default function PhotoGalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const maxIndex = Math.max(0, galleryImages.length - VISIBLE_IMAGES);

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current >= maxIndex ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current <= 0 ? maxIndex : current - 1
    );
  };

  useEffect(() => {
    if (isPaused || maxIndex === 0 || showAllImages) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((current) =>
        current >= maxIndex ? 0 : current + 1
      );
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex, showAllImages]);

  return (
    <main className="w-full bg-white py-12 sm:py-14">
      <section className="w-full">
        {/* Gallery Heading */}
        <div className="mb-8 px-4 text-center sm:mb-10">

            <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
              School{" "}
              <span className="text-[#be9939]">
                Gallery
              </span>
            </h2>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-amber-400" />

        </div>

        {/* Gallery Carousel */}
        <div
          className="group relative w-full overflow-hidden px-2 sm:px-4 lg:px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / VISIBLE_IMAGES)}%)`,
            }}
          >
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="w-1/4 min-w-0 flex-none px-1.5 sm:px-2"
              >
                <div className="overflow-hidden rounded-lg shadow-sm sm:rounded-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-44 md:h-56 lg:h-72"
                  />
                </div>

                <p className="mt-2 truncate text-center text-xs font-semibold text-slate-700 sm:mt-3 sm:text-sm">
                  {image.alt}
                </p>
              </div>
            ))}
          </div>

          {/* Previous Arrow */}
          {maxIndex > 0 && (
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous images"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-900 shadow-md transition hover:bg-purple-700 hover:text-white"
            >
              &#8249;
            </button>
          )}

          {/* Next Arrow */}
          {maxIndex > 0 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next images"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-slate-900 shadow-md transition hover:bg-purple-700 hover:text-white"
            >
              &#8250;
            </button>
          )}
        </div>

        {/* Carousel Indicators */}
        {maxIndex > 0 && (
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-8 bg-purple-700"
                    : "w-2.5 bg-slate-300 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        )}

        
{/* View More Button */}
{galleryImages.length > 0 && (
  <div className="mt-10 text-center">
    <Link
      href="/gallery/photo-gallery"
      className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-[#07204f] px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
    >
      View More Photos
      <span className="text-lg" aria-hidden="true">
        →
      </span>
    </Link>
  </div>
)}

      </section>
    </main>
  );
}