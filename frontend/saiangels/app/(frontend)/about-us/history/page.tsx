
import type { Metadata } from "next";
import QuickLinks from "@/components/QuickLinks";

export const metadata: Metadata = {
  title: "Our History | Sai Angels School, Chikmagalur",
  description: "Discover the history of Sri Sai Angels Group of Educational Institutions, from its humble beginnings in 1993 to its growth in school and pre-university education.",

  keywords: [ "Sai Angels School History", "Sai Angels Institutions Chikmagalur",
    "CBSE School Chikmagalur", "Sai Angels PU College", "Educational Institutions in Chikmagalur",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/history",
  },

  openGraph: {
    title: "Our History | Sai Angels Institutions",
    description: "Explore the journey of Sri Sai Angels Group of Educational Institutions and its commitment to education and student achievement in Chikmagalur.",
    url: "https://www.saiangelsinstitutions.com/about-us/history",
    siteName: "Sai Angels Institutions",
    locale: "en_IN",
    type: "website",
  },
};

const historyParagraphs = [
  "With the generous blessings of Bhagawan Sri Sathya Sai Baba, Sri Sai Angels Group of Educational Institutions was established in Chikmagalur and has grown to become a source of pride for the Coffee Land.",

  "The idea began as a humble dream in 1993, with just 15 students. Over the years, it grew into an educational institution serving approximately 1,500 students. Sri Sai Angels continues to strive for academic excellence, with the school achieving 100% results in the Class X CBSE examinations from 2007 onward, as described in its institutional history.",

  "Our commitment to every endeavour, guided by faith and dedication, inspires us to achieve meaningful outcomes and continually improve the quality of education and service we provide.",

  "Following the school's growth and requests from parents, Sai Angels Pre-University College for Science was established in 2007. The college achieved a 100% pass result in its first year and subsequently earned recognition in Chikmagalur District. Within five years, its district standing improved, and the college achieved notable results in the Karnataka Common Entrance Test (CET).",
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our History
          </h1>
        </div>
      </section>

      {/* History Content */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <article className="min-w-0 space-y-6 lg:col-span-2">
            {historyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-justify space-y-6 text-base leading-8 text-slate-600" >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Quick Links Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>
      </section>
    </main>
  );
}
