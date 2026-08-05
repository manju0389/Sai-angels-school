"use client";

import Link from "next/link";

// Quick links displayed in the sidebar
const quickLinks = [
  { label: "About Us", href: "/about-us/about-us" },
  { label: "Vision and Mission", href: "/about-us/vision-mission" },
  { label: "Administration", href: "/about-us/administration" },
  { label: "Our Founders", href: "/about-us/our-founder" },
  { label: "History", href: "/about-us/history" },
  { label: "School Pledge", href: "/about-us/school-pledge" },
  { label: "School Hymns", href: "/about-us/school-hymns" },
  { label: "Principal Speaks", href: "/about-us/principal-speaks" },
  { label: "Campus", href: "/about-us/campus" },
];

export default function QuickLinks() {
  return (
    <aside className="w-full md:w-80">
      {/* Sidebar Heading */}
      <h2 className="mb-5 border-l-4 border-red-500 pl-3 text-2xl font-bold text-gray-800">
        Quick Links
      </h2>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {quickLinks.map((item) => (
          <Link key={item.label} href={item.href}
            className="block rounded-lg border border-gray-200 bg-[#07204f] px-4 py-3 text-base font-bold text-white shadow-sm transition hover:-translate-x-1 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}