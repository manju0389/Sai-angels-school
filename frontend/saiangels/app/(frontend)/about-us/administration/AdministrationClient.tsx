
"use client";

import QuickLinks from "@/components/QuickLinks";
import useSWR from "swr";

// Define facility data type
interface Facility {
  _id: string;
  facility: string;
}

// Fetch facility data from the backend API
const fetcher = async (url: string): Promise<Facility[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch administration data");
  }

  return response.json();
};

export default function AdministrationPage() {
  // API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/administration`;

  // Fetch and automatically refresh administration data
  const {
    data: facilities = [],
    error,
    isLoading,
  } = useSWR<Facility[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Display loading state
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading administration...
        </p>
      </main>
    );
  }

  // Display API error
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">
          Unable to load administration details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero section */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Administration
          </h1>
      </section>

      {/* Main content section */}
      <section className="container mx-auto py-6">
        <div className="grid gap-10 lg:grid-cols-3">
          
          {/* Facilities / Features - Redesigned Section */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Section heading */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                  Facilities / Features
                </h2>
              </div>

              {/* Facilities list */}
              <div className="p-4 sm:p-6">
                {facilities.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
                    <p className="text-gray-500">
                      No Facilities Found
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {facilities.map((item, index) => (
                      <li key={item._id}
                        className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-pink-300 hover:bg-pink-50/50 hover:shadow-sm"
                      >
                        {/* Feature icon */}
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            className="h-4 w-4" aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                          </svg>
                        </span>

                        {/* Feature name */}
                        <div className="min-w-0 flex-1 pt-1">
                          <p className="text-sm font-medium leading-6 text-gray-700 sm:text-base">
                            {item.facility}
                          </p>
                        </div>

                        {/* Feature number */}
                        <span className="hidden text-xs font-semibold text-gray-400 sm:block">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar quick links */}
          <aside className="self-start lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>
      </section>
    </main>
  );
}
