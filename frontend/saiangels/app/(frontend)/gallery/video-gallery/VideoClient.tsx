
"use client";

import useSWR from "swr";

// Define the video data structure
interface Video {
  _id: string;
  year: string;
  title: string;
  url: string;
  date: string;
}

// Fetch videos from the backend API
const fetcher = async (url: string): Promise<Video[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  return response.json();
};

// Public video gallery page
export default function VideoGalleryPage() {
  // Backend API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/gallery/video-gallery`;

  // Fetch video records and automatically refresh the list
  const {
    data: videos = [],
    error,
    isLoading,
  } = useSWR<Video[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Convert supported YouTube URLs into embed URLs
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);
      let id = "";

      if (
        parsed.hostname === "youtu.be" ||
        parsed.hostname.endsWith(".youtu.be")
      ) {
        id = parsed.pathname.split("/")[1] || "";
      } else if (
        parsed.hostname === "youtube.com" ||
        parsed.hostname.endsWith(".youtube.com")
      ) {
        if (parsed.pathname === "/watch") {
          id = parsed.searchParams.get("v") || "";
        } else if (
          parsed.pathname.startsWith("/embed/") ||
          parsed.pathname.startsWith("/shorts/")
        ) {
          id = parsed.pathname.split("/")[2] || "";
        }
      }

      return id ? `https://www.youtube.com/embed/${id}` : "";
    } catch {
      return "";
    }
  };

  // Display a loading message while fetching videos
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Videos...</p>
      </main>
    );
  }

  // Display an error message if the API request fails
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">
          Unable to load video details.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Gallery heading */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Video Gallery
          </h1>
      </section>

      {/* Display the saved video records */}
      <section className="container mx-auto px-4 py-10">
        {videos.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No Videos Available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {/* Embedded YouTube player */}
                <div className="aspect-video w-full">
                  <iframe className="w-full h-full" src={getEmbedUrl(video.url)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy"
                  />
                </div>

                {/* Video title, date, and original YouTube link */}
                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    📅 {video.date}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-1">
                    {video.title}
                  </h3>

                  <a href={video.url} target="_blank" rel="noopener noreferrer"
                    className="block mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg transition cursor-pointer"
                  >
                    Watch Video ▶
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
