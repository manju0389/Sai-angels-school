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
        <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 md:text-4xl">
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
          <a href="/images/Bus-Route-List.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
            <div className="mt-5 cursor-pointer rounded bg-yellow-400 px-6 py-4 text-center font-semibold text-black shadow-md transition hover:bg-yellow-500">
              Click here for School and College Bus Route List
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}