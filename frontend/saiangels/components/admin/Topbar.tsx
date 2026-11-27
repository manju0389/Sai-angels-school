
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, UserRound, LogOut } from "lucide-react";

const Topbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    if (loading) return;

    setLoading(true);
    setError("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

    if (!apiUrl) {
      setError("Backend URL is not configured.");
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
        setError(data.message || "Logout failed. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);
      setError("Cannot connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="flex items-center justify-between bg-[#564d6e] px-6 py-4 shadow-md">
      <h1 className="text-xl font-semibold text-white">
        Admin Panel
      </h1>

      <div className="relative">
        <details className="group relative">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium shadow hover:bg-gray-100">
            Admin
            <ChevronDown
              size={16}
              className="transition-transform group-open:rotate-180"
            />
          </summary>

          <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-lg">
            <Link
              href="/admin/profile"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserRound size={17} />
              My Profile
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="flex w-full items-center cursor-pointer gap-2 border-t px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={17} />
              {loading ? "Logging out..." : "Logout"}
            </button>

            {error && (
              <p className="border-t bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
        </details>
      </div>
    </header>
  );
};

export default Topbar;
