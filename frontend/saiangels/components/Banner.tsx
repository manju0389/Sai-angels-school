"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BannerData {
  image: string;
  title: string;
}

export default function Banner() {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("/api/banner");

        console.log("Banner response status:", response.status);

        if (!response.ok) {
          console.error(
            "Banner API failed:",
            response.status,
            response.statusText
          );
          return;
        }

        const data = await response.json();
        setBanner(data);

      } catch (error) {
        console.error("Banner fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading || !banner) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src={banner.image}
        alt={banner.title || "School Banner"}
        width={1200}
        height={400}
        priority
        className="h-auto w-full object-cover"
      />

      {banner.title && (
        <h1 className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded bg-black/50 px-5 py-2 text-3xl font-bold text-white">
          {banner.title}
        </h1>
      )}
    </section>
  );
}