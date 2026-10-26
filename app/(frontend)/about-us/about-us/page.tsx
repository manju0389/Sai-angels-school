
import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Heart, Users } from "lucide-react";
import QuickLinks from "@/components/QuickLinks";

export const metadata: Metadata = {
  title: "About Us | Sai Angels School - Best CBSE School in Chikmagalur",
  description: "Sai Angels School in Chikmagalur provides quality education, boarding facilities, and holistic student development.",

  keywords: ["Sai Angels School", "Best School in Chikmagalur", "CBSE School Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Boarding School in Chikmagalur", "Top PU College in Chikmagalur",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/about-us",
  },

  openGraph: {
    title: "About Us | Sai Angels School",
    description: "Discover Sai Angels School and our commitment to academic excellence, values, and holistic education in Chikmagalur.",
    url: "https://www.saiangelsinstitutions.com/about-us/about-us",
    siteName: "Sai Angels Institutions",
    images: [
      {
        url: "/images/about-banner.jpg",
        width: 1600, height: 500, alt: "Students at Sai Angels School",
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
    description: "Encouraging curiosity, independent thinking, and a strong foundation for lifelong learning.",
  },
  {
    icon: Users,
    title: "Holistic Development",
    description: "Supporting student growth through curricular, co-curricular, and personal development.",
  },
  {
    icon: Heart,
    title: "Values and Character",
    description: "Nurturing compassion, responsibility, respect, and a spirit of service to others.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* About banner */}
      <section className="w-full">
        <Image
          src="/images/about-banner.jpg" alt="Students at Sai Angels School" width={1600} height={500} priority
          sizes="100vw" className="h-auto w-full object-cover"
        />
      </section>

      {/* About content */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <h1 className="mb-8 text-center text-3xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          About Us
        </h1>

        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="min-w-0 lg:col-span-2">
            <blockquote className="mb-8 rounded-2xl border-l-4 border-amber-400 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-justify text-lg font-medium italic leading-8 text-[#102c50]">
                &quot;Education is natural, harmonious and progressive
                development of man&apos;s innate powers.&quot;
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                A philosophy that highlights the importance of nurturing
                individual potential and preparing students for life in society.
              </p>
            </blockquote>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p className="text-justify">
                Sai Angels School is committed to serving society through an educational environment 
                focused on student learning and development. We value educational excellence and 
                encourage young minds to take responsibility for their own growth while
                understanding their duties as members of society.
              </p>

              <p className="text-justify">
                We encourage students to think clearly, express themselves effectively, and approach 
                challenges with analytical and reflective thinking. We also help them understand 
                themselves, their heritage, their culture, their environment, and their country.
              </p>

              <p className="text-justify">
                Rooted in Indian secular, spiritual, and ethical values, our educational philosophy 
                seeks to nurture well-rounded personalities. Alongside curricular learning, we value
                participation in art, dance, music, sports, and hobby clubs, helping students explore 
                their interests and develop their individual strengths.
              </p>

              <p className="text-justify">
                We are committed to supporting student growth through dedicated teaching and guidance. 
                Our faculty works to create a positive learning environment, while professional 
                development and training help educators strengthen their teaching practices.
              </p>

              <p className="text-justify">
                Inspired by the life and teachings of our patron saint, His Holiness Bhagavan 
                Sri Sathya Sai Baba, we embrace the guiding
                principle of{" "}
                <span className="font-bold text-[#102c50]">
                  &quot;Love All and Serve All.&quot;
                </span>{" "}
                This principle reflects our commitment to kindness, service,
                respect, and responsibility in everyday life.
              </p>
            </div>
          </div>

          {/* Quick links sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>

        {/* Highlights */}
        <section className="mt-12 md:mt-16">
          <h2 className="mb-6 text-2xl font-bold text-[#102c50] sm:text-3xl">
            What We Stand For
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-amber-700">
                  <Icon size={24} aria-hidden="true" />
                </div>

                <h3 className="text-lg font-bold text-[#102c50]">
                  {title}
                </h3>

                <p className="mt-3 text-justify text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}