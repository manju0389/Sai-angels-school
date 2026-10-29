
import React from "react";

const newsItems = [
  {
    date: "25",
    month: "OCT",
    category: "Announcement",
    title: "Admissions Open for the Academic Year 2027–28",
    description: "Applications are invited for admission. Contact our admissions office for details about the application process.",
    color: "bg-blue-100 text-blue-700",
    link: "/admission",
  },
  {
    date: "22",
    month: "OCT",
    category: "Achievements",
    title: "Celebrating Our Students' Academic Excellence",
    description: "We celebrate the dedication, hard work, and achievements of our students across academics and extracurricular activities.",
    color: "bg-amber-100 text-amber-700",
    link: "/achievements",
  },
  {
    date: "18",
    month: "OCT",
    category: "School Events",
    title: "Upcoming Cultural and Co-Curricular Activities",
    description: "Students are encouraged to participate in activities that develop creativity, teamwork, and confidence.",
    color: "bg-purple-100 text-purple-700",
    link: "/gallery",
  },
  {
    date: "12",
    month: "OCT",
    category: "Campus",
    title: "Learning Beyond the Classroom",
    description: "Discover the opportunities and facilities that support students' learning, interests, and overall development.",
    color: "bg-emerald-100 text-emerald-700",
    link: "/about",
  },
  {
    date: "08",
    month: "OCT",
    category: "Announcement",
    title: "Parent–Teacher Interaction",
    description: "Stay connected with teachers to discuss student progress, learning goals, and opportunities for improvement.",
    color: "bg-rose-100 text-rose-700",
    link: "/contactus",
  },
];

export default function RecentNews() {
  // Duplicate items for seamless continuous scrolling
  const scrollingNews = [...newsItems, ...newsItems];

  return (
    <section className="bg-[#142f53] px-4 py-14 sm:px-6 sm:py-14 lg:px-8">
      {/* Background Decorations */}

      <div className="container">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-14">
            <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#cfcfcf] sm:text-4xl lg:text-5xl">
              Recent News{" "}
              <span className="text-[#fff]">
                Announcements
              </span>
            </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        {/* News Layout */}

          {/* Right: Vertical Scrolling News */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6">
            {/* News Header */}
            <div className="mb-5 items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                  Latest Updates
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  News from our school community
                </p>
              </div>
            </div>

            {/* Scrolling Container */}
            <div className="relative h-[320px] overflow-hidden sm:h-[320px]">
              <div className="news-vertical-scroll">
                {scrollingNews.map((news, index) => (
                  <article
                    key={`${news.title}-${index}`}
                    className="mb-4 flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition duration-300 hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    {/* Date Badge */}
                    <div className="flex h-[68px] w-[62px] shrink-0 flex-col items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                      <span className="text-2xl font-extrabold leading-none text-blue-800">
                        {news.date}
                      </span>
                      <span className="mt-1 text-[10px] font-bold tracking-widest text-slate-500">
                        {news.month}
                      </span>
                    </div>

                    {/* News Details */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold sm:text-xs ${news.color}`}
                      >
                        {news.category}

                        
                      </span>

                      

                      <h4 className="mt-2 text-sm font-bold leading-6 text-slate-900 sm:text-base">
                        {news.title}

                      </h4>

                      <p className="mt-2 text-xs text-slate-600 sm:text-sm space-y-6 text-base leading-8">
                        {news.description}
                      </p>

                    </div>
                  </article>
                ))}
              </div>
            </div>

        </div>
      </div>

      {/* Vertical Scrolling Animation */}
      <style>{`
        .news-vertical-scroll {
          animation: newsScrollUp 35s linear infinite;
        }

        .news-vertical-scroll:hover {
          animation-play-state: paused;
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
