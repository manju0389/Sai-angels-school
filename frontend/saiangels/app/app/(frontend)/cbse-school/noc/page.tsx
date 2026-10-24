import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import CBSESchool from "@/components/CBSESchool";

export const metadata: Metadata = {
  title: "No Objection Certificate (NOC) | Best CBSE School in Chikmagalur | Sai Angels School",
  description: "View the No Objection Certificate (NOC) of Sai Angels School in Chikmagalur, Karnataka.",
  keywords: [ "Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur", "No Objection Certificate",
    "NOC Sai Angels School", "CBSE School NOC Chikmagalur",
  ],
  alternates: {
    canonical:
      "https://www.saiangelsschool.com/no-objection-certificate",
  },
  openGraph: {
    title: "Sai Angels School | No Objection Certificate",
    description: "View the No Objection Certificate of Sai Angels School in Chikmagalur, Karnataka.",
    url: "https://www.saiangelsschool.com/no-objection-certificate",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch the No Objection Certificate PDF details from the backend.
async function getNocPDF() {
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/cbse-documents/pdf/noc`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch No Objection Certificate PDF: ${res.status}`
      );
      return null;
    }

    const result = await res.json();
    return result.data ?? null;
  } catch (error) {
    console.error(
      "Failed to fetch No Objection Certificate PDF:",
      error
    );
    return null;
  }
}

/** No Objection Certificate Page */
export default async function NocPage() {
  const pdf = await getNocPDF();

  return (
    <main>
      {/* Page banner */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          No Objection Certificate
        </h1>
      </section>

      {/* Centered PDF link */}
      <section className="container mx-auto mt-5 px-4 py-6">
        <div className="mt-5 flex justify-center">
          {pdf?._id ? (
            <Link href={`${apiUrl}/cbse-documents/view/${pdf._id}`}
              target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-blue-600 p-1 transition hover:bg-blue-700"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-3 font-semibold text-white">
                <FileText className="h-5 w-5" />

                <div>
                  <div>No Objection Certificate</div>
                  <div className="flex items-center gap-1 border-t pt-2 text-xs">
                    Click here
                    <MousePointerClick className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">
              No Objection Certificate PDF is currently unavailable.
            </p>
          )}
        </div>

        {/* CBSE school information */}
        <CBSESchool />
      </section>
    </main>
  );
}
