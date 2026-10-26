
"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "Sai Angels Schools provides a caring and encouraging environment where children can learn, explore, and grow with confidence. We appreciate the dedication of the teachers and their personal attention to every child.",
    initials: "P",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "We appreciate the school's balanced approach to academics and extracurricular activities. Teachers encourage creativity, discipline, and participation, helping children develop valuable life skills.",
    initials: "P",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "The school creates a welcoming atmosphere for children. We value the communication between parents and teachers and the importance given to learning, good manners, and overall development.",
    initials: "P",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "The supportive teachers and positive learning environment make school a happy place for children. We appreciate the opportunities students receive to build confidence and discover their strengths.",
    initials: "P",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "We appreciate the school's efforts to encourage curiosity, responsibility, and independent thinking. The focus on both classroom learning and personal growth is valuable to us.",
    initials: "P",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Parent of a Student",
    role: "Parent Testimonial",
    message: "Sai Angels Schools offers children opportunities to learn new things, participate in activities, and develop positive habits. We appreciate the care and encouragement provided by the school community.",
    initials: "P",
    color: "bg-amber-100 text-amber-700",
  },
];

const testimonialsPerSlide = 1;
const totalSlides = Math.ceil(
  testimonials.length / testimonialsPerSlide
);

export default function SchoolTestimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (current) => (current - 1 + totalSlides) % totalSlides
    );
  };

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-14 sm:px-6 sm:py-14 lg:px-8">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-purple-100/100 blur-6xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-orange-100/100 blur-6xl" />

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

        {/* Sliding Testimonials */}
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
              {Array.from({ length: totalSlides }, (_, slideIndex) => {
                const slideTestimonials = testimonials.slice(
                  slideIndex * testimonialsPerSlide,
                  slideIndex * testimonialsPerSlide +
                    testimonialsPerSlide
                );

                return (
                  <div
                    key={slideIndex}
                    className=" w-full shrink-0  items-stretch gap-5 px-1 md:grid-cols-2 lg:gap-7"
                  >
                    {slideTestimonials.map((testimonial, index) => (
                      <article
                        key={slideIndex * testimonialsPerSlide + index}
                        className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl sm:p-7"
                      >
                        {/* Top Accent */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-orange-400" />

                        {/* Quote and Stars */}
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-4xl font-bold leading-none text-purple-700 transition-colors group-hover:bg-purple-700 group-hover:text-white">
                            “
                          </div>

                          <div
                            className="flex gap-0.5 text-lg text-amber-400"
                            aria-label="Sample five-star rating"
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} aria-hidden="true">
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
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${testimonial.color}`}
                          >
                            {testimonial.initials}
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
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
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
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Show testimonial group ${index + 1}`}
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

      </div>
    </section>
  );
}
