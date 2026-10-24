
"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
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
        { name: "Sai Angels CBSE School", link: "/activities/sai-angels-cbse-school",},
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
        { name: "Parental Co-Operation", link: "/admission/parental-co-operation", },
      ],
    },

    { name: "Achievements", link: "/achievements" },

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
      <div className="bg-[#003375] px-4 py-3 font-bold text-sm text-[#e1a22f] md:text-base">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">

            {/* Email */}
            <span className="hover:text-[#ffc857] transition-colors duration-300">
              Email:{" "}
              <a href="mailto:saiangelsoffice@gmail.com">
                saiangelsoffice@gmail.com
              </a>
            </span>

            {/* Phone Numbers */}
            <span className="hover:text-[#ffc857] transition-colors duration-300">
              Mobile:{" "}
              <a href="tel:9632315633"> 9632315633 </a>{" "}
              /{" "}
              <a href="tel:8277522020"> 8277522020 </a>{" "}
              /{" "}
              <a href="tel:9448204444"> 9448204444 </a>
            </span>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/" target="_blank"
                rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-400 transition-colors"
              >
                <FaFacebookF size={18} />
              </a>

              <a href="https://www.instagram.com/" target="_blank"
                rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition-colors"
              >
                <FaInstagram size={19} />
              </a>

              <a href="https://www.youtube.com/" target="_blank"
                rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-400 transition-colors"
              >
                <FaYoutube size={21} />
              </a>

              <a href="https://wa.me/919632315633" target="_blank"
                rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-400 transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
          </div>
        </div>
      </div>

      <div className="py-3 bg-[#ecdac6]">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <Image src="/images/logo.png" alt="Sai Angels School Logo"
              width={110} height={80} priority className="h-auto w-[85px] object-contain md:w-[100px] lg:w-[110px]"
            />
          </Link>

          <nav className="hidden flex-1 justify-end rounded-md tracking-wider bg-[#2E1F66] text-white md:flex">
            <ul className="flex w-full items-center font-bold justify-between">
              {menu.map((item, index) => (
                <li key={item.name} className="relative hover:bg-[#374151]"
                  onMouseEnter={() => {
                    if (item.submenu) setDesktopDropdown(index);
                  }}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  {item.link ? (
                    <Link href={item.link}
                      className="flex items-center gap-1 whitespace-nowrap px-2 py-4 text-[101%] lg:px-3 lg:text-[101%]"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button type="button"
                      className="flex items-center gap-1 cursor-pointer whitespace-nowrap px-2 py-4 text-[101%] lg:px-3 lg:text-[101%]"
                      aria-expanded={desktopDropdown === index}
                      onClick={() =>
                         setDesktopDropdown(
                          desktopDropdown === index ? null : index
                        )
                      }
                    >
                      {item.name}
                      <ChevronDown size={14} />
                    </button>
                  )}

                  {item.submenu && desktopDropdown === index && (
                    <ul className="absolute left-0 top-full z-50 max-h-[80vh] w-[18rem] overflow-y-auto bg-gray-800 shadow-lg">
                      {item.submenu.map((sub) => (
                        <li key={sub.name} className="border-b border-gray-600">
                          <Link href={sub.link} className="block w-full px-4 py-2 text-sm hover:bg-gray-700" >
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

          <button
            type="button" className="shrink-0 p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="bg-blue-900 text-white md:hidden">
          <ul className="flex flex-col">
            {menu.map((item, index) => (
              <li key={item.name} className="border-b border-blue-700">
                <div className="flex items-center justify-between px-4 py-3">
                  {item.link ? (
                    <Link href={item.link} className="flex-1" onClick={() => setMobileOpen(false)}>
                      {item.name}
                    </Link>
                  ) : (
                    <button type="button" className="flex-1 text-left" aria-expanded={mobileDropdown === index}
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === index ? null : index
                        )
                      }
                    >
                      {item.name}
                    </button>
                  )}

                  {item.submenu && (
                    <button type="button" className="px-3 py-1" aria-label={`Toggle ${item.name} submenu`}
                      aria-expanded={mobileDropdown === index}
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === index ? null : index
                        )
                      }
                    >
                      {mobileDropdown === index ? (
                        <X size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  )}
                </div>

                {item.submenu && mobileDropdown === index && (
                  <ul className="bg-blue-800">
                    {item.submenu.map((sub) => (
                      <li key={sub.name} className="border-b border-blue-700">
                        <Link href={sub.link} className="block w-full px-6 py-3 text-sm hover:bg-blue-700"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileDropdown(null);
                          }}
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
      )}
    </header>
  );
}