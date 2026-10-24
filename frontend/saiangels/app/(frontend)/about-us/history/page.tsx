import QuickLinks from "@/components/QuickLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History | Sai Angels School - Top CBSE School in Chikmagalur",
  description: "Sai Angels School is one of the best CBSE schools in Chikmagalur, offering quality education from primary to PU, boarding facilities, and holistic student development.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", 
    "Best Boarding School in Chikmagalur", "Best PU college in chikmagalur", 
    "Top PU college in chikmagalur", "best primary school in chikmagalur", "best campus in Chikmagalur"
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/history",
  },

  openGraph: {
    title: "Sai Angels School | History",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsinstitutions.com/about-us/history",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto text-center">
          <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our History
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* History Content */}
          <div className="text-justify lg:col-span-2 space-y-6 text-base leading-8 text-slate-600">
            <p>
              Bhagawan Sri Sai Baba’s generous blessings have given our town Chikmagalur, Sri Sai Angels 
              group of Educational Institutions. It has been the pride of ‘The Coffee Land’ ever since.
            </p>

            <p>
              The idea was envisaged as a humble dream in 1993, with only 15 students, which blossomed 
              its way to the flourishing service for our town children now amounting to about 1,500 in 
              all. That tender dream intertwined the strands of endeavours into a strong institution Sri 
              Sai Angels today where we exult in delivering 100% results in class X CBSE exam since 2007 
              until now with top ranking students.
            </p>

            <p>
              It is our healthy approach to every endeavour we pursue with the almighty’s grace that 
              brings forth unimaginable outcomes which infuse tireless spirit in us furthermore to do better every time.
            </p>

            <p>
              With its success and consistent imploring from parents, we started Sai Angels Pre-University 
              College for Science in 2007. The PUC brought us honor in its very first year with a 100% 
              pass result and established a remarkable record in Chikmagalur District within five years. 
              Earlier, Chikmagalur's PUC rank stood twelfth in the state, but Sai Angels PU raised the 
              bar to sixth place in Karnataka. In CET, Sai Angels PU College secured the first position 
              in the district with top scorers.
            </p>
          </div>

          {/* Right Sidebar - Quick Links */}
          <QuickLinks />
        </div>
      </section>
    </main>
  );
}