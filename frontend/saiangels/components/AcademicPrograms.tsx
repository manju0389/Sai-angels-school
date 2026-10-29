
import React from "react";
import {
  FaBookOpen,
  FaGraduationCap,
  FaLightbulb,
} from "react-icons/fa";

const programs = [
  {
    title: "Primary Education",
    classes: "Classes 1–5",
    description:
      "Build strong foundations in language, mathematics, environmental awareness, creative thinking, and essential life skills in a supportive learning environment.",
    icon: FaBookOpen,
    color: "bg-blue-100 text-blue-700",
    accent: "bg-blue-500",
  },
  {
    title: "Middle School",
    classes: "Classes 6–8",
    description:
      "Encourages independent thinking, subject understanding, practical activities, problem-solving, and the development of confident learners.",
    icon: FaLightbulb,
    color: "bg-emerald-100 text-emerald-700",
    accent: "bg-emerald-500",
  },
  {
    title: "Secondary Education",
    classes: "Classes 9–10",
    description:
      "Focuses on academic excellence, conceptual understanding, structured assessments, and preparation for board examinations and future studies.",
    icon: FaGraduationCap,
    color: "bg-purple-100 text-purple-700",
    accent: "bg-purple-500",
  },
];

const AcademicPrograms = () => {
  return (
    <section className="relative overflow-hidden bg-[#ffede4] px-5 py-16 sm:py-20 lg:py-13">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

            <h2 className="text-3xl font-extrabold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
              Our Academic{" "}
              <span className="text-[#be9939]">
                Programs
              </span>
            </h2>

          <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <article
                key={program.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl sm:p-8"
              >
                {/* Top accent */}
                <div
                  className={`absolute left-0 top-0 h-1.5 w-full ${program.accent} origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                />

                {/* Icon */}
                <div className="mb-7 flex items-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${program.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon size={30} aria-hidden="true" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-blue-950 transition-colors duration-300 group-hover:text-blue-700 sm:text-2xl">
                  {program.title}
                </h3>

                {/* Classes badge */}
                <p className="mt-4 inline-flex w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 transition-colors group-hover:bg-amber-50 group-hover:text-amber-700">
                  {program.classes}
                </p>

                {/* Description */}
                <p className="mt-5 flex-grow text-sm space-y-6 text-base leading-8 text-slate-600">
                  {program.description}
                </p>

                {/* Bottom accent */}
                <div
                  className={`mt-7 h-1 w-12 rounded-full ${program.accent} transition-all duration-300 group-hover:w-20`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
