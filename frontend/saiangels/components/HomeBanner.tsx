
"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    title: "Inspiring Young Minds, Building Bright Futures.",
    description:
      "Discover a place where curiosity grows, talents shine, and every student can achieve their full potential.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "A Better Learning Experience Starts Here.",
    description:
      "Empowering students with knowledge, creativity, and the confidence to shape tomorrow.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=85",
  },
  {
    title: "Give Your Child a Bright Start.",
    description:
      "Join a welcoming school community where every child is encouraged to dream big and achieve more.",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=2000&q=85",
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
          aria-hidden={current !== index}
        >
          <img
            src={slide.image}
            alt="Students learning at school"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/65 to-slate-900/10" />

          <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
            <div className="max-w-3xl text-white">

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {slide.title}
              </h1>

              <p className="mb-9 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                {slide.description}
              </p>

            </div>
          </div>
        </div>
      ))}

      {/* Slider controls */}
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
              key={slide.title}
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
    </section>
  );
}
