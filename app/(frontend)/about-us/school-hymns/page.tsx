
import type { Metadata } from "next";
import QuickLinks from "@/components/QuickLinks";

export const metadata: Metadata = {
  title: "School Hymns | Sai Angels School, Chikmagalur",
  description: "Explore the school anthem, school prayer, prayer songs, and school song of Sai Angels School in Chikmagalur.",

  keywords: ["Sai Angels School Hymns", "Sai Angels School Anthem", "Sai Angels School Prayer",
    "School Prayer Chikmagalur", "Sai Angels School Song", "Sai Angels Institutions",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/school-hymns",
  },

  openGraph: {
    title: "School Hymns | Sai Angels School",
    description: "Read the school anthem, prayers, prayer songs, and school song of Sai Angels School.",
    url: "https://www.saiangelsinstitutions.com/about-us/school-hymns",
    siteName: "Sai Angels Institutions",
    locale: "en_IN",
    type: "website",
  },
};

const hymns = [
  {
    title: "School Anthem",
    background: "bg-[#04243d]",
    lines: [
      "Love Is your form, Truth Is Your Breath",
      "Bliss is your food",
      "Your Life is Your Message, Expansion is Your Life",
      "No Reason for love",
      "No season for love",
      "No birth, no death",
      "Prema, satya, Ananda",
      "Dharma, Shanthi, Ahimsa",
      "Shirdi Sai, Satya Sai, Prema",
      "Baba,",
      "Jai Jai",
      "Love is your form........",
      "Bliss is your food (3)",
    ],
  },
  {
    title: "Prayer",
    background: "bg-[#002f54]",
    lines: [
      "You take all the obstacles away, O'! Lord Gananatha",
      "You give me happiness",
      "You give me contentedness",
      "When we start the day with your name",
      "Oh Lord Gananatha",
    ],
  },
  {
    title: "School Prayer",
    background: "bg-[#024274]",
    lines: [
      "He Jaga data vishwa Vidhatha",
      "He Sukh Shanthi niketan he",
      "Pream Ke Sindhu deen Ke bandhu",
      "Dukh daridra Vinashana he",
      "Nitya akhanda anantha anadi",
      "Poorana brahma sanatana he",
      "Jagadashya jaga pati jaga vandan",
      "Anupam alak niranjan he",
    ],
  },
  {
    title: "Prayer Song 1",
    background: "bg-[#23557b]",
    lines: [
      "WALK WITH ME, O MY LORD,",
      "Walk with me, O my Lord,",
      "Through the darkest night and brightest day,",
      "Be at my side, O Lord,",
      "Hold my hand and guide me in my way.",
      "Sometimes the road seems long",
      "My energy is spent",
      "Then, Lord, I think of you and",
      "I am given strength",
      "Stones often bar my path and",
      "There are times I fall.",
      "But you are always there to help me",
      "when I fall.",
    ],
  },
  {
    title: "Prayer Song 2",
    background: "bg-[#23557b]",
    lines: [
      "Lab pe aati hai dua ban ke tamanna meri",
      "Zindagi shamma ki surat ho Khudaya meri",
      "Ho mere dam se yunhi mere watan ki zeenat, jis tarha phool se hoti hai chaman ki zeenat",
      "Zindagi ho meri parwane ki surat ya Rabb",
      "Ilm ki shamma se ho mujh ko mohabbat ya Rabb",
      "Ho mera kaam gharibon ki himayat karna",
      "Dardmando se za'eefon se mohabbat karna",
      "Mere Allah burai se bachana mujhko",
      "Naik jo rah ho, ussi reh pe chalana mujhko",
    ],
  },
  {
    title: "School Song",
    background: "bg-[#294154]",
    lines: [
      "Sai angels Sai Angels Sai Angels my school",
      "Sai angels Sai Angels Sai Angels my school",
      "Teachers here are also dear",
      "We learn to love and care",
      "Here we come every day better than yesterday",
      "We are shown how to grow and pray",
      "In the sea of love we gather pearls",
      "For the wisdom for my life",
      "And they rise and shine with a discipline",
      "Mind is the power I find inside",
    ],
  },
];

export default function SchoolHymnsPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our School Hymns
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-purple-100 sm:text-base">
            Our anthem, prayers, and songs reflect the values and spirit of Sai Angels School.
          </p>
        </div>
      </section>

      {/* Hymns and Quick Links */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Hymns */}
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {hymns.map((hymn) => (
              <article
                key={hymn.title}
                className={`${hymn.background} rounded-xl p-6 text-white shadow-md sm:p-8`}
              >
                <h2 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
                  {hymn.title}
                </h2>

                <div className="space-y-2 text-sm font-semibold leading-7 sm:text-base sm:leading-8">
                  {hymn.lines.map((line, index) => (
                    <p key={`${hymn.title}-${index}`}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Quick Links Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>
      </section>
    </main>
  );
}
