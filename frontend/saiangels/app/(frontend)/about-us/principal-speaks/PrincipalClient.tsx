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
          <img src={principalData[0].images[0]} alt={principalData[0].name} className="w-full h-full object-cover" />
        </section>
      )}

      {/* Principal Content */}
      <section className="container mx-auto py-8 px-4">
         <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          Our Principal Speaks
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Principal Details */}
          <div className="lg:col-span-2 space-y-8">
            {principalData.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-slate-100">
                <p className="text-slate-500">
                  No Principal Data Available
                </p>
              </div>
            ) : (
              principalData.map((principal) => (
                <article
                  key={principal._id}
                  className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100"
                >
                  {/* Principal Name and Designation */}
                  <div className="border-l-4 border-red-700 pl-5 mb-7">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      {principal.name}
                    </h2>

                    <p className="mt-2 text-red-700 font-medium">
                      {principal.designation}
                    </p>
                  </div>

                  {/* Principal Description */}
                  <div className="text-slate-600 text-base md:text-lg leading-8 space-y-5">
                    {principal.description
                      ?.split(/\n\s*\n/)
                      .map((paragraph, index) => (
                        <p key={index} className="text-justify">
                          {paragraph.trim()}
                        </p>
                      ))}
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>
      </section>
    </main>
  );
}
