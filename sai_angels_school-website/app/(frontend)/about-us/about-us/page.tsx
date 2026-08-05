import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import type { Metadata } from "next";

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
    canonical: "https://www.saiangelsschool.com/about",
  },

  openGraph: {
    title: "Sai Angels School | About Us",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      <section className="w-full">
        <Image src="/images/about-banner.jpg" alt="Students at Sai Angels School" width={1600} height={500} className="h-auto w-full object-cover"/>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          About Us
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="text-justify lg:col-span-2 max-w-4xl">
            <p className="mb-6 text-base leading-7 text-gray-800">
              "Education is natural, harmonious and progressive development of man's innate powers."It 
              inculcates certain values and principles and also prepares a human being for social 
              life.
            </p>

            <p className="mb-6 text-base leading-7 text-gray-800">
              Sai Angels is committed to serving society in an environment dedicated to student success. 
              The Institution has always focused on educational excellence and the quality of education 
              among the students. The institution strives to promote in young minds a sense of 
              responsibility for their own development and an understanding of their duties as members of 
              a society. The Institution encourages students to learn, the ability to think clearly and 
              express themselves effectively, the habit of analytical and reflective thought, and an 
              awareness about themselves, their heritage, their culture, their environment and their 
              country.
            </p>

            <p className="mb-6 text-base leading-7 text-gray-800">
              Sri Sai angels institution perches on a robust base of Indian secular, spiritual and 
              ethical values that mould children to well rounded personalities. We emphasize, besides 
              curricular, on co-curricular participation of the students as well, such as; art, dance, 
              music, sports, hobby clubs and so on.
            </p>

            <p className="mb-6 text-base leading-7 text-gray-800">
              Here at Sai Angels, we are totally committed to the growth of our children employing all 
              the competent resources at our disposal being any situation in hand. It is very efficiently 
              taken care of by our highly spirited and vibrant teaching faculty that undergoes periodical 
              orientation and training workshops conducted by the professionals invited from esteemed 
              organizations from time to time.
            </p>

            <p className="text-base leading-7 text-gray-800">
              Inspired by the life of our patron saint His Holiness Bhagavan Sri Satya Sai Baba itself, 
              our ultimate motto is to LOVE ALL AND SERVE ALL.
            </p>
          </div>

          <QuickLinks />
        </div>
      </section>
    </main>
  );
}