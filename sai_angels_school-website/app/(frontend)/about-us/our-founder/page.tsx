import FounderClient from "./FounderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Founder | Best School in Chikmagalur | Top CBSE School in Chikmagalur",
  description:
    "Learn about the founder and vision behind the best school in Chikmagalur. We provide quality education through the Top CBSE School in Chikmagalur, Best Boarding School in Chikmagalur and Best PU College in Chikmagalur.",

  keywords:[
    "Chikmagalur best school", "Top CBSE School in Chikmagalur",
    "Best Boarding School in Chikmagalur", "Best PU college in chikmagalur",
    "Top PU college in chikmagalur", "best primary school in chikmagalur", "best campus in Chikmagalur"
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/about-us/our-founder",
  },

  openGraph:{
    title:"Founder | Best School in Chikmagalur",

    description:"Discover the vision and leadership behind Chikmagalur's leading educational institution.",

    images: [
      {
        url: "/images/our-founder.jpg", width: 1600, height: 500, alt: "Sai Angels School",
      },
    ],
    locale: "en_IN",
    type: "website",
  }
};


export default function Page(){
 return <FounderClient/>;
}