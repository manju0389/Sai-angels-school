import CBSESchool from "@/components/CBSESchool";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

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
 * Fetch the Fire Certificate PDF details
 */
async function getFireCertificatePDF() {
  const res = await fetch(
    `${apiUrl}/cbse-documents/pdf/fire-certificate`,
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

export default async function FireCertificatePage() {

  // Fetch PDF information from the API
  const pdf = await getFireCertificatePDF();

  // Extract the PDF URL if available
  const pdfLink = pdf?.pdf_url || null;

  return (
    <main>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-10 px-6 mb-[4%]">
        <div className="mx-auto text-center space-y-10">
            <h1 className="text-4xl font-bold text-black-800 mb-3"> Fire Certificate </h1>
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
                  <div>Fire Certificate</div>

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

        {/* Photos Section */}
        <section className="container mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Photos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300" >
                <Image src={photo} alt={`Fire Certificate Photo ${index + 1}`}
                  width={600} height={400}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CBSE School Information */}
        <CBSESchool />
      </section>
    </main>
  );
}