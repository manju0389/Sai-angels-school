"use client";

import useSWR from "swr";

interface WorkingHourItem {
  id: number;
  label: string;
  time: string;
}

interface WorkingHourSection {
  id: number;
  title: string;
  items: WorkingHourItem[];
}

const fetcher = async (
  url: string
): Promise<WorkingHourSection[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Working Hour data");
  }
  const result = await response.json();
  return result.sections ?? [];
};

export default function WorkingHourPage() {
  
  const API = `${process.env.NEXT_PUBLIC_API_URL}/admission/working-hours`;

  const {
    data = [],
    error,
    isLoading,
  } = useSWR<WorkingHourSection[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Working Hours...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load Working Hour details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Page header */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-24 px-6">
        <h1 className="text-center text-5xl font-bold">
          Working Hours
        </h1>
      </section>

      {/* Working hours list */}
      <section className="mx-auto max-w-[700px] px-4 py-10 space-y-8">
        {data.length === 0 ? (
          <p className="text-center text-gray-500">
            No working hours available.
          </p>
        ) : (
          data.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-md p-6" >
              <h2 className="text-xl font-bold mb-5">
                {section.title}
              </h2>

              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div key={item.id} className={`flex justify-between p-3 rounded-lg ${
                      index % 2 === 0
                        ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <span className="font-medium">
                      {item.label}
                    </span>
                    <span>{item.time}</span>
                  </div>
                ))}

                <h2 className="mt-5 text-sm font-semibold text-gray-600">
                  Note: Pupils must arrive before prayers and Sunday is a holiday.
                </h2>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}