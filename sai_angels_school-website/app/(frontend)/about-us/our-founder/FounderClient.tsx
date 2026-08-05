"use client";

import QuickLinks from "@/components/QuickLinks";
import useSWR from "swr";

interface Founder {
  _id: string;
  name: string;
  designation: string;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
}

const fetcher = async (url: string): Promise<Founder[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Founder data");
  }

  return response.json();
};

export default function FounderPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/our-founder`;

  const {
    data: founders = [],
    error,
    isLoading,
  } = useSWR<Founder[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Founder...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Unable to load Founder details.</p>
      </main>
    );
  }

  const founder = founders[0];

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Dynamic Hero Banner */}
      {founders.length > 0 && founders[0].images?.length > 0 && (
        <section className="w-full">
          <img src={founders[0].images[0].url} alt={founders[0].name} className="w-full h-[auto] object-cover"/>
        </section>
      )}

      {/* Founder Content */}
      <section className="container mx-auto py-8 px-4">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Our Founder
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
          {founders.length === 0 ? (
            <p className="text-center text-gray-500">
              No Founder Data Available
            </p>
          ) : (
            founders.map((founder) => (
              <div key={founder._id} className="mb-12 border-b pb-10 last:border-b-0">
                <h2 className="text-red-600 text-2xl font-semibold">
                  {founder.name}
                </h2>

                <p className="italic text-gray-600 mb-4">
                  {founder.designation}
                </p>

                <div className="text-gray-700 leading-8">
                  {founder.description
                    ?.split(/\n\s*\n/)
                    .map((paragraph, index) => (
                      <p key={index} className="mb-6 text-justify">
                        {paragraph.trim()}
                      </p>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>

          {/* Sidebar */}
          <QuickLinks />
        </div>
      </section>
    </main>
  );
}