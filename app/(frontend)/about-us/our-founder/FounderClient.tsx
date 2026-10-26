"use client";

import QuickLinks from "@/components/QuickLinks";
import useSWR from "swr";

// Founder data returned by the backend API
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

// Fetch founder records from the backend
const fetcher = async (url: string): Promise<Founder[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Founder data");
  }

  return response.json();
};

export default function FounderPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/our-founder`;

  // Automatically refresh data and revalidate on focus or reconnect
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
        <p className="text-red-600">
          Unable to load Founder details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Display the first founder's image as the hero banner */}
      {founders.length > 0 && founders[0].images?.length > 0 && (
        <section className="w-full">
          <img src={founders[0].images[0].url} alt={founders[0].name} className="w-full h-[auto] object-cover" />
        </section>
      )}

      {/* Redesigned Founder Content */}
      <section className="bg-[#f9f7f7] py-14 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="text-center mb-10 md:mb-10">

             <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
              Meet Our Founder
            </h1>

            <div className="w-16 h-1 bg-red-700 mx-auto mt-5 rounded-full" />

            <p className="text-slate-500 mt-5 max-w-2xl mx-auto leading-7">
              Discover the vision, leadership, and dedication that continue to shape our journey.
            </p>
          </div>

          {/* Main Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Founder Details */}
            <div className="lg:col-span-2 space-y-8">
              {founders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-slate-100">
                  <p className="text-slate-500">
                    No Founder Data Available
                  </p>
                </div>
              ) : (
                founders.map((founder) => (
                  <article
                    key={founder._id}
                    className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100"
                  >
                    {/* Founder Name and Designation */}
                    <div className="border-l-4 border-red-700 pl-5 mb-7">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                        {founder.name}
                      </h2>

                      <p className="mt-2 text-red-700 font-medium">
                        {founder.designation}
                      </p>
                    </div>

                    {/* Founder Description */}
                    <div className="text-slate-600 text-base md:text-lg leading-8 space-y-5">
                      {founder.description
                        ?.split(/\n\s*\n/)
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-justify"
                          >
                            {paragraph.trim()}
                          </p>
                        ))}
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Existing Sidebar */}
            <aside className="lg:sticky lg:top-8">
              <QuickLinks />
            </aside>
          </div>
        </div>
      </section>

    </main>
  );
}
