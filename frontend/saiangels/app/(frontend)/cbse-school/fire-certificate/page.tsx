
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import Image from "next/image";
import CBSESchool from "@/components/CBSESchool";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Fire Certificate | Best CBSE School in Chikmagalur | Top Boarding & PU College",
  description: "View the Fire Certificate of Sai Angels School in Chikmagalur, offering quality CBSE education, PU college, boarding facilities, and a world-class campus.",
  keywords: [ "Chikmagalur best school", "Best CBSE School in Chikmagalur",
    "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur", "Best Primary School in Chikmagalur",
    "Best Campus in Chikmagalur", "Fire Certificate Sai Angels School",
  ],
  alternates: {
    canonical: "https://www.saiangelsschool.com/fire-certificate",
  },
  openGraph: {
    title: "Sai Angels School | Fire Certificate",
    description: "View the Fire Certificate of Sai Angels School in Chikmagalur.",
    url: "https://www.saiangelsschool.com/fire-certificate",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const photos = [
  "/images/fire-certificate/image1.jpeg",
  "/images/fire-certificate/image2.jpeg",
  "/images/fire-certificate/image3.jpeg",
  "/images/fire-certificate/image4.jpeg",
  "/images/fire-certificate/image5.jpeg",
  "/images/fire-certificate/image6.jpeg",
  "/images/fire-certificate/image7.jpeg",
];

/**
 * Fetch the Fire Certificate PDF details from the backend.
 */
async function getFireCertificatePDF() {
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured.");
    return null;
  }

  try {
    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/cbse-documents/pdf/fire-certificate`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch Fire Certificate PDF: ${res.status}`
      );
      return null;
    }

    const result = await res.json();
    return result.data ?? null;
  } catch (error) {
    console.error("Failed to fetch Fire Certificate PDF:", error);
    return null;
  }
}

/** Fire Certificate Page */
export default async function FireCertificatePage() {
  const pdf = await getFireCertificatePDF();

  return (
    <main>
      {/* Page banner */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Fire Certificate
        </h1>
      </section>

      {/* Centered PDF link */}
      <section className="container mx-auto mt-5 px-4 py-6">
        <div className="mt-5 flex justify-center">
          {pdf?._id && apiUrl ? (
            <Link href={`${apiUrl.replace(/\/$/, "")}/cbse-documents/view/${pdf._id}`}
              target="_blank" rel="noopener noreferrer" className="group rounded-lg bg-blue-600 p-1 transition hover:bg-blue-700"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-3 font-semibold text-white">
                <FileText className="h-5 w-5" />

                <div>
                  <div>Fire Certificate</div>

                  <div className="flex items-center gap-1 border-t pt-2 text-xs">
                    Click here
                    <MousePointerClick className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p className="text-gray-600">
              Fire Certificate PDF is currently unavailable.
            </p>
          )}
        </div>

        {/* Photos section */}
        <section className="container mx-auto px-0 py-10 sm:px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Photos
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <div key={photo} className="overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl" >
                <Image src={photo} alt={`Fire Certificate Photo ${index + 1}`}
                  width={600} height={400}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CBSE school information */}
        <CBSESchool />
      </section>
    </main>
  );
}
