"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

// CBSE document navigation links
const links = [
  { label: "Mandatory Disclosure", href: "/cbse-school/mandatory-disclosure" },
  { label: "Affiliation Certificate", href: "/cbse-school/affiliation-certificate" },
  { label: "Societies/Trust Certificate", href: "/cbse-school/society-trust-certificate" },
  { label: "No Objection Certificate", href: "/cbse-school/noc" },
  { label: "Recognition Certificate", href: "/cbse-school/recognition-certificate" },
  { label: "Building Certificate", href: "/cbse-school/building-certificate" },
  { label: "Fire Certificate", href: "/cbse-school/fire-certificate" },
  { label: "DEO Certificate", href: "/cbse-school/deo-certificate" },
  { label: "Water Health Certificate", href: "/cbse-school/health-certificate" },
  { label: "Fee Structure", href: "/cbse-school/fee-structure" },
  { label: "Annual Academic Calendar", href: "/cbse-school/academic-calendar" },
  { label: "Three Years Result", href: "/cbse-school/results" },
  { label: "Parents Teachers Association", href: "/cbse-school/pta" },
  { label: "School Management Committee", href: "/cbse-school/smc" },
  { label: "Geo-tagged Infrastructure", href: "/cbse-school/geo-tagged-infrastructure" },
];

export default function CBSESchool() {
  return (
    <section className="w-full py-8">
      {/* Divider */}
      <hr className="mt-[10%] pb-6" />

      {/* Section Heading */}
      <h2 className="mb-5 flex items-center justify-center text-2xl font-bold text-black">
        Other CBSE School Documents List
      </h2>

      {/* Document Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {links.map((item) => (
          <Link key={item.href} href={item.href}
            className=" group relative flex items-center gap-3 overflow-hidden rounded-xl border-2 
            border-gray-400 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Hover Background Effect */}
            <div className="absolute inset-0 bg-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Document Icon */}
            <div className="relative">
              <FileText className="h-7 w-7 text-red-500 transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Document Name and Arrow */}
            <div className="relative flex w-full items-center justify-between">
              <span className="font-bold text-gray-700 transition-colors duration-300 group-hover:text-[#6a6968]">
                {item.label}
              </span>

              <span className="translate-x-0 text-2xl text-green-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}