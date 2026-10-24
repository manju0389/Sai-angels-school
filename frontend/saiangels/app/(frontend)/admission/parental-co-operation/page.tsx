
import type { Metadata } from "next";
import { FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Parental Co-Operation | Sai Angels Schools",
  description: "Learn how parents can support children's learning, independence, hygiene, social skills, creativity, and school readiness at Sai Angels Schools, Chikmagalur.",
  keywords: [
    "parental cooperation", "parent guidelines", "school readiness",
    "early childhood education", "Sai Angels Schools", "preschool Chikmagalur",
  ],
  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/parental-cooperation",
  },
  openGraph: {
    title: "Parental Co-Operation | Sai Angels Schools",
    description: "Helpful guidelines for parents to prepare children for school and encourage learning at home.",
    url: "https://www.saiangelsinstitutions.com/parental-cooperation",
    siteName: "Sai Angels Schools", type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const guidelines = [
  "Parents should have a positive attitude towards school, education, and learning.",
  "Help your child with schoolwork and familiarize them with their school books.",
  "Encourage independence through dressing, healthy eating habits, and self-care activities.",
  "Take children to parks, zoos, exhibitions, and relatives' homes to encourage social interaction.",
  "Teach good hygiene habits such as brushing teeth, washing hands, and keeping their surroundings clean.",
  "Encourage good manners such as saying Good Morning, Thank You, and Sorry.",
  "Promote reading, storytelling, sensory learning, and environmental awareness.",
  "Involve children in kitchen activities such as sorting fruits, vegetables, dals, and seeds under adult supervision.",
  "Encourage drawing, coloring, and creative play activities.",
  "Choose educational television programs and age-appropriate toys that support learning.",
];

export default function ParentalPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-5xl text-center">

          <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Parental Co-Operation
          </h1>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {/* Card Header */}
          <div className="bg-[#6b5b5b] px-5 py-6 sm:px-8">
            <h2 className="text-lg font-semibold uppercase leading-relaxed tracking-wide text-white sm:text-xl">
              To Prepare Your Child for School – Help Your Child Bloom
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-100">
              Simple ways to support your child's development at home.
            </p>
          </div>

          {/* Guidelines List */}
          <ol className="divide-y divide-gray-100">
            {guidelines.map((item, index) => (
              <li key={item} className="group border-b border-gray-500 flex items-start gap-4 px-5 py-5 transition-colors duration-200 hover:bg-purple-50 sm:px-8" >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-800 transition-colors group-hover:bg-purple-200">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex min-w-0 flex-1 items-start gap-3 pt-1 ">
                  <FaArrowRight aria-hidden="true" className="mt-1 shrink-0 text-[#773194]" size={14}/>
                  <p className="text-sm leading-7 text-gray-700 sm:text-base">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Footer Message */}
          <div className="border-t border-gray-500 bg-purple-50 px-5 py-6 text-center sm:px-8">
            <h3 className="text-lg font-semibold text-purple-900">
              Every Little Step Makes a Difference!
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Your love, encouragement, and involvement help your child develop the skills needed for a happy and successful school experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
