
"use client";

import useSWR from "swr";
import Link from "next/link";

interface Video {
  _id: string;
  year: string;
  title: string;
  url: string;
  date: string;
}

const fetcher = async (url: string): Promise<Video[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video data");
  }

  return response.json();
};

export default function HomeVideoPage() {
  const API = `${process.env.NEXT_PUBLIC_API_URL}/gallery/video-gallery`;

  const {
    data: videos = [],
    error,
    isLoading,
  } = useSWR<Video[]>(API, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

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

  // Display only four videos on the homepage
  const displayedVideos = videos.slice(0, 4);

  return (
    <main className="bg-[#f38030] py-16 sm:py-14">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#cfcfcf] sm:text-4xl lg:text-5xl">
            Our Video{" "}
            <span className="text-[#fff]">Gallery</span>
          </h2>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-gray-600">
            Loading videos...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-12 text-center text-red-600">
            Unable to load videos. Please try again later.
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Display the saved video records */}
            <section className="container mx-auto px-4 py-10">
              {displayedVideos.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                  No Videos Available
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedVideos.map((video) => (
                    <div
                      key={video._id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                    >
                      {/* Embedded YouTube player */}
                      <div className="aspect-video w-full">
                        <iframe
                          className="w-full h-full"
                          src={getEmbedUrl(video.url)}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
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

                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
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

            {/* View More Button */}
            {videos.length > 0 && (
              <div className="text-center">
                <Link
                  href="/gallery/video-gallery"
                  className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-[#07204f] px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
                >
                  View More Videos
                  <span className="text-lg" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
