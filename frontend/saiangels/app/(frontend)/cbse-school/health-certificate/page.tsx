
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import CBSESchool from "@/components/CBSESchool";

export const metadata: Metadata = {
  title: "Water, Health & Sanitation Certificates | Best CBSE School in Chikmagalur",
  description: "View the Water, Health and Sanitation Certificates of Sai Angels School in Chikmagalur, providing quality CBSE education, boarding facilities, PU college, and a world-class campus.",
  keywords: [ "Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur", "Best PU College in Chikmagalur",
    "Top PU College in Chikmagalur", "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur",
    "Water Certificate Sai Angels School", "Health Certificate Sai Angels School",
    "Sanitation Certificate Sai Angels School",
  ],
  alternates: {
    canonical:
      "https://www.saiangelsschool.com/water-health-sanitation-certificate",
  },
  openGraph: {
    title: "Sai Angels School | Water, Health & Sanitation Certificates",
    description: "View the Water, Health and Sanitation Certificates of Sai Angels School in Chikmagalur.",
    url: "https://www.saiangelsschool.com/water-health-sanitation-certificate",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch the Water Certificate PDF details.
async function getWaterCertificatePDF() {
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/cbse-documents/pdf/water-certificate`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch Water Certificate PDF: ${res.status}`
      );
      return null;
    }

    const result = await res.json();
    return result.data ?? null;
  } catch (error) {
    console.error("Failed to fetch Water Certificate PDF:", error);
    return null;
  }
}

// Fetch the Health & Sanitation Certificate PDF details.
async function getHealthCertificatePDF() {
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/cbse-documents/pdf/health-certificate`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch Health & Sanitation Certificate PDF: ${res.status}`
      );
      return null;
    }

    const result = await res.json();
    return result.data ?? null;
  } catch (error) {
    console.error(
      "Failed to fetch Health & Sanitation Certificate PDF:",
      error
    );
    return null;
  }
}

/** Water, Health & Sanitation Certificates Page */
export default async function WaterHealthCertificatePage() {
  const [waterPdf, healthPdf] = await Promise.all([
    getWaterCertificatePDF(),
    getHealthCertificatePDF(),
  ]);

  const documentUrl = apiUrl?.replace(/\/$/, "");

  return (
    <main>
      {/* Page banner */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Water, Health & Sanitation Certificates
        </h1>
      </section>

      {/* Certificate PDF cards */}
      <section className="container mx-auto mt-5 px-4 py-6">
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {/* Water Certificate */}
          {waterPdf?._id && documentUrl ? (
            <Link href={`${documentUrl}/cbse-documents/view/${waterPdf._id}`}
              target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-blue-600 p-1 transition hover:bg-blue-700"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-4 font-semibold text-white">
                <FileText className="h-6 w-6 shrink-0" />

                <div>
                  <h2 className="font-semibold">
                    Water Certificate
                  </h2>

                  <div className="flex items-center gap-1 border-t pt-2 text-xs">
                    Click here
                    <MousePointerClick className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">
              Water Certificate PDF is currently unavailable.
            </p>
          )}

          {/* Health & Sanitation Certificate */}
          {healthPdf?._id && documentUrl ? (
            <Link href={`${documentUrl}/cbse-documents/view/${healthPdf._id}`}
              target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-green-600 p-1 transition hover:bg-blue-700"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-4 font-semibold text-white">
                <FileText className="h-6 w-6 shrink-0" />

                <div>
                  <h2 className="font-semibold">
                    Health & Sanitation Certificate
                  </h2>

                  <div className="flex items-center gap-1 border-t pt-2 text-xs">
                    Click here
                    <MousePointerClick className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">
              Health & Sanitation Certificate PDF is currently unavailable.
            </p>
          )}
        </div>

        {/* CBSE school information */}
        <CBSESchool />
      </section>
    </main>
  );
}
