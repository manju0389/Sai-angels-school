
import type { Metadata } from "next";
import QuickLinks from "@/components/QuickLinks";

export const metadata: Metadata = {
  title: "School Pledge | Sai Angels School, Chikmagalur",
  description: "Read the school pledge of Sai Angels School in Chikmagalur, promoting patriotism, respect, unity, and responsibility.",

  keywords: [ "Sai Angels School Pledge", "School Pledge", "CBSE School Chikmagalur",
    "Sai Angels Institutions", "School Values and Patriotism",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/school-pledge",
  },

  openGraph: {
    title: "Our School Pledge | Sai Angels School",
    description: "Discover the values of patriotism, respect, unity, and responsibility upheld by Sai Angels School.",
    url: "https://www.saiangelsinstitutions.com/about-us/school-pledge",
    siteName: "Sai Angels Institutions",
    locale: "en_IN",
    type: "website",
  },
};

const pledgeLines = [
  "India is my country.",
  "All Indians are my Brothers & Sisters.",
  "I love my country.",
  "And I am proud of its rich and varied heritage.",
  "I shall always strive to be worthy of it.",
  "I shall give my parents, teachers, and all elders respect.",
  "And treat everyone with courtesy.",
  "I pledge my devotion to my country and my people.",
  "In their well-being and prosperity alone",
  "Lies my happiness.",
];

export default function PledgePage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our School Pledge
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-purple-100 sm:text-base">
            A pledge that inspires patriotism, respect, unity, and
            responsibility.
          </p>
        </div>
      </section>

      {/* Pledge Content */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Main Pledge */}
          <div className="min-w-0 lg:col-span-2">
            <article className="rounded-2xl bg-[#04243d] p-6  text-white shadow-lg sm:p-10">
              <h2 className="mb-8 text-2xl text-center font-bold sm:text-3xl">
                National Pledge
              </h2>

              <div className="space-y-3 text-base font-medium leading-8 sm:text-lg sm:leading-9">
                {pledgeLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </article>
          </div>

          {/* Quick Links Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>
      </section>
    </main>
  );
}