
import VideoClient from "./VideoClient";
import { Metadata } from "next";

// SEO metadata for the Achievements page.
export const metadata: Metadata = {
  title: "Administration | Top CBSE School in Chikmagalur",

  description: "Meet the administration team of one of the best CBSE schools in Chikmagalur. We provide quality education, strong leadership, and holistic student development.",

  // Keywords relevant to the school and its educational services.
  keywords: [ "Chikmagalur best school", "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur", "Best Primary School in Chikmagalur",
    "Best Campus in Chikmagalur", "CBSE School",
  ],

  // Canonical URL for search engine indexing.
  alternates: {
    canonical:
      "https://www.saiangelsschool.com/about-us/administration",
  },

  // Open Graph metadata for social media sharing.
  openGraph: {
    title: "Administration | Top CBSE School in Chikmagalur",

    description: "Meet our experienced administration team and discover why we are among the best educational institutions in Chikmagalur.",

    url: "https://www.saiangelsschool.com/about-us/administration",
    locale: "en_IN",
    type: "website",
  },
};

// Render the Achievements page.
export default function VideoGalleryPage() {
  return <VideoClient />;
}