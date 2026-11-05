"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  _id: string;
  image: string;
  isActive: boolean;
  order: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomeBanner() {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH ACTIVE BANNERS
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${API_URL}/home/banners`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load banners");
        }

        const activeBanners = data.banners.filter(
          (banner: Banner) => banner.isActive
        );

        setSlides(activeBanners);
      } catch (error) {
        console.error("Banner fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // AUTOMATIC SLIDER
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setCurrent((prev) =>
      (prev - 1 + slides.length) % slides.length
    );
  };

  // NEXT SLIDE
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (loading || slides.length === 0) {
    return null;
  }

  return (
    <section className="relative isolate h-[600px] min-h-[500px] w-full overflow-hidden bg-slate-950 sm:h-[680px]">

      {/* BANNER IMAGES */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
          aria-hidden={current !== index}
        >
          <img
            src={slide.image}
            alt={`School banner ${index + 1}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}

      {/* SLIDER CONTROLS */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 sm:left-10 lg:left-16">

          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900"
          >
            <ChevronRight size={22} />
          </button>

          <div className="ml-3 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide._id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={current === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-10 bg-amber-400"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>

        </div>
      )}
    </section>
  );
}
