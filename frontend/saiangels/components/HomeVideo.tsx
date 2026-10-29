
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

  // Display only the 3 latest uploaded videos
const displayedVideos = [...videos]
  .sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  .slice(0, 3);

  // Convert supported YouTube URLs into embed URLs
  const getEmbedUrl = (url: string): string => {
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

      return id
        ? `https://www.youtube.com/embed/${id}`
        : "";
    } catch {
      return "";
    }
  };

  return (
    <main className="bg-[#f38030] py-16 sm:py-14">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#cfcfcf] sm:text-4xl lg:text-5xl">
            Our Video{" "}
            <span className="text-white">Gallery</span>
          </h2>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-amber-400" />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-gray-700">
            Loading videos...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-12 text-center text-red-700">
            Unable to load videos. Please try again later.
          </div>
        )}

        {/* Video Gallery */}
        {!isLoading && !error && (
          <>
            <section className="container mx-auto px-4 py-10">
              {displayedVideos.length === 0 ? (
                <div className="py-8 text-center text-lg text-gray-700">
                  No Videos Available
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayedVideos.map((video) => {
                    const embedUrl = getEmbedUrl(video.url);

                    return (
                      <div
                        key={video._id}
                        className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                      >
                        {/* Embedded YouTube Player */}
                        <div className="aspect-video w-full bg-gray-200">
                          {embedUrl ? (
                            <iframe
                              className="h-full w-full"
                              src={embedUrl}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-600">
                              Invalid video URL
                            </div>
                          )}
                        </div>

                        {/* Video Details */}
                        <div className="p-4">
                          <p className="text-sm text-gray-500">
                            📅 {video.date}
                          </p>

                          <h3 className="mt-1 text-lg font-semibold text-gray-800">
                            {video.title}
                          </h3>

                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block w-full rounded-lg bg-red-600 py-2 text-center text-white transition hover:bg-red-700"
                          >
                            Watch Video ▶
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* View More Videos Button */}
            {videos.length > 0 && (
              <div className="text-center">
                <Link
                  href="/gallery/video-gallery"
                  className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-[#07204f] px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-white hover:text-red-600 hover:shadow-lg"
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
