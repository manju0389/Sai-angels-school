import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sai Angels CBSE School, Chikmagalur | Quality Education Since 1993",
  description: "Discover Sai Angels CBSE School in Chikmagalur, Karnataka. Established in 1993, the school offers quality education, modern laboratories, digital classrooms, sports, extracurricular activities and IIT foundation coaching.",
  keywords: [
    "Sai Angels CBSE School", "CBSE school in Chikmagalur", "best CBSE schools in Chikmagalur",
    "schools in Chikmagalur Karnataka", "CBSE education Karnataka", "IIT foundation coaching",
    "school with hostel facility",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/activities/sai-angels-cbse-school",
  },

  openGraph: {
    title: "Sai Angels CBSE School | Chikmagalur",
    description: "Explore academic excellence, modern learning facilities, sports and holistic education at Sai Angels CBSE School, Chikmagalur.",
    type: "website", locale: "en_IN",
    url: "https://www.saiangelsinstitutions.com/activities/sai-angels-cbse-school",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const advantages = [
  {
    icon: "∑",
    title: "Digital Math Lab",
    description:
      "Interactive learning resources that make mathematical concepts engaging and easier to understand.",
  },
  {
    icon: "Aa",
    title: "English Language Lab",
    description:
      "Multimedia-based learning to develop communication, language and English proficiency.",
  },
  {
    icon: "⚗",
    title: "Science Laboratories",
    description:
      "Dedicated Biology, Chemistry and Physics laboratories that encourage practical learning and scientific curiosity.",
  },
  {
    icon: "▤",
    title: "Well-Stocked Library",
    description:
      "A library with learning resources to encourage reading, research and independent learning.",
  },
  {
    icon: "⚽",
    title: "Professional Sports Coaching",
    description:
      "Sports training with professional coaches to nurture fitness, teamwork and sporting talent.",
  },
  {
    icon: "✦",
    title: "NTSE Coaching",
    description:
      "Additional academic guidance to help students strengthen their reasoning and problem-solving skills.",
  },
  {
    icon: "♫",
    title: "Extracurricular Activities",
    description:
      "Opportunities to explore skating, karate, cricket, dance, calligraphy, keyboard and other interests.",
  },
  {
    icon: "♡",
    title: "Values-Based Education",
    description:
      "Moral education inspired by Indian culture and heritage, encouraging responsibility and compassion.",
  },
  {
    icon: "♙",
    title: "Experienced Faculty",
    description:
      "Qualified and experienced teachers committed to student learning and personal development.",
  },
  {
    icon: "✎",
    title: "Teacher Development",
    description:
      "Orientation and training workshops to help teachers update their skills and teaching practices.",
  },
  {
    icon: "◎",
    title: "IIT Foundation Programme",
    description:
      "A goal-oriented IIT foundation initiative for students from Class 6 onwards, as offered by the school.",
  },
  {
    icon: "⌂",
    title: "Hostel Facilities",
    description:
      "Separate hostel facilities for boys and girls to support students who require residential accommodation.",
  },
];

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Sai Angels CBSE School",
  description:
    "Sai Angels CBSE School is an educational institution in Chikmagalur, Karnataka, offering academic learning, extracurricular activities and holistic student development.",
  foundingDate: "1993",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chikmagalur",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export default function SaiAngelsSchoolPage() {

  return (
    <main className="min-h-screen bg-[#f9f7f7]">

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#16091b] via-[#773194] to-[#8537a5] px-4 py-20 sm:py-24 md:py-28">
        <div className="mx-auto text-center">
          <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Sai Angels CBSE School
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto py-6 ">
      
      {/* Academic highlights */}
      <section className="border-y border-purple-100 bg-white px-5 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-3">
          <div>
            <p className="text-4xl font-extrabold text-red-800">
              1993
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Year Established
            </p>
          </div>

          <div className="sm:border-x sm:border-purple-100">
            <p className="text-4xl font-extrabold text-red-800">
              CBSE
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Affiliated Curriculum
            </p>
          </div>

          <div>
            <p className="text-4xl font-extrabold text-red-800">
              360°
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Holistic Student Development
            </p>
          </div>
        </div>
      </section>

      
{/* School advantages */}
<section aria-labelledby="school-advantages" className="px-5 py-10 sm:py-20">
  <div className="mx-auto max-w-6xl">

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {advantages.map((item) => (
        <article
          key={item.title}
          className="group rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-800 transition-colors group-hover:bg-purple-800 group-hover:text-white">
              {item.icon}
            </div>
          </div>

          <h3 className="mt-5 text-lg font-bold text-[#291139]">
            {item.title}
          </h3>

          <p className="mt-3 space-y-6 text-base leading-8 text-slate-600">
            {item.description}
          </p>

          <div className="mt-5 h-1 w-10 rounded-full bg-purple-300 transition-all duration-300 group-hover:w-16 group-hover:bg-purple-700" />
        </article>
      ))}
    </div>
  </div>
</section>


      {/* Closing section */}
      <section className="px-5 sm:pb-14">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#291139] via-[#642583] to-[#873caf] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">
            Learn • Grow • Achieve
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Nurturing Potential, Inspiring Futures
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-purple-100">
            At Sai Angels CBSE School, we strive to create an
            environment where every student can build confidence,
            discover their abilities and develop the knowledge and
            values needed for a meaningful future.
          </p>
        </div>
      </section>


      </section>
    </main>
  );
}
