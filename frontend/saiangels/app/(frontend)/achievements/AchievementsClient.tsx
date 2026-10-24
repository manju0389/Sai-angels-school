"use client";

import { useState } from "react";
import useSWR from "swr";

interface Image {
  url: string;
}

interface Achievement {
  _id: string;
  year: string;
  images: Image[];
}

const fetcher = async (url: string): Promise<Achievement[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Achievements data");
  }

  return response.json();
};

export default function AchievementsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const API = `${process.env.NEXT_PUBLIC_API_URL}/achievements`;

  const {
    data: achievements = [],
    error,
    isLoading,
  } = useSWR<Achievement[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Achievements...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load Achievements details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Achievements (School Results)
          </h1>
      </section>

      {/* Achievement List */}
      <section className="container mx-auto py-6 px-4 mt-[4%]">
        <div className="space-y-4">
          {achievements.length > 0 ? (
            achievements.map((section, i) => (
              <div key={section._id} className="border rounded-lg overflow-hidden shadow-md" >
                {/* Accordion Header */}
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)
                  }
                  className="w-full bg-[#1E293B] text-white px-5 py-4 flex justify-between items-center font-semibold cursor-pointer"
                >
                  <span>{section.year}</span>
                  <span>{openIndex === i ? "▲" : "▼"}</span>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 bg-white flex flex-wrap justify-center gap-4">
                    {section.images?.length > 0 ? (
                      section.images.map((img, index) => (
                        <img key={index} src={img.url} alt={`Achievement ${index + 1}`}
                          className="rounded-lg shadow-md max-w-full md:w-[full]"
                        />
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No images available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              No achievements found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}