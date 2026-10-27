
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import CBSESchool from "@/components/CBSESchool";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parents Teachers Association | Best CBSE School in Chikmagalur | Top Boarding & PU College",
  description: "View the Parents Teachers Association details of Sai Angels School in Chikmagalur, promoting parent-teacher collaboration and quality education through CBSE schooling, PU college, and boarding facilities.",
  keywords: [ "Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur",
    "Parents Teachers Association Chikmagalur", "Sai Angels School PTA", "CBSE School PTA",
  ],
  alternates: {
    canonical:
      "https://www.saiangelsschool.com/parents-teachers-association",
  },
  openGraph: {
    title: "Sai Angels School | Parents Teachers Association",
    description: "Learn about the Parents Teachers Association of Sai Angels School in Chikmagalur.",
    url:"https://www.saiangelsschool.com/parents-teachers-association",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch the Parents Teachers Association PDF details.
 */
async function getPtaPDF() {
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/cbse-documents/pdf/pta`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch PTA PDF: ${res.status}`
      );
      return null;
    }

    const result = await res.json();
    return result.data ?? null;
  } catch (error) {
    console.error("Failed to fetch PTA PDF:", error);
    return null;
  }
}

/** Parents Teachers Association Page */
export default async function PtaPage() {
  const pdf = await getPtaPDF();
  const documentUrl = apiUrl?.replace(/\/$/, "");

  return (
    <main>
      {/* Page banner */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Parents Teachers Association
        </h1>
      </section>

      {/* Centered PDF link */}
      <section className="container mx-auto mt-5 px-4 py-6">
        <div className="mt-5 flex justify-center">
          {pdf?._id && documentUrl ? (
            <Link href={`${documentUrl}/cbse-documents/view/${pdf._id}`}
              target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-blue-600 p-1 transition hover:bg-blue-700"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-3 font-semibold text-white">
                <FileText className="h-5 w-5" />

                <div>
                  <div>Parents Teachers Association</div>

                  <div className="flex items-center gap-1 border-t pt-2 text-xs">
                    Click here
                    <MousePointerClick className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">
              Parents Teachers Association PDF is currently unavailable.
            </p>
          )}
        </div>

        {/* CBSE school information */}
        <CBSESchool />
      </section>
    </main>
  );
}
