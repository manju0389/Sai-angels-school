
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

    if (!apiUrl) {
      alert("Backend URL is not configured.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        alert(data.message || "Logout failed. Please try again.");
        return;
      }

      setOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);
      alert("Cannot connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const closeSidebar = () => setOpen(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/Home", label: "Home Page" },
    { href: "/admin/Achievements", label: "Achievements Page" },
    { href: "/admin/Administraion", label: "Administration Page" },
    { href: "/admin/CBSESchool", label: "CBSE School Page" },
    { href: "/admin/Founder", label: "Founder Page" },
    { href: "/admin/PhotoGallery", label: "Photo Gallery Page" },
    { href: "/admin/PrincipalSpeak", label: "Principal Speak Page" },
    { href: "/admin/VideoGallery", label: "Video Gallery Page" },
    { href: "/admin/WorkingHours", label: "Working Hours Page" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between bg-[#4d465d] px-4 py-3 text-white md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu size={28} />
        </button>

        <h1 className="text-lg font-semibold">Admin</h1>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64
          flex-col text-white shadow-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end bg-[#4d465d] p-4 md:hidden">
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="border-b border-slate-400 bg-[#4d465d] p-6">
          <Link href="/" onClick={closeSidebar}>
            <Image
              src="/images/logo.png"
              alt="Sai Angels School Logo"
              width={110}
              height={80}
              className="h-auto w-auto cursor-pointer object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto bg-[#4d465d] px-3 py-5">
          {links.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={closeSidebar}
                className="block rounded-lg px-4 py-2 transition hover:bg-slate-500"
              >
                {link.label}
              </Link>

              <hr className="mt-2 border-slate-400" />
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="bg-[#4d465d] p-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2c1a5a] py-3 font-semibold transition hover:bg-[#51398e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={18} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
