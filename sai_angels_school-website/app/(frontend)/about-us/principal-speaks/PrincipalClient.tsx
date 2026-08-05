"use client";

import QuickLinks from "@/components/QuickLinks";
import useSWR from "swr";


interface Principal {
  _id: string;
  name: string;
  designation: string;
  description: string;
  images: string[];
  public_ids: string[];
}

const fetcher = async (url: string): Promise<Principal[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Principal data");
  }

  return response.json();
};

export default function PrincipalPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/principal-speaks`;

  const {
    data: principalData = [],
    error,
    isLoading,
  } = useSWR<Principal[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading Principal...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load Principal details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">

      {/* Dynamic Hero Banner */}
      {principalData[0]?.images?.[0] && (
        <section className="w-full h-[400px]">
          <img src={principalData[0].images[0]} alt={principalData[0].name} className="w-full h-full object-cover"/>
        </section>
      )}

      {/* Principal Content */}
      <section className="container mx-auto py-8 px-4">

        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Our Principal Speak
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Principal Details */}
          <div className="lg:col-span-2">
            
            {principalData.length === 0 ? (

              <p className="text-center text-gray-500">
                No Principal Data Available
              </p>
            ) : (
              principalData.map((principal) => (
                <div key={principal._id} className="mb-12 border-b pb-10 last:border-b-0">

                  <h2 className="text-red-600 text-2xl font-semibold">
                    {principal.name}
                  </h2>

                  <p className="italic text-gray-600 mb-4">
                    {principal.designation}
                  </p>

                  <div className="text-gray-700 leading-8">
                    {principal.description
                      ?.split(/\n\s*\n/)
                      .map((paragraph, index) => (
                        <p key={index} className="mb-6 text-justify"> {paragraph.trim()}</p>
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