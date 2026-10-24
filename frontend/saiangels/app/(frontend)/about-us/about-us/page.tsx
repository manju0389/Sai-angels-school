import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Heart,
  BookOpen,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Sai Angels School - Best CBSE School in Chikmagalur",
  description: "Sai Angels School is one of the best CBSE schools in Chikmagalur, offering quality education from primary to PU, boarding facilities, and holistic student development.",

  keywords: [
    "Sai Angels School", "Chikmagalur best school", "Best school in Chikmagalur", 
    "Top CBSE School in Chikmagalur", "Best Primary School in Chikmagalur", 
    "Best Campus in Chikmagalur", "Top PU College in Chikmagalur",
    "CBSE School Chikmagalur", "Best Boarding School in Chikmagalur", "Best PU College in Chikmagalur", 
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about",
  },

  openGraph: {
    title: "Sai Angels School | About Us",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsinstitutions.com/about",
    siteName: "Sai Angels School",
    images: [
      {
        url: "/images/about-banner.jpg", width: 1600, height: 500, alt: "Sai Angels School",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const highlights = [
  {
    icon: BookOpen,
    title: "Academic Learning",
    description:
      "Encouraging curiosity, independent thinking and a strong foundation for lifelong learning.",
  },
  {
    icon: Users,
    title: "Holistic Development",
    description:
      "Supporting student growth through curricular, co-curricular and personal development.",
  },
  {
    icon: Heart,
    title: "Values and Character",
    description:
      "Nurturing compassion, responsibility, respect and a spirit of service to others.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      <section className="w-full">
        <Image src="/images/about-banner.jpg" alt="Students at Sai Angels School" width={1600} height={500} className="h-auto w-full object-cover"/>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          About Us
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="text-justify lg:col-span-2 max-w-4xl">
            <blockquote className="mb-8 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-justify text-lg font-medium italic leading-8 text-[#102c50]">
                "Education is natural, harmonious and progressive development
                of man's innate powers."
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                A philosophy that highlights the importance of nurturing individual potential and preparing students for life in society.
              </p>
            </blockquote>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p className="text-justify">
                Sai Angels School is committed to serving society through an educational environment 
                focused on student learning and development. We value educational excellence and strive 
                to encourage young minds to take responsibility for their own growth while understanding their duties as members of society.
              </p>

              <p className="text-justify">
                We encourage students to develop the ability to think clearly, express themselves 
                effectively and approach challenges with analytical and reflective thinking. We also aim 
                to help them understand themselves, their heritage, their culture, their
                environment and their country.
              </p>

              <p className="text-justify">
                Rooted in Indian secular, spiritual and ethical values, our educational philosophy seeks 
                to nurture well-rounded personalities. Alongside curricular learning, we value
                co-curricular participation in activities such as art, dance, music, sports and hobby 
                clubs, helping students explore their interests and develop their individual strengths.
              </p>

              <p className="text-justify">
                We are committed to supporting the growth of our students through dedicated teaching and 
                guidance. Our teaching faculty works towards creating a positive learning environment, 
                with professional development and training helping educators continue to strengthen their teaching practices.
              </p>

              <p className="text-justify">
                Inspired by the life and teachings of our patron saint, His Holiness Bhagavan Sri Sathya 
                Sai Baba, we embrace the guiding principle of{" "}
                <span className="font-bold text-[#102c50]">
                  "Love All and Serve All."
                </span>{" "}
                This principle reflects the importance we place on kindness, service, respect and responsibility in everyday life.
              </p>
            </div>
          </div>

          {/* Right Sidebar - Quick Links */}
          <aside className="self-start lg:sticky lg:top-8">
              <QuickLinks />
          </aside>
          
        </div>

        <article className="min-w-0 lg:col-span-8">

            {/* Highlights */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-[#102c50] sm:text-3xl">
                What We Stand For
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg" >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                        <Icon size={24} />
                      </div>

                      <h3 className="text-lg font-bold text-[#102c50]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-justify text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

      </section>
    </main>
  );
}
