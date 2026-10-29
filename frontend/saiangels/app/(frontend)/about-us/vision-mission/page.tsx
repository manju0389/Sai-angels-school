
import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Sparkles,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vision & Mission | Sai Angels School, Chikmagalur",
  description: "Discover the vision, mission and core values of Sai Angels School in Chikmagalur, Karnataka, and our commitment to quality education, discipline and holistic student development.",
  keywords: [ "Sai Angels School Vision and Mission", "Sai Angels Schools", "CBSE School Chikmagalur",
    "School Core Values", "Quality Education Chikmagalur", "Holistic Student Development",
  ],
  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/vision-mission",
  },
  openGraph: {
    title: "Vision & Mission | Sai Angels School, Chikmagalur",
    description: "Explore the vision, mission and values of Sai Angels School, inspiring students through education, discipline and holistic development.",
    url: "https://www.saiangelsinstitutions.com/about-us/vision-mission",
    siteName: "Sai Angels Institutions",
    images: [
      {
        url: "https://www.saiangelsinstitutions.com/images/vision-mission.jpg",
        width: 1600, height: 500, alt: "Vision and Mission of Sai Angels School",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const values = [
  {
    number: "01",
    title: "Duty",
    subtitle: "Responsibility with purpose",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-700",
    description: "We believe that every individual has a responsibility towards society, the world and the deeper self. Inspired by the teachings of the Gita, we encourage students to fulfil their duties wholeheartedly, act with integrity and contribute positively to the community.",
  },
  {
    number: "02",
    title: "Discipline",
    subtitle: "The foundation of success",
    icon: Target,
    color: "bg-blue-50 text-blue-700",
    description: "Discipline helps students develop self-control, confidence and a sense of responsibility. Through consistent effort, positive habits and respect for others, we help our students build the foundation for a balanced and successful life.",
  },
  {
    number: "03",
    title: "Devotion",
    subtitle: "Commitment to excellence",
    icon: Heart,
    color: "bg-rose-50 text-rose-700",
    description: "We encourage students to give their best to every task and remain committed to their goals. With perseverance, dedication and a positive attitude, students learn to face challenges and continuously strive for improvement.",
  },
];

export default function VisionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-slate-800">
      {/* Hero Banner */}
      <section className="relative isolate overflow-hidden bg-[#102c50]">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/vision-mission.jpg" alt="Vision and mission of Sai Angels School in Chikmagalur"
            fill priority sizes="100vw" className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102c50] via-[#102c50]/85 to-[#102c50]/40" />
        </div>

        <div className="mx-auto grid min-h-[360px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:min-h-[440px] md:grid-cols-2 lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-amber-200 backdrop-blur-sm">
              <Sparkles size={16} aria-hidden="true" />
              The foundation of our journey
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Vision &amp; <span className="text-amber-300">Mission</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Shaping confident minds, nurturing strong values and inspiring every student to discover 
              their potential and make a meaningful difference in the world.
            </p>
          </div>

          <div className="hidden md:flex md:justify-end">
            <div className="max-w-sm rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
              <Quote
                size={36} className="mb-5 text-amber-300" aria-hidden="true"
              />
              <p className="text-2xl font-semibold leading-relaxed">
                Education is not just about learning. It is about becoming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="our-vision" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-16 lg:px-12" >
        <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
              Who We Are
            </p>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-[#102c50] sm:text-4xl">
              Building a brighter future through meaningful education
            </h2>

            <div className="mt-6 space-y-6 text-justify text-base leading-8 text-slate-600">
              <p>
                At Sai Angels School, our mission is guided by a commitment to empower young minds and 
                help every student work towards their aspirations. We strive to provide quality 
                educational opportunities for students in Chikmagalur and across Karnataka.
              </p>

              <p>
                We believe that education goes beyond textbooks and examinations. It is about developing 
                curiosity, independent thinking, confidence, compassion and the ability to contribute
                positively to society.
              </p>

              <p>
                Through a focus on academic learning, personal growth and strong values, we aim to 
                create an environment where students can discover their strengths and prepare for the 
                opportunities and responsibilities of tomorrow.
              </p>

              <p>
                At Sai Angels School, we also believe that every child deserves the guidance, 
                encouragement and support needed to reach their full potential. By fostering a safe, 
                inclusive and inspiring learning environment, we encourage students to embrace
                challenges, learn from their experiences and develop a lifelong
                love for learning. Our dedicated educators work closely with
                students to nurture their talents, strengthen their character
                and equip them with the knowledge, skills and confidence to succeed in an ever-changing world.
              </p>
            </div>
          </div>

          <aside className="relative min-w-0 lg:sticky lg:top-8">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-amber-200/60 blur-2xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              <QuickLinks />
            </div>
          </aside>
        </div>
      </section>

      {/* Vision and Mission Cards */}
      <section className="border-y border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
              Our Direction
            </p>

            <h2 className="text-3xl font-bold text-[#102c50] sm:text-4xl">
              Our Vision &amp; Mission
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Our vision and mission guide our commitment to meaningful education, character development and lifelong learning.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            <article className="group rounded-3xl border border-slate-200 bg-[#fbfaf7] p-7 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl sm:p-10">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#102c50] text-white transition group-hover:bg-amber-400 group-hover:text-[#102c50]">
                <Eye size={30} aria-hidden="true" />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
                Our Vision
              </p>

              <h3 className="text-2xl font-bold text-[#102c50]">
                Inspiring tomorrow&apos;s leaders
              </h3>

              <p className="mt-5 leading-8 text-slate-600 space-y-6">
                To nurture knowledgeable, confident and compassionate individuals who think 
                independently, uphold strong values and contribute meaningfully to their communities  and the wider world.
              </p>
            </article>

            <article className="group rounded-3xl border border-slate-200 bg-[#fbfaf7] p-7 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl sm:p-10">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-[#102c50] transition group-hover:bg-[#102c50] group-hover:text-white">
                <Target size={30} aria-hidden="true" />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
                Our Mission
              </p>

              <h3 className="text-2xl font-bold text-[#102c50]">
                Empowering every learner
              </h3>

              <p className="mt-5 leading-8 text-slate-600 space-y-6">
                To provide meaningful educational experiences that encourage academic excellence, 
                discipline, creativity, personal growth and a lifelong commitment to learning and service.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="core-values" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-16 lg:px-12" >
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
            What Guides Us
          </p>

          <h2 className="text-3xl font-bold text-[#102c50] sm:text-4xl">
            The Values We Believe In
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Duty, discipline and devotion are the values that help guide our students in their learning and personal development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <span aria-hidden="true" className="absolute right-5 top-3 text-6xl font-black text-slate-100 transition group-hover:text-amber-100" >
                  {value.number}
                </span>

                <div className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${value.color}`} >
                  <Icon size={27} aria-hidden="true" />
                </div>

                <h3 className="relative text-2xl font-bold text-[#102c50]">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm font-semibold text-amber-700">
                  {value.subtitle}
                </p>

                <p className="mt-5 leading-8 space-y-6 text-slate-600">
                  {value.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-20" />
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-[#102c50]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-center lg:px-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              Learn With Purpose
            </p>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Every child deserves the opportunity to grow and thrive.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Discover more about our school, educational approach and opportunities for students.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
