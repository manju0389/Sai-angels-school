  
"use client";

import React, { useEffect, useState } from "react";

interface News {
  _id: string;
  date: string;
  category: string;
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  order: number;
}

const API = `${process.env.NEXT_PUBLIC_API_URL}/home`;

const categoryColors: Record<string, string> = {
  Announcement: "bg-blue-100 text-blue-700",
  Achievements: "bg-amber-100 text-amber-700",
  "School Events": "bg-purple-100 text-purple-700",
  Campus: "bg-emerald-100 text-emerald-700",
  Admissions: "bg-blue-100 text-blue-700",
  Sports: "bg-orange-100 text-orange-700",
  Activities: "bg-pink-100 text-pink-700",
  General: "bg-gray-100 text-gray-700",
  "Holiday's List": "bg-red-100 text-red-700",
};

export default function RecentNews() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ACTIVE NEWS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API}/news/active`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch news");
        }

        setNewsItems(data.news || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load news"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // DUPLICATE NEWS FOR CONTINUOUS SCROLLING
  const scrollingNews =
    newsItems.length > 1
      ? [...newsItems, ...newsItems]
      : newsItems;

  // FORMAT DATE
  const getDate = (date: string) => {
    const parsedDate = new Date(date);

    return {
      day: parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
      }),
      month: parsedDate
        .toLocaleDateString("en-IN", {
          month: "short",
        })
        .toUpperCase(),
    };
  };

  return (
    <section className="bg-[#142f53] px-4 py-14 sm:px-6 sm:py-14 lg:px-8">
      <div className="container">

        {/* SECTION HEADING */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#cfcfcf] sm:text-4xl lg:text-5xl">
            Recent News{" "}
            <span className="text-white">
              Announcements
            </span>
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* NEWS CARD */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">

          {/* NEWS HEADER */}
          <div className="mb-5 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
              Latest Updates
            </h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              News from our school community
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex h-[320px] items-center justify-center">
              <p className="text-gray-500">
                Loading latest news...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="flex h-[320px] items-center justify-center">
              <p className="text-center text-red-500">
                Unable to load news. Please try again later.
              </p>
            </div>
          )}

          {/* NO NEWS */}
          {!loading && !error && newsItems.length === 0 && (
            <div className="flex h-[320px] items-center justify-center">
              <p className="text-gray-500">
                No announcements available at the moment.
              </p>
            </div>
          )}

          {/* SCROLLING NEWS */}
          {!loading && !error && newsItems.length > 0 && (
            <div className="relative h-[320px] overflow-hidden">

              <div
                className={`news-vertical-scroll ${
                  newsItems.length === 1 ? "single-news" : ""
                }`}
              >
                {scrollingNews.map((news, index) => {
                  const formattedDate = getDate(news.date);

                  const newsContent = (
                    <>
                      {/* DATE BADGE */}
                      <div className="flex h-[68px] w-[62px] shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                        <span className="text-2xl font-extrabold leading-none text-blue-800">
                          {formattedDate.day}
                        </span>

                        <span className="mt-1 text-[10px] font-bold tracking-widest text-slate-500">
                          {formattedDate.month}
                        </span>
                      </div>

                      {/* NEWS DETAILS */}
                      <div className="min-w-0 flex-1">

                        <span
                          className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold sm:text-xs ${
                            categoryColors[news.category] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {news.category}
                        </span>

                        <h4 className="mt-2 text-sm font-bold leading-6 text-slate-900 sm:text-base">
                          {news.title}
                        </h4>

                        <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-sm">
                          {news.description}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <article
                      key={`${news._id}-${index}`}
                      className="mb-4 flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:border-blue-200 hover:bg-blue-50/50"
                    >
                      {news.link ? (
                        <a
                          href={news.link}
                          className="flex min-w-0 flex-1 gap-4"
                        >
                          {newsContent}
                        </a>
                      ) : (
                        <div className="flex min-w-0 flex-1 gap-4">
                          {newsContent}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VERTICAL SCROLLING ANIMATION */}
      <style jsx>{`
        .news-vertical-scroll {
          animation: newsScrollUp 35s linear infinite;
        }

        .news-vertical-scroll:hover {
          animation-play-state: paused;
        }

        .news-vertical-scroll.single-news {
          animation: none;
        }

        @keyframes newsScrollUp {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-vertical-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
