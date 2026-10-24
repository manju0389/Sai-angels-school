
"use client";

import React, { useEffect, useState } from "react";

// Gallery data types
type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryCategory = {
  title: string;
  images: GalleryImage[];
};

type GalleryYear = {
  year: string;
  categories: GalleryCategory[];
};

// Gallery content grouped by year and event category
const galleryYears: GalleryYear[] = [
  {
    year: "2024",
    categories: [
      {
        title: "Annual Day",
        images: [
          { src: "/images/travel1.jpg", alt: "Annual Day 1" },
          { src: "/images/travel2.jpg", alt: "Annual Day 2" },
          { src: "/images/travel3.jpg", alt: "Annual Day 3" },
          { src: "/images/travel4.jpg", alt: "Annual Day 4" },
        ],
      },
      {
        title: "Sports Day",
        images: [
          { src: "/images/fire-certificate/image1.jpeg", alt: "Sports Day 1" },
          { src: "/images/fire-certificate/image2.jpeg", alt: "Sports Day 2" },
          { src: "/images/fire-certificate/image3.jpeg", alt: "Sports Day 3" },
          { src: "/images/fire-certificate/image4.jpeg", alt: "Sports Day 4" },
        ],
      },
      {
        title: "Science Exhibition",
        images: [
          { src: "/images/fire-certificate/image5.jpeg", alt: "Science Exhibition 1" },
          { src: "/images/fire-certificate/image6.jpeg", alt: "Science Exhibition 2" },
          { src: "/images/fire-certificate/image7.jpeg", alt: "Science Exhibition 3" },
          { src: "/images/travel1.jpg", alt: "Science Exhibition 4" },
        ],
      },
      {
        title: "Cultural Program",
        images: [
          { src: "/images/travel2.jpg", alt: "Cultural Program 1" },
          { src: "/images/travel3.jpg", alt: "Cultural Program 2" },
          { src: "/images/travel4.jpg", alt: "Cultural Program 3" },
          { src: "/images/fire-certificate/image1.jpeg", alt: "Cultural Program 4" },
        ],
      },
    ],
  },
  {
    year: "2025",
    categories: [
      {
        title: "Annual Day",
        images: [
          { src: "/images/fire-certificate/image1.jpeg", alt: "Annual Day 2025 - 1" },
          { src: "/images/fire-certificate/image2.jpeg", alt: "Annual Day 2025 - 2" },
          { src: "/images/fire-certificate/image3.jpeg", alt: "Annual Day 2025 - 3" },
          { src: "/images/fire-certificate/image4.jpeg", alt: "Annual Day 2025 - 4" },
        ],
      },
      {
        title: "Sports Activities",
        images: [
          { src: "/images/fire-certificate/image5.jpeg", alt: "Sports Activities 1" },
          { src: "/images/fire-certificate/image6.jpeg", alt: "Sports Activities 2" },
          { src: "/images/fire-certificate/image7.jpeg", alt: "Sports Activities 3" },
          { src: "/images/travel1.jpg", alt: "Sports Activities 4" },
        ],
      },
      {
        title: "School Celebrations",
        images: [
          { src: "/images/travel2.jpg", alt: "School Celebration 1" },
          { src: "/images/travel3.jpg", alt: "School Celebration 2" },
          { src: "/images/travel4.jpg", alt: "School Celebration 3" },
        ],
      },
      {
        title: "Educational Activities",
        images: [
          { src: "/images/fire-certificate/image1.jpeg", alt: "Educational Activity 1" },
          { src: "/images/fire-certificate/image3.jpeg", alt: "Educational Activity 2" },
          { src: "/images/fire-certificate/image5.jpeg", alt: "Educational Activity 3" },
        ],
      },
    ],
  },
  {
    year: "2026",
    categories: [
      {
        title: "Annual Day",
        images: [
          { src: "/images/fire-certificate/image2.jpeg", alt: "Annual Day 2026 - 1" },
          { src: "/images/fire-certificate/image4.jpeg", alt: "Annual Day 2026 - 2" },
          { src: "/images/fire-certificate/image6.jpeg", alt: "Annual Day 2026 - 3" },
          { src: "/images/fire-certificate/image7.jpeg", alt: "Annual Day 2026 - 4" },
        ],
      },
      {
        title: "Nature Activities",
        images: [
          { src: "/images/fire-certificate/image1.jpeg", alt: "Nature Activity 1" },
          { src: "/images/fire-certificate/image3.jpeg", alt: "Nature Activity 2" },
          { src: "/images/fire-certificate/image5.jpeg", alt: "Nature Activity 3" },
        ],
      },
      {
        title: "School Events",
        images: [
          { src: "/images/travel1.jpg", alt: "School Event 1" },
          { src: "/images/travel2.jpg", alt: "School Event 2" },
          { src: "/images/travel3.jpg", alt: "School Event 3" },
          { src: "/images/travel4.jpg", alt: "School Event 4" },
        ],
      },
      {
        title: "Student Activities",
        images: [
          { src: "/images/fire-certificate/image2.jpeg", alt: "Student Activity 1" },
          { src: "/images/fire-certificate/image4.jpeg", alt: "Student Activity 2" },
          { src: "/images/fire-certificate/image6.jpeg", alt: "Student Activity 3" },
        ],
      },
    ],
  },
];

const VISIBLE_IMAGES = 2;
const SLIDE_INTERVAL = 3000;

// Individual category slider with autoplay and navigation
function GallerySlider({
  category,
  onImageClick,
}: {
  category: GalleryCategory;
  onImageClick: (image: GalleryImage) => void;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(0, category.images.length - VISIBLE_IMAGES);

  // Move forward or loop back to the first pair
  const next = () => {
    setStartIndex((current) => (current >= maxIndex ? 0 : current + 1));
  };

  // Move backward or loop to the last pair
  const previous = () => {
    setStartIndex((current) => (current <= 0 ? maxIndex : current - 1));
  };

  // Automatically advance each category every three seconds
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = window.setInterval(() => {
      setStartIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  return (
    <section
      className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Category title and navigation buttons */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          {category.title}
        </h3>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={maxIndex === 0}
            aria-label={`Previous ${category.title} images`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-lg text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={next}
            disabled={maxIndex === 0}
            aria-label={`Next ${category.title} images`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-lg text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Display two images per slide */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {category.images
          .slice(startIndex, startIndex + VISIBLE_IMAGES)
          .map((image) => (
            <button
              key={`${image.src}-${image.alt}`}
              type="button"
              onClick={() => onImageClick(image)}
              aria-label={`View ${image.alt}`}
              className="group min-w-0 overflow-hidden rounded-xl border border-purple-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className="overflow-hidden bg-purple-50">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 sm:h-40 md:h-44 lg:h-48"
                />
              </div>

              <p className="truncate px-2 py-3 text-xs font-medium text-gray-700 sm:px-3 sm:text-sm">
                {image.alt}
              </p>
            </button>
          ))}
      </div>

      {/* Image count and autoplay status */}
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-gray-500">
        <span>
          {startIndex + 1}–
          {Math.min(startIndex + VISIBLE_IMAGES, category.images.length)} of{" "}
          {category.images.length} images
        </span>
        <span className="text-purple-600">
          {maxIndex === 0 ? "Gallery" : isPaused ? "Paused" : "Auto-sliding"}
        </span>
      </div>
    </section>
  );
}

// Main school gallery page
export default function PhotoGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isPopupPaused, setIsPopupPaused] = useState(false);

  // Combine all year and category images for popup navigation
  const allImages = galleryYears.flatMap((year) =>
    year.categories.flatMap((category) => category.images)
  );

  const currentIndex = selectedImage
    ? allImages.findIndex(
        (image) =>
          image.src === selectedImage.src && image.alt === selectedImage.alt
      )
    : -1;

  // Navigate between images in the popup
  const showImage = (direction: number) => {
    if (currentIndex < 0) return;

    const nextIndex = (currentIndex + direction + allImages.length) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  // Popup autoplay: advance every three seconds and pause on hover
  useEffect(() => {
    if (!selectedImage || isPopupPaused) return;

    const timer = window.setInterval(() => {
      setSelectedImage((current) => {
        if (!current) return null;

        const index = allImages.findIndex(
          (image) => image.src === current.src && image.alt === current.alt
        );

        if (index < 0) return allImages[0];

        return allImages[(index + 1) % allImages.length];
      });
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [selectedImage, isPopupPaused, allImages]);

  // Keyboard navigation and background scroll locking for the popup
  useEffect(() => {
    if (!selectedImage) {
      setIsPopupPaused(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") showImage(1);
      if (event.key === "ArrowLeft") showImage(-1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage, currentIndex]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Centered main page heading */}
      <header className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          School Gallery
        </h1>
      </header>

      {/* Year-wise sections, each containing independent category sliders */}
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-14 lg:px-8">
        {galleryYears.map((year) => (
          <section key={year.year}>
            {/* Centered year heading */}
            <div className="mb-7 text-center">
              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {year.year}
              </h2>
              <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-purple-600" />
            </div>

            {/* Responsive grid of separately titled sliders */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {year.categories.map((category) => (
                <GallerySlider
                  key={`${year.year}-${category.title}`}
                  category={category}
                  onImageClick={(image) => {
                    setIsPopupPaused(false);
                    setSelectedImage(image);
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Full-screen image popup with autoplay and manual navigation */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setSelectedImage(null)}
          onMouseEnter={() => setIsPopupPaused(true)}
          onMouseLeave={() => setIsPopupPaused(false)}
        >
          {/* Close popup */}
          <button
            type="button"
            aria-label="Close image popup"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/25"
          >
            &times;
          </button>

          {/* Previous image */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showImage(-1);
            }}
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-purple-600 sm:left-6 sm:h-12 sm:w-12"
          >
            &#8592;
          </button>

          {/* Selected image and image counter */}
          <div
            className="flex max-h-[90vh] max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={`${selectedImage.src}-${selectedImage.alt}`}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[75vh] max-w-full rounded-xl border-4 border-white/80 object-contain shadow-2xl"
            />
            <p className="mt-4 text-center font-semibold text-white">
              {selectedImage.alt}
            </p>
            <p className="mt-1 text-sm text-gray-300">
              {currentIndex + 1} / {allImages.length}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {isPopupPaused ? "Slideshow paused" : "Auto-playing"}
            </p>
          </div>

          {/* Next image */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showImage(1);
            }}
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-purple-600 sm:right-6 sm:h-12 sm:w-12"
          >
            &#8594;
          </button>
        </div>
      )}
    </main>
  );
}
