
import React from "react";
import {
  FaQuoteLeft,
  FaGraduationCap,
  FaBookOpen,
  FaBullseye,
} from "react-icons/fa";

const values = [
  {
    title: "MOTTO",
    subtitle: "SAY YES TO SERVICE BEFORE SELF",
    description:
      "Our motto reflects the values of dedication, kindness, and service that guide every learner towards a meaningful future.",
    icon: FaGraduationCap,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    accent: "bg-green-400",
     image: "/images/images.jfif",
  },
  {
    title: "VISION",
    subtitle: "SAY YES TO EDUCATION FOR A BETTER FUTURE",
    description:
      "We aim to nurture confident, disciplined, creative, and responsible students through quality education and holistic development.",
    icon: FaBookOpen,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    accent: "bg-yellow-400",
     image: "/images/image3.webp",
  },
  {
    title: "MISSION",
    subtitle: "SAY YES TO CHILD-CENTRIC EDUCATION",
    description:
      "Our mission is to provide a supportive learning environment that inspires curiosity, builds character, and develops every child's potential.",
    icon: FaBullseye,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    accent: "bg-teal-400",
     image: "/images/image4.jpg",
  },
];

export default function ChairmanMessage() {
  return (
    <>
      {/* CHAIRMAN MESSAGE */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-14">
        {/* Background Decorations */}
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-amber-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT: Chairman Message */}
            <div className="order-2 lg:order-1">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                Leadership & Inspiration
              </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
              A Message From{" "} <br></br>
              <span className="text-[#be9939]">
                Our Chairman
              </span>
            </h2>

              <div className="mt-5 h-1.5 w-20 rounded-full bg-amber-400" />

              <div className="relative mt-8">
                <FaQuoteLeft className="absolute -left-1 -top-4 text-3xl text-blue-100 sm:text-4xl" />

                <p className="relative pl-2 text-justify text-lg font-semibold leading-8 text-slate-700 sm:text-xl sm:leading-9">
                  “Education is not just about academic excellence; it is
                  about nurturing character, inspiring curiosity, and
                  preparing every child to face the future with confidence.”
                </p>
              </div>

              <div className="mt-6 space-y-4 text-justify text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  At Sai Angels Schools, we believe every child has unique
                  potential waiting to be discovered. Our vision is to create
                  an educational environment where knowledge, creativity,
                  discipline, and strong values come together to shape
                  confident and responsible individuals.
                </p>

                <p>
                  We are committed to providing quality education through
                  dedicated educators, innovative teaching practices, and
                  opportunities for students to explore their talents both
                  inside and outside the classroom.
                </p>

                <p>
                  Together with our teachers and parents, we strive to build
                  a supportive learning community that encourages children
                  to dream big, embrace challenges, and contribute positively
                  to society.
                </p>
              </div>
            </div>

            {/* RIGHT: Chairman Image */}
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto max-w-lg pb-10 pl-3 pr-7 pt-3 sm:pl-5 sm:pr-10 sm:pt-5">
                {/* Decorative Frame */}
                <div className="absolute right-0 top-0 h-[78%] w-[75%] rounded-[2rem] border-2 border-amber-400 sm:rounded-[2.5rem]" />

                {/* Main Image */}
                <div className="relative z-10 h-[360px] overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-2xl sm:h-[480px] sm:rounded-[2rem]">
                  <img
                    src="/images/chairman.jpg"
                    alt="Chairman of Sai Angels Schools"
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />

                  {/* Image Gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                      Inspiring the Future
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                      Excellence Through Education
                    </h3>
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute -left-2 bottom-14 -z-0 grid grid-cols-5 gap-2 opacity-60 sm:-left-3">
                  {Array.from({ length: 25 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-1.5 w-1.5 rounded-full bg-blue-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTTO, VISION & MISSION */}
      <section className="relative isolate overflow-hidden bg-orange-500 px-4 py-20 sm:px-6 lg:px-10">
      {/* Decorative top waves */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <svg
          viewBox="0 0 1440 150"
          className="h-24 w-full sm:h-32"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0H1440V45C1320 100 1240 20 1120 45S940 130 800 90 620 20 490 55 280 125 150 65 40 65 0 75Z"
            fill="white"
          />
          <path
            d="M0 68C120 10 170 110 300 75S490 25 610 75 810 125 940 70 1110 10 1240 55 1380 75 1440 45"
            fill="none"
            stroke="#fb923c"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="mx-auto mb-10 max-w-4xl pt-8 text-center sm:pt-10">
        <h2 className="text-3xl font-extrabold italic tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
          Motto, Vision &amp; Mission
        </h2>

        <p className="mt-4 text-base tracking-[0.12em] text-white sm:text-lg md:text-xl">
          Guiding Values for a Brighter Future
        </p>

        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-16 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-1 w-16 rounded-full bg-white" />
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        {values.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8 lg:min-h-[430px]"
            >
              {/* Card heading */}
              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Icon className={`text-4xl ${item.iconColor}`} />
                </div>

                <h3 className="text-2xl font-extrabold text-blue-950 sm:text-3xl">
                  {item.title}
                </h3>
              </div>

              {/* Card content */}
              <div className="relative z-10 mt-5 max-w-[95%] sm:max-w-[90%]">
                <h4 className="text-base font-extrabold leading-7 text-emerald-700">
                  {item.subtitle}
                </h4>

                <p className="mt-4 text-base leading-7 text-slate-700">
                  {item.description}
                </p>

              <img
    src={item.image}
    alt={`$DIL0 - Sai Angels Schools`}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
    
              </div>

              {/* Decorative bottom accent */}
              <div
                className={`absolute -bottom-8 -right-8 h-36 w-64 rotate-[-18deg] rounded-[45%] opacity-20 blur-sm transition duration-500 group-hover:rotate-[-10deg] group-hover:opacity-40 ${item.accent}`}
              />

              {/* Decorative brush strokes */}
              <div className="pointer-events-none absolute bottom-8 right-4 flex rotate-[-25deg] flex-col gap-2 opacity-70">
                <span
                  className={`h-2 w-32 rounded-full ${item.accent}`}
                />
                <span
                  className={`h-2 w-24 translate-x-4 rounded-full ${item.accent}`}
                />
                <span
                  className={`h-1.5 w-28 translate-x-1 rounded-full ${item.accent}`}
                />
              </div>

              {/* Decorative circle */}
              <div
                className={`pointer-events-none absolute -bottom-16 -right-10 h-44 w-44 rounded-full opacity-10 ${item.accent}`}
              />
            </article>
          );
        })}
      </div>

      {/* Decorative bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <svg
          viewBox="0 0 1440 120"
          className="h-16 w-full sm:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0 45C150 110 250 95 390 55S630 25 770 60 1000 110 1150 65 1350 30 1440 55V120H0Z"
            fill="white"
          />
          <path
            d="M0 45C150 110 250 95 390 55S630 25 770 60 1000 110 1150 65 1350 30 1440 55"
            fill="none"
            stroke="#fdba74"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
    </>
  );
}