import CBSESchool from "@/components/CBSESchool";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

/**
 * Fetch the DEO Certificate PDF details
 */
async function getDeoCertificatePDF() {
  const res = await fetch(
    `${apiUrl}/cbse-documents/pdf/deo-certificate`,
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

export default async function DeoCertificatePage() {

  // Fetch PDF information from the API
  const pdf = await getDeoCertificatePDF();

  // Extract the PDF URL if available
  const pdfLink = pdf?.pdf_url || null;

  return (
    <main>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-10 px-6 mb-[4%]">
        <div className="mx-auto text-center space-y-10">
            <h1 className="text-4xl font-bold text-black-800 mb-3"> DEO Certificate </h1>
        </div>
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
                  <div>DEO Certificate</div>

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