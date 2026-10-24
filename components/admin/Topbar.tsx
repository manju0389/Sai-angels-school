"use client";

import { ChevronDown } from "lucide-react";

const Topbar = () => {
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

          <div className="absolute right-0 mt-2 w-44 overflow-hidden bg-white shadow-lg">
            <button className="block cursor-pointer w-full px-4 py-2 text-left hover:bg-gray-100">
              My Profile
            </button>

            <button className="block cursor-pointer w-full border-t px-4 py-2 text-left text-red-600 hover:bg-red-50">
              Logout
            </button>
          </div>
        </details>
      </div>
    </header>
  );
};

export default Topbar;