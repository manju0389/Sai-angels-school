
import type { Metadata } from "next";
import Image from "next/image";
import CBSESchool from "@/components/CBSESchool";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Geo-Tagged Infrastructure | Best CBSE School in Chikmagalur | Top Boarding & PU College",
  description: "Explore geo-tagged infrastructure photos of Sai Angels School in Chikmagalur, featuring its campus, facilities, and learning environment.",
  keywords: ["Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur",
    "Sai Angels School infrastructure", "Geo-tagged school infrastructure", "CBSE School campus photos",
  ],
  alternates: {
    canonical:
      "https://www.saiangelsschool.com/geo-tagged-infrastructure",
  },
  openGraph: {
    title: "Sai Angels School | Geo-Tagged Infrastructure",
    description: "Explore geo-tagged infrastructure and campus photos of Sai Angels School in Chikmagalur.",
    url: "https://www.saiangelsschool.com/geo-tagged-infrastructure",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

const photos = [
  "/images/geotagged/image1.jpg",
  "/images/geotagged/image2.jpg",
  "/images/geotagged/image3.jpg",
  "/images/geotagged/image4.jpg",
  "/images/geotagged/image5.jpg",
];

/** Geo-Tagged Infrastructure Page */
export default function GtiPage() {
  return (
    <main>
      {/* Page banner */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Geo-Tagged Infrastructure
        </h1>
      </section>

      {/* Photos section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Campus Infrastructure
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <div key={photo} className="overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl" >
              <Image src={photo} alt={`Sai Angels School geo-tagged infrastructure photo ${index + 1}`}
               width={600} height={1500}
                className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-[38rem]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* CBSE school information */}
        <div className="mt-10">
          <CBSESchool />
        </div>
      </section>
    </main>
  );
}
