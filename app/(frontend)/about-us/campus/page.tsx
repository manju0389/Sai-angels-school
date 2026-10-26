
import type { Metadata } from "next";
import Image from "next/image";
import QuickLinks from "@/components/QuickLinks";

export const metadata: Metadata = {
  title: "Campus | Sai Angels School - Top CBSE School in Chikmagalur",
  description: "Explore Sai Angels School's campus in Chikmagalur, featuring modern learning facilities, science and maths labs, a library, smart classrooms, and sports facilities.",

  keywords: ["Sai Angels School", "Top CBSE School in Chikmagalur", "Best Boarding School in Chikmagalur",
    "Best PU College in Chikmagalur", "Best Primary School in Chikmagalur", "Sai Angels School Campus",
  ],

  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/about-us/campus",
  },

  openGraph: {
    title: "Our Campus | Sai Angels School",
    description: "Discover the learning facilities, laboratories, library, smart classrooms, and sports facilities at Sai Angels School, Chikmagalur.",
    url: "https://www.saiangelsinstitutions.com/about-us/campus",
    siteName: "Sai Angels Institutions",
    images: [
      {
        url: "/images/banner13.jpg", width: 1600, height: 500, alt: "Sai Angels School Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const campusSections = [
  {
    title: "A Mass Session Bhajans",
    paragraphs: [
      "Spiritual awakening through pious vibrations is what we seek from these sessions. The aim is to unite mind and body, improve concentration, and encourage control of thought processes. Every Thursday begins on a rejuvenating note with a bhajan session that helps students develop greater awareness and mental discipline. The sessions also reflect devotion to the Almighty and a spirit of service.",
    ],
  },
  {
    title: "English Lab",
    paragraphs: [
      "SAI SPEAKS, an acronym for Sai Angels Institute for Spoken and Communicative Skills, is a modern digital English language laboratory designed to develop effective communication skills in English. It was developed through the efforts of Mr. Mark Annand of New Zealand.",
      "Unlike conventional classroom approaches, the language laboratory provides students with a more interactive learning experience. It supports listening, speaking, and communication exercises, offering additional opportunities for students from non-English-speaking backgrounds to strengthen their language skills.",
    ],
  },
  {
    title: "School Library",
    paragraphs: [
      "Our well-furnished school library offers a wide range of literature and educational resources that support academic learning and personal growth. It also encourages exploration in photography, archaeology, scientific discovery, sports, music, history, art and craft, agriculture, and many other fields.",
    ],
  },
  {
    title: "Maths Lab",
    paragraphs: [
      "Sai Angels introduced a Maths Lab with the support of Funtoot, using specially designed educational software to make mathematics more engaging and child-friendly.",
      "Through interactive, mathematics-related games, students can build confidence and overcome their fear of the subject. The software supports the CBSE mathematics syllabus and allows students to explore concepts, identify their skill levels, and progress at their own pace.",
    ],
  },
  {
    title: "Science Lab",
    paragraphs: [
      "Our laboratories provide students with equipment, models, instruments, and materials for experiments and scientific exploration, supported by department assistants who help facilitate practical learning.",
      "The Physics, Biology, Chemistry, and Mathematics laboratories support hands-on education and discovery. Students also participate in science exhibitions, prepare projects and models, and develop the curiosity and practical skills that can inspire future scientists, engineers, and doctors.",
    ],
  },
  {
    title: "Smart Classes",
    paragraphs: [
      "At Sai Angels, classrooms are equipped with large screens and projectors that help teachers explain concepts through visual demonstrations and simulations. These resources make abstract or difficult topics easier to understand, encourage curiosity, and support a more engaging learning experience for students.",
    ],
  },
  {
    title: "Play Ground",
    paragraphs: [
      "Sai Angels provides a spacious playground, a separate basketball court, and an attractive play area for younger children. Students can participate in activities such as cricket, basketball, taekwondo, karate, skating, and volleyball, with coaching opportunities from professional trainers.",
    ],
  },
];

export default function CampusPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <Image
          src="/images/banner13.jpg" alt="Sai Angels School Campus"
          width={1600} height={500} priority sizes="100vw" className="h-auto w-full object-cover"
        />
      </section>

      {/* Campus Content */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="mb-8 text-center text-3xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          Our Campus
        </h1>

        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Campus Information */}
          <div className="min-w-0 space-y-8 lg:col-span-2">
            {campusSections.slice(0, 3).map((section) => (
              <CampusSection
                key={section.title}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>

          {/* Quick Links Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8">
            <QuickLinks />
          </aside>
        </div>

        {/* Additional Facilities */}
        <section className="mt-12 space-y-8 md:mt-16">

          <div className="grid gap-8 md:grid-cols-2">
            {campusSections.slice(3).map((section) => (
              <CampusSection
                key={section.title}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function CampusSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-xl font-bold italic text-[#102c50] sm:text-2xl">
        {title}
      </h2>

      <div className="space-y-4 text-justify text-base leading-8 text-slate-600">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}