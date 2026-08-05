import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision & Mission | Sai Angels School - Top CBSE School in Chikmagalur",
  description:
    "Sai Angels School is one of the best CBSE schools in Chikmagalur offering quality education, boarding facilities, and holistic development. Learn about our vision and mission.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU college in Chikmagalur", "Top PU college in Chikmagalur", "best primary school in Chikmagalur",
    "best campus in Chikmagalur", "Sai Angels School", "CBSE School", "Education in Chikmagalur",
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/vision-mission",
  },

  openGraph: {
    title: "Vision & Mission | Sai Angels School",
    description:
      "Discover the vision and mission of Sai Angels School, one of the top CBSE schools in Chikmagalur.",
    url: "https://www.saiangelsschool.com/about",
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

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <Image src="/images/Vision-Mission.jpg" alt="Vision-Mission" width={1600} height={500} className="h-auto w-full object-cover"/>
      </section>

      {/* Vision and Mission Content */}
      <section className="container mx-auto py-6">
        <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Vision and Mission
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="text-justify lg:col-span-2">
            <p className="mb-7 text-base leading-7 text-gray-800">
              Our mission is guided by our commitment to empower young minds to achieve their goals by 
              providing access to high-quality education to the residents of Chikmagalur and all over 
              Karnataka. As an educational institution with a diverse student population, we provide 
              education and learning opportunities with a focus on excellence in all that we do.
            </p>

            <h2 className="mb-3 text-3xl font-bold text-black">
              We believe in
            </h2>

            <p className="mb-6 text-base leading-7 text-gray-800">
              <i className="mb-2 block text-2xl font-bold">Duty</i>
              According to Gita, “We have a duty towards human society, we have a duty to ourselves, we 
              have a duty to the world, we have a duty to the antaratman, the deepest Self within us 
              which pervades the Cosmos.” Here at Sai Angels, we believe in doing our duty
              wholeheartedly with all the dedication and giving back to society.
            </p>

            <p className="mb-6 text-base leading-7 text-gray-800">
              <i className="mb-2 block text-2xl font-bold">Discipline</i>
              Discipline is important in every aspect of life in order to be successful and free, and it 
              allows one to have power and control in life. A disciplined person is free of the chaos 
              that people without that skill experience.
            </p>

            <p className="mb-6 text-base leading-7 text-gray-800">
              <i className="mb-2 block text-2xl font-bold">Devotion</i>
              Here at Sai Angels, we believe in devoting our one hundred percent towards our work to stay 
              on the right track and work towards perfection. There may be difficult times, but the key 
              word is devotion to always move towards one’s target. We will not stop working hard, and 
              success will come to us eventually.
            </p>
          </div>

          {/* Quick Links Sidebar */}
          <QuickLinks />
        </div>
      </section>
    </main>
  );
}