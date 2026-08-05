import QuickLinks from "@/components/QuickLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Pledge | Sai Angels School - Top CBSE School in Chikmagalur",
  description: "Sai Angels School is one of the best CBSE schools in Chikmagalur, offering quality education from primary to PU, boarding facilities, and holistic student development.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", 
    "Best Boarding School in Chikmagalur", "Best PU college in chikmagalur", 
    "Top PU college in chikmagalur", "best primary school in chikmagalur", "best campus in Chikmagalur"
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/about-us/school-pledge",
  },

  openGraph: {
    title: "Sai Angels School | History",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsschool.com/about-us/school-pledge",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

export default function PledgePage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="mx-auto text-center">
          <h1 className="mb-3 text-5xl font-bold text-black">
            Our School Pledge
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Pledge Content */}
          <div className="text-justify lg:col-span-2">
            <p className="rounded-lg bg-[#04243d] p-6 font-bold leading-9 text-white">
              "India is my country. <br />
              All Indians are my Brothers & Sisters. <br />
              I love my country. <br />
              And I am proud of its rich and varied heritage. <br />
              I shall always strive to be worthy of it. <br />
              I shall give my parents, teachers, and all elders respect. <br />
              And treat everyone with courtesy. <br />
              I pledge my devotion to my country and my people. <br />
              In their well-being and prosperity alone <br />
              Lies my happiness."
            </p>
          </div>

          {/* Sidebar with Quick Links */}
          <QuickLinks />
        </div>
      </section>
    </main>
  );
}