import CBSESchool from "@/components/CBSESchool";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Mandatory Disclosure | Best CBSE School in Chikmagalur | Top Boarding & PU College",
  description:
    "View the Mandatory Disclosure of our institution. We are recognized as one of the best CBSE schools in Chikmagalur, offering primary education, PU college, boarding facilities, and a world-class campus.",
  keywords: [
    "Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur",
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/mandatory-disclosure",
  },

openGraph: {
    title: "Sai Angels School | Mandatory Disclosure",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsschool.com/mandatory-disclosure",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};


const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Fetch the Mandatory Disclosure PDF details
 */
async function getMandatoryDisclosurePDF() {
  const res = await fetch(
    `${apiUrl}/cbse-documents/pdf/mandatory-disclosure`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();

  return result.data;
}

/**
 * Mandatory Disclosure Page
 */
export default async function MandatoryDisclosurePage() {
  // Fetch PDF information from the API
  const pdf = await getMandatoryDisclosurePDF();

  // Extract the PDF URL if available
  const pdfLink = pdf?.pdf_url || null;

  return (
    <main>
      {/* Page Banner */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-10 px-6 mb-[4%]">
        <h1 className="text-4xl font-bold text-black text-center">
          Mandatory Disclosure
        </h1>
      </section>

      {/* PDF Section */}
      <section className="container mx-auto py-6">
        <div className="flex justify-center mb-6">
          {pdfLink ? (
            <Link href={`${apiUrl}/cbse-documents/view/${pdf._id}`} target="_blank" rel="noopener noreferrer"
              className="group rounded-lg bg-blue-600 p-1 hover:bg-blue-700 transition">
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-3 text-white font-semibold">
                {/* PDF Icon */}
                <FileText className="w-5 h-5" />

                <div>
                  {/* PDF Title */}
                  <div>Mandatory Disclosure</div>

                  {/* Click Instruction */}
                  <div className="flex items-center gap-1 text-xs border-t pt-2">
                    Click here
                    <MousePointerClick className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">PDF not available.</p>
          )}
        </div>

        {/* CBSE School Information */}
        <CBSESchool />
      </section>
    </main>
  );
}