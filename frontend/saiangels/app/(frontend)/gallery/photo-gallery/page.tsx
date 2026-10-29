
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface GalleryImage {
  _id: string;
  title: string;
  year: number | string;
  category: string;
  image: string;
  createdAt?: string;
}

interface GalleryCategory {
  title: string;
  images: GalleryImage[];
}

interface GalleryYear {
  year: string;
  categories: GalleryCategory[];
}

const VISIBLE_IMAGES = 2;
const SLIDE_INTERVAL = 3000;

function GallerySlider({
  category,
  onImageClick,
}: {
  category: GalleryCategory;
  onImageClick: (image: GalleryImage) => void;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(
    0,
    category.images.length - VISIBLE_IMAGES
  );

  const next = useCallback(() => {
    setStartIndex((current) =>
      current >= maxIndex ? 0 : current + 1
    );
  }, [maxIndex]);

  const previous = useCallback(() => {
    setStartIndex((current) =>
      current <= 0 ? maxIndex : current - 1
    );
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = window.setInterval(next, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex, next]);

  return (
    <section
      className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm sm:p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-lg text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:opacity-30"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={next}
            disabled={maxIndex === 0}
            aria-label={`Next ${category.title} images`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-lg text-purple-700 transition hover:bg-purple-700 hover:text-white disabled:opacity-30"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {category.images
          .slice(startIndex, startIndex + VISIBLE_IMAGES)
          .map((image) => (
            <button
              key={image._id}
              type="button"
              onClick={() => onImageClick(image)}
              aria-label={`View ${image.title}`}
              className="group min-w-0 overflow-hidden rounded-xl border border-purple-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className="overflow-hidden bg-purple-50">
                <img
                  src={image.image}
                  alt={image.title}
                  loading="lazy"
                  className="h-32 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-40 md:h-44 lg:h-48"
                />
              </div>
              <p className="truncate px-2 py-3 text-xs font-medium text-gray-700 sm:px-3 sm:text-sm">
                {image.title}
              </p>
            </button>
          ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-gray-500">
        <span>
          {startIndex + 1}–
          {Math.min(
            startIndex + VISIBLE_IMAGES,
            category.images.length
          )}{" "}
          of {category.images.length} images
        </span>
        <span className="text-purple-600">
          {maxIndex === 0
            ? "Gallery"
            : isPaused
              ? "Paused"
              : "Auto-sliding"}
        </span>
      </div>
    </section>
  );
}

export default function PhotoGalleryPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/admin/PhotoGallery`;

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);
  const [isPopupPaused, setIsPopupPaused] = useState(false);

  const fetchGallery = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Unable to load gallery images.");
      }

      const result = await response.json();
      const records: GalleryImage[] = Array.isArray(result)
        ? result
        : result.data || [];

      setImages(records);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load gallery images."
      );
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    void fetchGallery();
  }, [fetchGallery]);

  // Group records by year and category.
  const galleryYears = useMemo<GalleryYear[]>(() => {
    const yearMap = new Map<
      string,
      Map<string, GalleryImage[]>
    >();

    for (const image of images) {
      const year = String(image.year);
      const category = image.category || "Other";

      if (!yearMap.has(year)) {
        yearMap.set(year, new Map());
      }

      const categoryMap = yearMap.get(year)!;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }

      categoryMap.get(category)!.push(image);
    }

    return Array.from(yearMap.entries())
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, categoryMap]) => ({
        year,
        categories: Array.from(categoryMap.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([title, categoryImages]) => ({
            title,
            images: [...categoryImages].sort((a, b) => {
              const timeA = a.createdAt
                ? new Date(a.createdAt).getTime()
                : 0;
              const timeB = b.createdAt
                ? new Date(b.createdAt).getTime()
                : 0;

              return timeB - timeA;
            }),
          })),
      }));
  }, [images]);

  const allImages = useMemo(
    () =>
      galleryYears.flatMap((year) =>
        year.categories.flatMap((category) => category.images)
      ),
    [galleryYears]
  );

  const currentIndex = selectedImage
    ? allImages.findIndex((image) => image._id === selectedImage._id)
    : -1;

  const showImage = useCallback(
    (direction: number) => {
      if (currentIndex < 0 || allImages.length === 0) return;

      const nextIndex =
        (currentIndex + direction + allImages.length) %
        allImages.length;

      setSelectedImage(allImages[nextIndex]);
    },
    [currentIndex, allImages]
  );

  // Popup slideshow autoplay.
  useEffect(() => {
    if (!selectedImage || isPopupPaused || allImages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setSelectedImage((current) => {
        if (!current) return null;

        const index = allImages.findIndex(
          (image) => image._id === current._id
        );

        return allImages[
          index < 0 ? 0 : (index + 1) % allImages.length
        ];
      });
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [selectedImage, isPopupPaused, allImages]);

  // Keyboard navigation and background scroll locking.
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
  }, [selectedImage, showImage]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          School Gallery
        </h1>
      </header>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-14 lg:px-8">
        {loading && (
          <p className="py-12 text-center text-gray-600">
            Loading gallery...
          </p>
        )}

        {error && (
          <div className="py-8 text-center text-red-600">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                void fetchGallery();
              }}
              className="mt-3 rounded-lg bg-purple-700 px-4 py-2 text-white hover:bg-purple-800"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && galleryYears.length === 0 && (
          <p className="py-12 text-center text-gray-600">
            No gallery images available yet.
          </p>
        )}

        {!loading &&
          !error &&
          galleryYears.map((year) => (
            <section key={year.year}>
              <div className="mb-7 text-center">
                <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  {year.year}
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-purple-600" />
              </div>

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
          <button
            type="button"
            aria-label="Close image popup"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/25"
          >
            &times;
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              showImage(-1);
            }}
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-purple-600 sm:left-6 sm:h-12 sm:w-12"
          >
            &#8592;
          </button>

          <div
            className="flex max-h-[90vh] max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={selectedImage._id}
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[75vh] max-w-full rounded-xl border-4 border-white/80 object-contain shadow-2xl"
            />

            <p className="mt-4 text-center font-semibold text-white">
              {selectedImage.title}
            </p>

            <p className="mt-1 text-sm text-gray-300">
              {currentIndex + 1} / {allImages.length}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              {isPopupPaused ? "Slideshow paused" : "Auto-playing"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              showImage(1);
            }}
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-purple-600 sm:right-6 sm:h-12 sm:w-12"
          >
            &#8594;
          </button>
        </div>
      )}
    </main>
  );
}
