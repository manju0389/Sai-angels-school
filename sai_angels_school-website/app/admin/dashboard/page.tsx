"use client";

import Link from "next/link";

export default function AdminDashboard() {
  // Dashboard navigation buttons
  const buttons = [
    {
      title: "Manage Home",
      url: "/admin/Home",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Manage Achievements",
      url: "/admin/Achievements",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Manage Administraion",
      url: "/admin/Administraion",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      title: "Manage CBSE School",
      url: "/admin/CBSESchool",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      title: "Manage Photo Gallery",
      url: "/admin/PhotoGallery",
      color: "bg-gray-900 hover:bg-gray-950",
    },
    {
      title: "Manage Principal Speak",
      url: "/admin/PrincipalSpeak",
      color: "bg-gray-500 hover:bg-gray-650",
    },
    {
      title: "Manage Sai Cherbs International",
      url: "/admin/SaiCherbsInternational",
      color: "bg-green-800 hover:bg-gray-550",
    },
    {
      title: "Manage Video Gallery",
      url: "/admin/VideoGallery",
      color: "bg-purple-900 hover:bg-gray-950",
    },
    {
      title: "Manage Working Hours",
      url: "/admin/WorkingHours",
      color: "bg-amber-900 hover:bg-gray-950",
    },
    {
      title: "Manage Founder",
      url: "/admin/Founder",
      color: "bg-teal-900 hover:bg-gray-950",
    },
    {
      title: "Manage News Media",
      url: "/admin/NewsMedia",
      color: "bg-violet-900 hover:bg-gray-950",
    },
  ];

  return (
    <div className="p-8">
      {/* Dashboard Heading */}
      <h1 className="text-5xl font-light mb-8">Admin Dashboard</h1>

      {/* Dashboard Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {buttons.map((btn, index) => (
          <Link
            key={index}
            href={btn.url}
            className={`
              ${btn.color}
              text-white text-xl font-bold py-8 rounded-md
              shadow-lg flex items-center justify-center
              transition duration-300 hover:scale-[1.02]
            `}
          >
            {btn.title}
          </Link>
        ))}
      </div>
    </div>
  );
}