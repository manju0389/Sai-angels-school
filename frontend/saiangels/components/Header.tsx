
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<number | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<number | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Close dropdown when clicking outside the header
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdown(null);
        setMobileOpen(false);
        setMobileDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Clear pending desktop dropdown close
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Delayed close prevents dropdown flickering
  const scheduleClose = () => {
    cancelClose();

    closeTimer.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 180);
  };

  // Toggle desktop dropdown
  const toggleDesktopDropdown = (index: number) => {
    cancelClose();

    setDesktopDropdown((current) =>
      current === index ? null : index
    );
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (index: number) => {
    setMobileDropdown((current) =>
      current === index ? null : index
    );
  };

  // Close all mobile navigation
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header
      ref={headerRef}
      className={`z-[999999] isolate w-full ${
        isHome
          ? "absolute left-0 top-0 bg-transparent"
          : "relative bg-white shadow-sm"
      }`}
    >
      {/* TOP CONTACT BAR */}
      <div className="bg-black/55 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm md:text-base">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">

          {/* EMAIL */}
          <a
            href="mailto:saiangelsoffice@gmail.com"
            className="transition-colors hover:text-[#eab341]"
          >
            <span className="mr-1 text-[#eab341]">☎</span>
            Email: saiangelsoffice@gmail.com
          </a>

          {/* PHONE */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="mr-1 text-[#eab341]">☎</span>
            Mobile:

            <a href="tel:9632315633" className="hover:text-[#eab341]">
              9632315633
            </a>
            /

            <a href="tel:8277522020" className="hover:text-[#eab341]">
              8277522020
            </a>
            /

            <a href="tel:9448204444" className="hover:text-[#eab341]">
              9448204444
            </a>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition hover:text-[#eab341]"
            >
              <FaFacebookF size={19} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:text-[#eab341]"
            >
              <FaInstagram size={21} />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition hover:text-[#eab341]"
            >
              <FaYoutube size={23} />
            </a>

            <a
              href="https://wa.me/919632315633"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition hover:text-[#eab341]"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="relative z-[9999] px-3 pt-4 md:px-6 md:pt-6">
        <div className="container relative mx-auto">

          <div className="relative flex min-h-[76px] items-center rounded-full border border-white/60 bg-white/90 py-2 pl-[88px] pr-3 shadow-[0_8px_35px_rgba(0,0,0,0.15)] backdrop-blur-lg md:min-h-[94px] md:pl-[145px] md:pr-5">

            {/* LOGO */}
            <Link
              href="/"
              className="absolute -left-1 top-1/2 z-20 flex h-[88px] w-[88px] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg md:h-[125px] md:w-[125px]"
              onClick={() => {
                setDesktopDropdown(null);
                closeMobileMenu();
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Sai Angels School Logo"
                width={120}
                height={120}
                priority
                className="h-[82%] w-[82%] object-contain"
              />
            </Link>

            {/* LOGO DIVIDER */}
            <div className="absolute left-[105px] top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gray-300 md:left-[132px] md:block" />

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden min-w-0 flex-1 xl:block">
              <ul className="flex items-center justify-between gap-1">

                {menu.map((item, index) => (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.submenu) {
                        cancelClose();
                        setDesktopDropdown(index);
                      } else {
                        scheduleClose();
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.submenu) {
                        scheduleClose();
                      }
                    }}
                  >
                    {item.link ? (
                      <Link
                        href={item.link}
                        onClick={() => setDesktopDropdown(null)}
                        className={`relative flex items-center justify-center whitespace-nowrap rounded-full px-3 py-3 text-[14px] font-bold transition-all duration-300 2xl:px-4 2xl:text-[16px] ${
                          item.name === "Home"
                            ? "bg-[#302477] text-white shadow-md after:absolute after:-bottom-2 after:left-1/2 after:h-[3px] after:w-10 after:-translate-x-1/2 after:rounded-full after:bg-[#eab341]"
                            : "text-[#202044] hover:bg-[#f8f2e6] hover:text-[#b98220]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleDesktopDropdown(index)}
                        aria-expanded={desktopDropdown === index}
                        aria-haspopup="true"
                        className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-3 text-[16px] font-bold text-[#202044] transition-all duration-300 hover:bg-[#f8f2e6] hover:text-[#b98220] 2xl:px-4 2xl:text-[16px]"
                      >
                        {item.name}

                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-300 ${
                            desktopDropdown === index
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                    )}

                    {/* DESKTOP DROPDOWN */}
                    {item.submenu && desktopDropdown === index && (
                      <ul
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                          className="absolute left-0 top-full z-[999999] mt-2 max-h-[75vh] w-[290px] overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-2xl"
                        >
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.link}
                              onClick={() => setDesktopDropdown(null)}
                              className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:translate-x-1 hover:bg-[#f8f3e9] hover:text-[#a87919]"
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

            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f8fa] text-[#252047] shadow-sm transition-all duration-300 hover:bg-[#302477] hover:text-white xl:hidden"
              onClick={() => {
                setMobileOpen((prev) => !prev);
                setMobileDropdown(null);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={25} /> : <Menu size={25} />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <nav className="relative z-[150] mx-3 mt-3 max-h-[75vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-2xl xl:hidden md:mx-6">
          <ul className="px-3 py-3">

            {menu.map((item, index) => (
              <li
                key={item.name}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between">

                  {item.link ? (
                    <Link
                      href={item.link}
                      onClick={closeMobileMenu}
                      className="flex-1 py-4 text-sm font-semibold text-[#252047]"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(index)}
                      aria-expanded={mobileDropdown === index}
                      className="flex-1 py-4 text-left text-sm font-semibold text-[#252047]"
                    >
                      {item.name}
                    </button>
                  )}

                  {item.submenu && (
                    <button
                      type="button"
                      className="rounded-full p-3 text-[#252047] transition hover:bg-[#f8f3e9]"
                      aria-label={`Toggle ${item.name} submenu`}
                      aria-expanded={mobileDropdown === index}
                      onClick={() => toggleMobileDropdown(index)}
                    >
                      <ChevronDown
                        size={19}
                        className={`transition-transform duration-300 ${
                          mobileDropdown === index
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  )}

                </div>

                {/* MOBILE DROPDOWN */}
                {item.submenu && mobileDropdown === index && (
                  <ul className="mb-3 ml-3 rounded-xl bg-[#f8f6f1] p-2">
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.link}
                          onClick={closeMobileMenu}
                          className="block border-b border-gray-200 px-4 py-3 text-sm text-gray-700 transition hover:text-[#b98220] last:border-0"
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
