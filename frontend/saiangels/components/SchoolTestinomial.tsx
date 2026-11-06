
"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  initials: string;
  color: string;
  rating: number;
  isActive: boolean;
  order: number;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}/home`;

export default function SchoolTestimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalSlides = testimonials.length;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API}/testimonials/active`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch testimonials");
        }

        setTestimonials(data.testimonials || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load testimonials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    if (currentSlide >= totalSlides && totalSlides > 0) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (current) => (current - 1 + totalSlides) % totalSlides
    );
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-14 sm:px-6 sm:py-14 lg:px-8">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-purple-100 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-orange-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
            Stories of Trust,{" "}
            <span className="text-[#be9939]">
              Growth & Happiness
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-slate-500">Loading testimonials...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-center text-red-500">
              Unable to load testimonials. Please try again later.
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-slate-500">
              No testimonials available at the moment.
            </p>
          </div>
        )}

        {/* Sliding Testimonials */}
        {!loading && !error && testimonials.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden px-1 py-3">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="w-full shrink-0 px-1"
                  >
                    <article className="group relative mx-auto flex min-h-[320px] max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl sm:p-7">

                      {/* Top Accent */}
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-orange-400" />

                      {/* Quote and Stars */}
                            <div className="mb-5 flex items-center justify-between">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-4xl font-bold leading-none text-purple-700 transition-colors group-hover:bg-purple-700 group-hover:text-white">
                                “
                              </div>
                            
                              {/* Dynamic Star Rating */}
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={
                                      star <= (testimonial.rating ?? 5)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>

                      {/* Message */}
                      <p className="flex-1 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {testimonial.message}
                      </p>

                      {/* Parent Details */}
                      <div className="my-6 h-px bg-slate-100" />

                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                            testimonial.color ||
                            "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {testimonial.initials ||
                            testimonial.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900">
                            {testimonial.name}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {testimonial.role}
                          </p>
                        </div>

                        <span className="ml-auto text-2xl text-purple-200 transition-colors group-hover:text-purple-600">
                          ❞
                        </span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            {totalSlides > 1 && (
              <div className="mt-7 flex items-center justify-center gap-4">

                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous testimonials"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-200 bg-white text-xl text-purple-700 shadow-sm transition hover:border-purple-700 hover:bg-purple-700 hover:text-white"
                >
                  &#8592;
                </button>

                {/* Slide Indicators */}
                <div className="flex items-center gap-2">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial._id}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={
                        currentSlide === index ? "true" : undefined
                      }
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "w-9 bg-purple-700"
                          : "w-2.5 bg-purple-200 hover:bg-purple-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next testimonials"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-700 text-xl text-white shadow-sm transition hover:bg-purple-800"
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
