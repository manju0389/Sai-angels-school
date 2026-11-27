"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaGraduationCap} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    { icon: <FaFacebookF size={18} />, link: "https://www.facebook.com/people/Sai-Angels-Group-of-Educational-Institutions/100063593875402", bg: "bg-[#1877F2]" },
    { icon: <FaInstagram size={18} />, link: "https://www.instagram.com/srisaiangels/?igsh=aTdnamg2cHJyenJy#", bg: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" },
    { icon: <FaYoutube size={18} />, link: "https://www.youtube.com/@srisaiangelsschool-g2l", bg: "bg-[#0A66C2]" },
    { icon: <FaYoutube size={18} />, link: "https://www.youtube.com/@SaiAngelsBoarding", bg: "bg-[#FF0000]" },
  ];

  const footerData = {
    pillars: [
      { name: "Home", link: "/" },
      { name: "About Us", link: "/about-us/about-us" },
      { name: "Admission", link: "/admission/admission" },
      { name: "Achievements", link: "/achievements" },
      { name: "News & Media", link: "/news-media" },
      { name: "Photo Gallery", link: "/gallery/photo-gallery" },
      { name: "Video Gallery", link: "/gallery/video-gallery" },
    ],
    usefulLinks: [
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
    joinUs: [
      { name: "Careers", link: "/careers" },
      { name: "Contact Us", link: "/contact-us" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={200} height={80} className="mb-4 h-auto w-auto cursor-pointer"/>
          </Link>
          <p>
            We at Sai Angels School make a conscious effort to unleash the “WHY” in learning because learning is never complete unless it answers the “WHY”.
          </p>
        </div>

        {/* Our Pillars */}
        <div>
          <h3 className="font-bold mb-2 pb-2">Quick Links</h3>

          <ul className="text-sm">
            {footerData.pillars.map((link) => (
              <li key={link.name} className="flex flex-row items-center gap-3 border-b border-gray-700 py-2 last:border-b-0">

                {/* Animated Green Dot */}
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                </span>

                <Link href={link.link} className="flex-1 leading-6 transition-colors duration-300 hover:text-gray-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-semibold mb-2 pb-2">CBSE School</h3>
          <ul className="text-sm">
            {footerData.usefulLinks.map((link) => (
              <li key={link.name} className="flex flex-row items-center gap-3 border-b border-gray-700 py-2 last:border-b-0">

                {/* Animated Green Dot */}
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                </span>

                <Link href={link.link} className="flex-1 leading-6 transition-colors duration-300 hover:text-gray-400">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Join Us + Address + Social Media + Online Payment */}
          <div>
            <h3 className="font-semibold mb-2 pb-2">Join Us</h3>
            {/* Links */}
            <ul className="text-sm">
              {footerData.joinUs.map((link) => (
                <li key={link.name} className="flex flex-row items-center gap-3 border-b border-gray-700 py-2 last:border-b-0">

                  {/* Animated Green Dot */}
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                  </span>

                  <Link href={link.link} className="flex-1 leading-6 transition-colors duration-300 hover:text-gray-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Address */}
            <div className="mt-4 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-white-500" /> : 
                <span> Sirgapura, Malalur Post, Chikmagalur - 577133</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-white-500" /> :
                <span>
                <a href="tel:9632315633" className="hover:hover:text-gray-300"> 9632315633 </a>
                {" "}
                
                /{" "} <a href="tel:8277522020" className="hover:hover:text-gray-300"> 8277522020 </a>
                
                {" "}
                      
                /{" "} <a href="tel:9448204444" className="hover:hover:text-gray-300"> 9448204444 </a></span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-white-500" /> :
                <span> 
                  <a href="mailto:saiangelsoffice@gmail.com" className="hover:hover:text-gray-300">
                      saiangelsoffice@gmail.com 
                  </a>
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6 mb-5">
              {socialMedia.map((item, idx) => (
                <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer"
                  className={`${item.bg} w-11 h-11 flex items-center justify-center rounded-full text-white shadow-md transition-transform transform hover:scale-110 hover:shadow-xl`}>
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Online Payment / Admission Button */}
            <Link href="/admission/admission" className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded">
              Click for Admission
            </Link>
          </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-400 pt-6 border-t border-gray-700">
        © {currentYear} Sai Angels School. All Rights Reserved.
      </div>

    {/* Floating WhatsApp & Call Buttons - Bottom Left */}
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919632315633?text=Hello%20Sai%20Angels%20School"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919632315633"
        aria-label="Call Sai Angels School"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700"
      >
        <FaPhoneAlt size={25} />
      </a>

    </div>


{/* Floating Social Media Sidebar - Right Side */}
<div className="fixed right-0 top-1/2 z-[9999] flex -translate-y-1/2 flex-col gap-2">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/people/Sai-Angels-Group-of-Educational-Institutions/100063593875402"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="flex h-11 w-11 items-center justify-center rounded-l-lg bg-[#1877F2] text-white shadow-lg transition-all duration-300 hover:w-14"
  >
    <FaFacebookF size={20} />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/srisaiangels/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="flex h-11 w-11 items-center justify-center rounded-l-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:w-14"
  >
    <FaInstagram size={21} />
  </a>

  {/* YouTube - School */}
  <a
    href="https://www.youtube.com/@srisaiangelsschool-g2l"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Sai Angels School YouTube"
    className="flex h-11 w-11 items-center justify-center rounded-l-lg bg-[#FF0000] text-white shadow-lg transition-all duration-300 hover:w-14"
  >
    <FaYoutube size={22} />
  </a>

  {/* YouTube - Boarding */}
  <a
    href="https://www.youtube.com/@SaiAngelsBoarding"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Sai Angels Boarding YouTube"
    className="flex h-11 w-11 items-center justify-center rounded-l-lg bg-[#B91C1C] text-white shadow-lg transition-all duration-300 hover:w-14"
  >
    <FaYoutube size={22} />
  </a>

  {/* Admission */}
  <Link
    href="/admission/admission"
    aria-label="Admissions"
    className="flex h-11 w-11 items-center justify-center rounded-l-lg bg-[#BE9939] text-white shadow-lg transition-all duration-300 hover:w-14"
  >
    <FaGraduationCap size={23} />
  </Link>

</div>

    </footer>

  );
}