
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaLightbulb,
  FaFutbol,
  FaBus,
  FaShieldAlt,
  FaFirstAid,
  FaLeaf,
  FaUserGraduate,
  FaAward,
  FaSchool,
} from "react-icons/fa";

/* =========================
   SCHOOL AMENITIES
========================= */

const amenities = [
  {
    title: "Smart Classrooms",
    description:
      "Well-organised classrooms designed to encourage interactive teaching, creativity, and effective learning.",
    icon: FaChalkboardTeacher,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Library",
    description:
      "A learning space where students can explore books, develop reading habits, and expand their knowledge.",
    icon: FaBookOpen,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Science & Computer Lab",
    description:
      "Practical learning opportunities that help students explore scientific concepts through experiments.",
    icon: FaLightbulb,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Sports & Recreation",
    description:
      "Opportunities for physical activity, teamwork, discipline, fitness, and healthy competition.",
    icon: FaFutbol,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Transportation",
    description:
      "School transport facilities designed to support convenient and organised student commuting.",
    icon: FaBus,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Student Safety",
    description:
      "A school environment that prioritises student wellbeing, responsible supervision, and safety.",
    icon: FaShieldAlt,
    color: "bg-rose-100 text-rose-700",
  },
  {
    title: "First Aid & Care",
    description:
      "Attention to student wellbeing with appropriate first-aid arrangements and care when needed.",
    icon: FaFirstAid,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Green Campus",
    description:
      "An opportunity to appreciate nature and develop environmental awareness through a welcoming campus.",
    icon: FaLeaf,
    color: "bg-green-100 text-green-700",
  },
];

/* =========================
   SCHOOL STATISTICS
========================= */

const statistics = [
  {
    label: "Happy Students",
    value: 1200,
    suffix: "+",
    icon: FaUserGraduate,
    color: "from-blue-600 to-indigo-700",
  },
  {
    label: "Dedicated Teachers",
    value: 75,
    suffix: "+",
    icon: FaChalkboardTeacher,
    color: "from-emerald-500 to-teal-700",
  },
  {
    label: "Years of Excellence",
    value: 25,
    suffix: "+",
    icon: FaSchool,
    color: "from-amber-500 to-orange-600",
  },
  {
    label: "Awards & Achievements",
    value: 40,
    suffix: "+",
    icon: FaAward,
    color: "from-purple-600 to-fuchsia-700",
  },
];

/* =========================
   ANIMATED COUNTER
========================= */

interface CounterProps {
  target: number;
  start: boolean;
}

function Counter({ target, start }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setCount(target);
      return;
    }

    let frame: number | undefined;
    let startTime: number | undefined;

    const duration = 1800;

    const animate = (time: number) => {
      if (startTime === undefined) {
        startTime = time;
      }

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
    };
  }, [target, start]);

  return <>{count.toLocaleString("en-IN")}</>;
}

/* =========================
   MAIN COMPONENT
========================= */

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* =========================
          SCHOOL AMENITIES
      ========================= */}

      <section className="relative overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-16">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
              Our School{" "}
              <span className="text-[#be9939]">
                Amenities
              </span>
            </h2>

            <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-amber-400" />
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {amenities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={28} aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-blue-950 transition-colors group-hover:text-blue-700">
                    {item.title}
                  </h3>

                  <p className="flex-grow text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="h-1 w-10 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-16" />
                    <span className="h-1 w-2 rounded-full bg-blue-200" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          SCHOOL STATISTICS COUNTER
      ========================= */}

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-slate-950 py-14 sm:py-10"
      >
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Growing Together,
              <span className="mt-2 block text-amber-400">
                Achieving Excellence
              </span>
            </h2>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/10 sm:p-8"
                >
                  {/* Top Accent */}
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color}`}
                  />

                  {/* Icon */}
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon aria-hidden="true" />
                  </div>

                  {/* Animated Number */}
                  <div className="mt-6 flex items-center justify-center gap-1">
                    <p
                      className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
                      aria-label={`${item.value.toLocaleString("en-IN")}${item.suffix} ${item.label}`}
                    >
                      <Counter
                        target={item.value}
                        start={start}
                      />
                    </p>

                    <span className="text-3xl font-extrabold text-amber-400">
                      {item.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="mt-4 text-sm font-semibold tracking-wide text-slate-300 sm:text-base">
                    {item.label}
                  </h3>

                  {/* Bottom Accent */}
                  <div
                    className={`mx-auto mt-5 h-1 w-10 rounded-full bg-gradient-to-r ${item.color} transition-all duration-300 group-hover:w-20`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
