import CBSESchool from "@/components/CBSESchool";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

// Water Certificate
async function getWaterCertificatePDF() {
  const res = await fetch(
    `${apiUrl}/cbse-documents/pdf/water-certificate`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result.data;
}

// Health & Sanitation Certificate
async function getHealthCertificatePDF() {
  const res = await fetch(
    `${apiUrl}/cbse-documents/pdf/health-certificate`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result.data;
}

export default async function WaterHealthCertificatePage() {
  const waterPdf = await getWaterCertificatePDF();
  const healthPdf = await getHealthCertificatePDF();

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-10 px-6 mb-[4%]">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Water, Health & Sanitation Certificates
          </h1>
        </div>
      </section>

      {/* PDF Cards */}
      <section className="container mx-auto py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Water Certificate */}
          {waterPdf ? (
            <Link
              href={`${apiUrl}/cbse-documents/view/${waterPdf._id}`} target="_blank"
              rel="noopener noreferrer" className="group rounded-lg bg-green-600 p-1 hover:bg-green-700 transition"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-4 text-white">
                <FileText className="w-6 h-6" />

                <div>

                  <h3 className="font-semibold"> Confirmation Certificate </h3>

                  <div className="flex items-center gap-1 text-xs border-t pt-2">
                    Click here
                    <MousePointerClick className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p> Confirmation Certificate </p>
          )}

          {/* Health & Sanitation Certificate */}
          {healthPdf ? (
            <Link
              href={`${apiUrl}/cbse-documents/view/${healthPdf._id}`} target="_blank" rel="noopener noreferrer"
              className="group rounded-lg bg-blue-600 p-1 hover:bg-blue-700 transition"
            >
              <div className="flex items-center gap-3 rounded-md border-2 border-dashed border-white px-6 py-4 text-white">
                <FileText className="w-6 h-6" />

                <div>
                  <h3 className="font-semibold">
                    Water, Health & Sanitation Certificates
                  </h3>
                  <div className="flex items-center gap-1 text-xs border-t pt-2">
                    Click here
                    <MousePointerClick className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <p>Water, Health & Sanitation Certificates not available.</p>
          )}
        </div>

        <CBSESchool />
      </section>
    </main>
  );
}