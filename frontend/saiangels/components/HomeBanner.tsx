"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define slides here
const slides = [
  {
    title: "Slide 1",
    image: "/images/banner1.jpg",
  },
  {
    title: "Slide 2",
    image: "/images/banner2.jpg",
  },
  {
    title: "Slide 3",
    image: "/images/banner3.jpg",
  },
];

export default function HomeBanner() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      (prev - 1 + slides.length) % slides.length
    );

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate h-[600px] min-h-[500px] w-full overflow-hidden bg-slate-950 sm:h-[680px]">

      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 sm:left-10 lg:left-16">

        <button onClick={prevSlide} aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900">
          <ChevronLeft size={22} />
        </button>

        <button onClick={nextSlide} aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-slate-900">
          <ChevronRight size={22} />
        </button>

        <div className="ml-3 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-10 bg-amber-400"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
