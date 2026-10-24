import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Transport | Sai Angels School, Chikmagalur",
  description:
    "Sai Angels School provides safe and reliable transport facilities across Chikmagalur with experienced staff, well-maintained buses, and hygienic food services. One of the best CBSE schools in Chikmagalur.",
  
    keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur",
    "School Transport Chikmagalur", "CBSE School Bus Facility"
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/admission/transport",
  },

  openGraph: {
    title: "Sai Angels School | About Us",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsschool.com/admission/transport",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

export default function TransportPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <Image src="/images/banner16.jpg" alt="Sai Angels School Transport" width={1920} height={500} className="h-72 w-full object-cover" />
      </section>

      {/* Transport Content */}
      <section className="container mx-auto py-6">
        {/* Page Heading */}
        <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          Transport
        </h1>

        <div className="text-justify">
          {/* Introduction */}
          <p className="mb-6 text-base leading-7 text-gray-800">
            When it comes to day scholars' transportation and mid-day meal, we heavily lean on Prashanthi 
            Transport and Food Services, as they are trusted and time tested partner for us.
          </p>

          {/* Safety Information */}
          <p className="mb-6 text-base leading-7 text-gray-800">
            They ensure safe travel for students, offering well maintained and comfortable conveyance 
            with highly experienced and responsible staff at their service. The staff adheres to the duty 
            roster outlined by the management under all circumstances.
          </p>

          {/* Food Services Information */}
          <p className="mb-6 text-base leading-7 text-gray-800">
            To this present now, there has never been any compromising on food quality that is provided 
            as buffet, priced for very reasonable and affordable sum. Kitchen hygiene has always been a 
            prime concern. Food grains, beans, lentils, vegetables and other ingredients are freshly 
            acquired from the market on everyday basis and prepared for the day's meal.
          </p>

          {/* Bus Route PDF Link */}
          <div className="flex w-full justify-center px-4">
          <a href="/images/Bus-Route-List.pdf" target="_blank"
          rel="noopener noreferrer" aria-label="View School and College Bus Route List PDF"
          className="group mt-6 block max-w-xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            
  <div className="bg-[#102c50] px-6 py-5 text-white">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className="h-8 w-8" aria-hidden="true"
        >
          <path d="M5 17h14a2 2 0 0 0 2-2V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a2 2 0 0 0 2 2Z" />
          <path d="M3 11h18M7 17v2m10-2v2M7 8h.01M17 8h.01" />
          <circle cx="7.5" cy="14" r="1" />
          <circle cx="16.5" cy="14" r="1" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold leading-snug sm:text-xl">
          School & College Bus Routes
        </p>
        <p className="mt-1 text-sm text-blue-100">
          Find your route. Plan your journey.
        </p>
      </div>
    </div>
  </div>

  <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
    <div className="flex min-w-0 items-center gap-3">
      <div className="rounded-lg bg-yellow-100 p-2.5 text-[#102c50]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className="h-6 w-6" aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6M8 13h8M8 17h8" />
        </svg>
      </div>

      <div>
        <p className="font-bold text-[#102c50]">
          PDF document · Opens in a new tab
        </p>
      </div>
    </div>

    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-[#102c50] transition-transform duration-300 group-hover:translate-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" className="h-5 w-5" aria-hidden="true"
      >
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </span>
  </div>

  <div className="h-1 w-full bg-yellow-400 transition-colors duration-300 group-hover:bg-yellow-500" />
</a>
</div>

        </div>
      </section>
    </main>
  );
}