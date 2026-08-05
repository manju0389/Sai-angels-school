"use client";

import QuickLinks from "@/components/QuickLinks";
import useSWR from "swr";

// Define facility data type
interface Facility {
  _id: string;
  facility: string;
}

const fetcher = async (url: string): Promise<Facility[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch administration data");
  }

  return response.json();
};

export default function AdministrationPage() {

  const API = `${process.env.NEXT_PUBLIC_API_URL}/about-us/administration`;

  const {
    data: facilities = [],
    error,
    isLoading,
  } = useSWR<Facility[]>(API, fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading administration...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load administration details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="mx-auto text-center space-y-10">
          <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            Administration
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-6">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Left Content - Facilities Table */}
          <div className="lg:col-span-2 text-justify">
            <div className="overflow-x-auto">

              {/* Facilities List Table */}
              <table className="min-w-full border border-[#c8cfd9] text-left">

                {/* Table Header */}
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-[1.5em]">
                      Facilities / Features
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {facilities.length === 0 ? (
                    // Display message when no facilities are available
                    <tr>
                      <td className="text-center p-5 text-gray-500">
                        No Facilities Found
                      </td>
                    </tr>
                  ) : (
                    // Display facilities list
                    facilities.map((item, index) => (
                      <tr
                        key={item._id}
                        className={
                          index % 2 === 0
                            ? "border"
                            : "border bg-[#e8ebef]"
                        }
                      >
                        <td className="px-4 py-2 border border-[#c8cfd9]">
                          <span aria-hidden="true" className="text-pink-600">
                            ▶
                          </span>{" "}
                          {item.facility}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>
          </div>

          {/* Sidebar Quick Links */}
          <QuickLinks />

        </div>
      </section>

    </main>
  );
}