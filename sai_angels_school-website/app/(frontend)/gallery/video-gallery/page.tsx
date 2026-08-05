"use client";

import useSWR from "swr";

// Video data interface
interface Video {
  _id: string;
  year: string;
  title: string;
  url: string;
  date: string;
}

// Fetch video data from API
const fetcher = async (url: string): Promise<Video[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  return response.json();
};

export default function VideoGalleryPage() {
  // API endpoint
  const API = `${process.env.NEXT_PUBLIC_API_URL}/gallery/video-gallery`;

  // Fetch videos using SWR
  const {
    data: videos = [],
    error,
    isLoading,
  } = useSWR<Video[]>(API, fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  // Convert different YouTube URL formats into an embeddable URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      // Short URL (youtu.be/...)
      if (parsed.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsed.pathname}`;
      }

      // Standard watch URL
      if (parsed.pathname === "/watch") {
        return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
      }

      // Already an embed URL
      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }

      // Shorts URL
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/")[2];
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch {
      return "";
    }

    return "";
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading Videos...</p>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Unable to load video details.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black">Video Gallery</h1>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="container mx-auto px-4 py-10">
        {videos.length === 0 ? (
          // Empty state
          <div className="text-center text-gray-500 text-lg">
            No Videos Available
          </div>
        ) : (
          // Video grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {/* Embedded YouTube video */}
                <div className="aspect-video w-full">
                  <iframe className="w-full h-full" src={getEmbedUrl(video.url)} title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy"
                  />
                </div>

                {/* Video details */}
                <div className="p-4">
                  <p className="text-sm text-gray-500">📅 {video.date}</p>

                  <h3 className="text-lg font-semibold text-gray-800 mt-1">
                    {video.title}
                  </h3>

                  {/* Open original YouTube video */}
                  <a href={video.url} target="_blank" rel="noopener noreferrer" >
                    <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition cursor-pointer">
                      Watch Video ▶
                    </button>
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