"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#4d465d] text-white px-4 py-3">
        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>

        <h1 className="text-lg font-semibold">Admin</h1>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 w-64
          text-white flex flex-col shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-400 bg-[#4d465d]">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={110}
              height={80}
              className="object-contain cursor-pointer h-auto w-auto"
            />
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-5 space-y-2 bg-[#4d465d]">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Dashboard
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/Home" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Home Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/Achievements" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Achievements Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/Administraion" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Administraion Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/CBSESchool" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            CBSE School Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/Founder" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Founder Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/NewsMedia" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            News - Media Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/PhotoGallery" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Photo Gallery Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/PrincipalSpeak" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Principal Speak Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/SaiCherbsInternational" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Sai Cherbs International Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/VideoGallery" className="block px-4 py-2 rounded-lg hover:bg-slate-500">
            Video Gallery Page
          </Link>

          <hr className="border-t border-slate-400"></hr>

          <Link href="/admin/WorkingHours" className="block px-4 py-2 mb-5 rounded-lg hover:bg-slate-500">
            Working Hours Page
          </Link>

          <hr className="border-b border-slate-400"></hr>

          <button className="w-full bg-[#2c1a5a] hover:bg-[#51398e] py-2 rounded-lg font-semibold">
            Logout
          </button>
        </nav>

      </aside>
    </>
  );
}