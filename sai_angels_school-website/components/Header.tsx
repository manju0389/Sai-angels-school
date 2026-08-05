"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<number | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null);

  const menu = [
    { name: "Home", link: "/" },
    {
      name: "About Us",
      submenu: [
        { name: "About Us", link: "/about-us/about-us" },
        { name: "Vision and Mission", link: "/about-us/vision-mission" },
        { name: "Administration", link: "/about-us/administration" },
        { name: "Our Founders", link: "/about-us/our-founder" },
        { name: "History", link: "/about-us/history" },
        { name: "School Pledge", link: "/about-us/school-pledge" },
        { name: "School Hymns", link: "/about-us/school-hymns" },
        { name: "Principal Speaks", link: "/about-us/principal-speaks" },
        { name: "Campus", link: "/about-us/campus" },
      ],
    },

    {
      name: "CBSE School",
      submenu: [
        { name: "Mandatory Disclosure", link: "/cbse-school/mandatory-disclosure" },
        { name: "Affiliation Certificate", link: "/cbse-school/affiliation-certificate" }, 
        { name: "Societies/Trust Certificate", link: "/cbse-school/society-trust-certificate" },
        { name: "No Objection Certificate", link: "/cbse-school/noc" },
        { name: "Recognition Certificate", link: "/cbse-school/recognition-certificate" },
        { name: "Building Certificate", link: "/cbse-school/building-certificate" },
        { name: "Fire Certificate", link: "/cbse-school/fire-certificate" },
        { name: "DEO Certificate", link: "/cbse-school/deo-certificate" },
        { name: "Water Health Certificate", link: "/cbse-school/health-certificate" },
        { name: "Fee Structure", link: "/cbse-school/fee-structure" },
        { name: "Annual Academic Calender", link: "/cbse-school/academic-calendar" },
        { name: "School Management Committee", link: "/cbse-school/smc" },
        { name: "Parents Teachers Association", link: "/cbse-school/pta" },
        { name: "Three years Result", link: "/cbse-school/results" },
        { name: "Geo tagged infrastructure", link: "/cbse-school/geo-tagged-infrastructure" },
      ],
    },

    {
      name: "Admission",
      submenu: [
        { name: "Admission", link: "/admission/admission" },
        { name: "Transport", link: "/admission/transport" },
        { name: "Working Hours", link: "/admission/working-hours" },
        { name: "Parental Co-Operation", link: "/admission/parental-co-operation" },
      ],
    },

    {
      name: "Activities",
      submenu: [
        { name: "Boarding Home", link: "/activities/boarding-home" },
        { name: "Little Sai Angels Pre School", link: "/activities/little-sai-angels-pre-school" },
        { name: "Sai Angels CBSE School", link: "/activities/sai-angels-cbse-school" },
        { name: "Sai Cherubs International", link: "/activities/sai-cherubs-international" },
      ],
    },

    { name: "Achievements", link: "/achievements" },

    { name: "News & Media", link: "/news-media" },

    {
      name: "Gallery",
      submenu: [
        { name: "Photo Gallery", link: "/gallery/photo-gallery" },
        { name: "Video Gallery", link: "/gallery/video-gallery" },
      ],
    },

    { name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header className="w-full shadow-md">
      {/* Top Bar */}
      <div className="bg-[#1e293b] text-white text-[1.1em] px-4 py-4">
        <div className="container flex justify-between mx-auto">
          <span>
            Email:{" "}
            <a href="mailto:saiangelsoffice@gmail.com" className="hover:hover:text-gray-300">
              saiangelsoffice@gmail.com
            </a>
          </span>

          <span className="hidden md:block">
            Mobile:{" "}
            <a href="tel:9632315633" className="hover:hover:text-gray-300">
              9632315633
            </a>{" "}
            /{" "}
            <a href="tel:8277522020" className="hover:hover:text-gray-300">
              8277522020
            </a>{" "}
            /{" "}
            <a href="tel:9448204444" className="hover:hover:text-gray-300">
              9448204444
            </a>
          </span>

        </div>
      </div>

      {/* Logo + Mobile Button */}
      <div className="px-4 py-3">
        <div className="container flex justify-between mx-auto">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={110} height={80} className="object-contain cursor-pointer h-auto w-auto"/>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex bg-[#2E1F66] text-white">
        <ul className="container flex justify-between mx-auto">
          {menu.map((item, index) => (
            <li
                  key={item.name}
                  className="relative hover:bg-[#374151]"
                  onMouseEnter={() => setDesktopDropdown(index)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="flex items-center gap-1 px-4 py-4 w-full h-full"
                    >
                      {item.name}
                      {item.submenu && <ChevronDown size={16} />}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-1 px-4 py-4 w-full h-full cursor-pointer">
                      {item.name}
                      {item.submenu && <ChevronDown size={16} />}
                    </div>
                  )}

              {/* Dropdown */}
              {item.submenu && desktopDropdown === index && (
                <ul className="absolute left-0 top-full z-50 bg-gray-800 w-[18rem] shadow-lg overflow-hidden animate-fadeIn">
                  {item.submenu.map((sub) => (
                    <li key={sub.name} className="border-b border-gray-600">
                      <Link
                        href={sub.link}
                        className="block w-full px-4 py-2 hover:bg-gray-700"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-900 text-white">
          <ul className="flex flex-col">
            {menu.map((item, index) => (
              <li key={item.name} className="border-b border-blue-700">
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() =>
                    setMobileDropdown(
                      mobileDropdown === index ? null : index
                    )
                  }
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}

                  {item.submenu && (
                    <span>
                      {mobileDropdown === index ? "-" : "+"}
                    </span>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.submenu && mobileDropdown === index && (
                  <ul className="bg-blue-800 animate-slideDown">
                    {item.submenu.map((sub) => (
                      <li key={sub.name} className="border-b border-blue-700">
                        <Link
                          href={sub.link}
                          onClick={() => setMobileOpen(false)}
                          className="block w-full px-6 py-2"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}