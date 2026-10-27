
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.saiangelsschool.com"),

  title: {
    default: "Sai Angels School | Best CBSE School in Chikmagalur",
    template: "%s | Sai Angels School",
  },

  description:
    "Sai Angels School in Chikmagalur provides quality CBSE education, boarding facilities, and PU college programs.",

  applicationName: "Sai Angels School",

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sai Angels School",
    title: "Sai Angels School | Best CBSE School in Chikmagalur",
    description:
      "Discover quality CBSE education, boarding facilities, and PU college programs at Sai Angels School in Chikmagalur.",
    url: "https://www.saiangelsschool.com",
  },

  robots: {
    index: true,
    follow: true,
  },
};

// Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
