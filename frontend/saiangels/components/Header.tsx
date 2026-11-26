
"use client";

import { useState, useEffect } from "react";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track page scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Navigation menu items
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
        { name: "Parental Co-Operation", link: "/admission/parental-co-operation" },
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

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // Header navigation text color
  const navTextColor =
    scrolled || !isHome ? "text-[#202020]" : "text-white";

  return (
    <header
      className={`sticky top-0 z-[9999] w-full transition-all duration-300 ${
        isHome
          ? `fixed left-0 top-0 ${
              scrolled ? "bg-white shadow-md" : "bg-transparent"
            }`
          : "bg-white shadow-md"
      }`}
    >
      
      {/* HEADER NAVIGATION */}
      <div
      className={`mx-auto flex min-h-[90px] max-w-[1440px] items-center px-5 md:px-8 lg:px-12 ${
        isHome ? "justify-between" : "justify-center"
      }`}
    >
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className={`relative z-20 flex h-[75px] w-[145px] shrink-0 items-center md:h-[85px] md:w-[170px] ${
          isHome ? "" : "absolute left-5 md:left-8 lg:left-12"
        }`}
        >
          <Image
            src="/images/logo.png"
            alt="Sai Angels School"
            width={200}
            height={120}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
        className={`hidden items-center gap-5 xl:flex 2xl:gap-7 ${
          isHome ? "" : "mx-auto"
        }`}
      >
          {menu.map((item) => (
            <div key={item.name} className="group relative">
              {item.link ? (
                <Link
                  href={item.link}
                  className={`cursor-pointer whitespace-nowrap py-8 text-[15px] font-semibold transition hover:text-[#16b96c] ${navTextColor}`}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`flex cursor-pointer items-center gap-1 whitespace-nowrap py-8 text-[15px] font-semibold transition hover:text-[#16b96c] ${navTextColor}`}
                >
                  {item.name}
                  <ChevronDown size={15} />
                </button>
              )}

              {/* DESKTOP DROPDOWN */}
              {item.submenu && (
                <div className="invisible absolute left-0 top-full z-50 w-[340px] translate-y-2 rounded-lg bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="max-h-[65vh] overflow-y-auto">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.link}
                        className="block rounded-md px-4 py-2 font-semibold text-gray-700 transition hover:bg-green-50 hover:text-[#16b96c]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setActiveDropdown(null);
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-md bg-[#20df82] text-black transition hover:bg-[#15ce72] xl:hidden"
        >
          {menuOpen ? <X size={25} /> : <MenuIcon size={25} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white shadow-xl xl:hidden"
        >
          <nav className="mx-auto max-h-[calc(100dvh-90px)] max-w-7xl overflow-x-hidden overflow-y-auto overscroll-y-contain px-5 py-4">
            {menu.map((item) => (
              <div key={item.name} className="border-b border-gray-100">
                {item.link ? (
                  <Link
                    href={item.link}
                    onClick={closeMenu}
                    className="block py-3.5 text-base font-medium text-gray-800 transition hover:text-[#16b96c]"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                      aria-expanded={activeDropdown === item.name}
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-gray-800 transition hover:text-[#16b96c]"
                    >
                      {item.name}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="mb-3 rounded-lg bg-gray-50 px-4 py-2">
                        {item.submenu?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.link}
                            onClick={closeMenu}
                            className="block border-b border-gray-100 py-3 text-sm text-gray-600 transition last:border-0 hover:text-[#16b96c]"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
