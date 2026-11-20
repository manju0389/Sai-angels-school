
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  isHome?: boolean;
}

interface SubMenuItem {
  name: string;
  link: string;
}

interface MenuItem {
  name: string;
  link?: string;
  submenu?: SubMenuItem[];
}

export default function Header({ isHome = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const menu: MenuItem[] = [
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
        {
          name: "Sai Angels CBSE School",
          link: "/activities/sai-angels-cbse-school",
        },
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
        { name: "Annual Academic Calendar", link: "/cbse-school/academic-calendar" },
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
        {
          name: "Parental Co-Operation",
          link: "/admission/parental-co-operation",
        },
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

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header
      className={`z-[999999] w-full ${
        isHome
          ? "absolute left-0 top-0 bg-transparent"
          : "relative bg-white"
      }`}
    >
      {/* TOP HEADER */}
      <div className="relative flex h-[110px] items-start justify-between px-5 md:h-[130px] md:px-8">

        {/* SCHOOL LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className="relative z-20 mt-5 flex h-[75px] w-[155px] items-center md:mt-7 md:h-[95px] md:w-[185px] cursor-pointer"
        >
          <Image
            src="/images/logo.png"
            alt="Sai Angels School Logo"
            width={200}
            height={120}
            priority
            className="h-full w-full object-contain object-left"
          />
        </Link>

        {/* GREEN CIRCULAR MENU */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setActiveDropdown(null);
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`absolute -right-[105px] z-[100001]
          flex h-[260px] w-[260px] items-end justify-start
          rounded-full bg-[#20df82] pb-[38px] pl-[53px]
          text-black transition-colors duration-300 hover:bg-[#15ce72]
          ${isHome ? "-top-[130px]" : "-top-[130px]"}
          max-sm:-right-[95px] max-sm:h-[210px] max-sm:w-[210px]
          max-sm:pb-[27px] max-sm:pl-[43px]`}
        >
          <span className="flex flex-col items-center gap-1 cursor-pointer">
            {menuOpen ? (
              <X size={32} strokeWidth={1.5} />
            ) : (
              <MenuIcon size={32} strokeWidth={1.5} />
            )}

            <span className="text-[25px] font-normal tracking-tight max-sm:text-[20px] cursor-pointer">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </span>
        </button>
      </div>

      {/* FULL SCREEN MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100000] overflow-y-auto bg-[#f2f1eb]">

          {/* MENU HEADER */}
          <div className="relative flex min-h-[120px] items-center justify-between px-5 py-4 md:px-10">

            <Link href="/" onClick={closeMenu}>
              <Image
                src="/images/logo.png"
                alt="Sai Angels School"
                width={180}
                height={100}
                className="h-[75px] w-[150px] object-contain object-left"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#20df82] text-black transition hover:bg-[#15ce72] cursor-pointer"
            >
              <X size={30} />
            </button>
          </div>

          {/* MENU CONTENT */}
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-5 md:px-12 md:pt-10">

            <nav>
              <ul className="space-y-2 cursor-pointer">

                {menu.map((item, index) => (
                  <li
                    key={item.name}
                    className="border-b border-black/10"
                  >
                    <div className="flex items-center justify-between gap-4">

                      {item.link ? (
                        <Link
                          href={item.link}
                          onClick={closeMenu}
                          className="py-4 text-2xl font-normal text-[#202020] transition hover:translate-x-2 hover:text-[#16b96c] md:py-5 md:text-4xl cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index
                            )
                          }
                          aria-expanded={activeDropdown === index}
                          className="flex flex-1 items-center justify-between py-4 text-left text-2xl font-normal text-[#202020] transition hover:text-[#16b96c] md:py-5 md:text-4xl"
                        >
                          {item.name}

                          <ChevronDown
                            size={25}
                            className={`transition-transform duration-300 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* SUBMENU */}
                    {item.submenu && activeDropdown === index && (
                      <ul className="mb-5 grid grid-cols-1 gap-x-8 rounded-xl bg-white/70 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-6">
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.link}
                              onClick={closeMenu}
                              className="block border-b border-gray-100 py-3 text-lg text-gray-700 transition hover:translate-x-1 hover:text-[#16b96c] md:text-base"
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

          </div>
        </div>
      )}
    </header>
  );
}
