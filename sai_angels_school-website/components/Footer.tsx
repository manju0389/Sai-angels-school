"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope} from "react-icons/fa";
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
              <li key={link.name} className="border-b border-gray-700 py-2 last:border-b-0">
                <Link href={link.link} className="block hover:text-gray-300 transition-colors">
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
              <li key={link.name} className="border-b border-gray-700 py-2 last:border-b-0">
                <Link href={link.link} className="block hover:text-gray-300 transition-colors">
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
                <li key={link.name} className="border-b border-gray-700 py-2 last:border-b-0">
                  <Link href={link.link} className="block hover:text-gray-300 transition-colors">
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
    </footer>
  );
}