
import type { Metadata } from "next";
import AdmissionEnquiryForm from "@/components/AdmissionForm";

export const metadata: Metadata = {
  title: "Admission | Sai Angels Schools, Chikmagalur",
  description: "Learn about admission guidelines for Little Sai Angels Pre School, Sai Angels School, Sai Angels Boarding Home, and Sai Cherubs International in Chikmagalur, Karnataka.",
  keywords: ["Sai Angels School Chikmagalur", "Preschool in Chikmagalur", "Schools in Chikmagalur",
    "Sai Cherubs International", "Sai Angels Boarding Home", "Sai Angels School Admission",
  ],
  alternates: {
    canonical:
      "https://www.saiangelsinstitutions.com/admission/admission",
  },
  openGraph: {
    title: "Admission | Sai Angels Schools, Chikmagalur",
    description: "Explore school, PU College, and boarding home admission guidelines at Sai Angels Institutions, Chikmagalur.",
    url: "https://www.saiangelsinstitutions.com/admission/admission",
    siteName: "Sai Angels Schools",
    type: "website",
    images: [
      {
        url: "https://www.saiangelsinstitutions.com/images/banner15.jpg", alt: "Sai Angels School, Chikmagalur",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AdmissionPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      <section className="w-full">
        <img src="/images/banner15.jpg" alt="Sai Angels School, Chikmagalur" className="h-auto w-full object-cover"/>
      </section>

      <section className="container mx-auto px-4 py-6">
        <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          Admission
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="text-justify lg:col-span-2">
            <h2 className="mb-3 text-2xl font-bold text-[#102c50]">
              Guidelines for Admission to School
            </h2>

            <ul className="mb-8 list-disc space-y-3 pl-6 text-gray-700">
              <li>
                <strong>Nursery and Cherubs:</strong> 
                For information regarding nursery and Cherubs admissions, please contact the school.
              </li>
              <li>
                <strong>LKG Admission:</strong> 
                The child should be at least 3 years and 6 months old as of 1st June.
              </li>
              <li>
                <strong>First Grade Admission:</strong> 
                The child should be at least 5 years and 6 months old as of 1st June.
              </li>
              <li>
                <strong>Other Admission Enquiries:</strong> 
                Please contact us for further information. Our staff will be happy to assist you.
              </li>
            </ul>

            <h2 className="mb-3 text-2xl font-bold text-[#102c50]">
              Guidelines for Admission to PU College
            </h2>

            <p className="mb-8 text-base leading-7 text-gray-800">
              Students must have completed their SSLC examination through the State Board, CBSE, or 
              ICSE. The available science combinations are PCMB, PCMC, and PCME. Students
              must qualify in a basic entrance test based on the 10th-standard science syllabus.
            </p>

            <h2 className="mb-3 text-2xl font-bold text-[#102c50]">
              Guidelines for Admission to Boarding Home
            </h2>

            <p className="mb-6 text-base leading-7 text-gray-800">
              We provide a spacious and well-organised boarding facility for students from outside 
              Chikmagalur. For details about boarding facilities and admission procedures, please contact us.
            </p>
          </div>

          <AdmissionEnquiryForm />
        </div>
      </section>
    </main>
  );
}
