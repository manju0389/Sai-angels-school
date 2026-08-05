import AdministrationClient from "./AdministrationClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration | Top CBSE School in Chikmagalur",
  description:
    "Meet the administration team of one of the best CBSE schools in Chikmagalur. We provide quality education, strong leadership, and holistic student development.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Top PU College in Chikmagalur",
    "Best Primary School in Chikmagalur", "Best Campus in Chikmagalur", "CBSE School",
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/about-us/administration",
  },

  openGraph: {
    title: "Administration | Top CBSE School in Chikmagalur",
    description:
      "Meet our experienced administration team and discover why we are among the best educational institutions in Chikmagalur.",
    url: "https://www.saiangelsschool.com/about-us/administration",
    locale: "en_IN",
    type: "website",
  },
};

export default function AdministrationPage() {
  return <AdministrationClient />;
}