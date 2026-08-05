import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus | Sai Angels School - Top CBSE School in Chikmagalur",
  description: "Sai Angels School is one of the best CBSE schools in Chikmagalur, offering quality education from primary to PU, boarding facilities, and holistic student development.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", 
    "Best Boarding School in Chikmagalur", "Best PU college in chikmagalur", 
    "Top PU college in chikmagalur", "best primary school in chikmagalur", "best campus in Chikmagalur"
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/about/campus",
  },

  openGraph: {
    title: "Sai Angels School | About Us",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsschool.com/about/campus",
    siteName: "Sai Angels School",
    images: [
      {
        url: "/images/banner13.jpg", width: 1600, height: 500, alt: "Sai Angels School",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function CampusPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <Image src="/images/banner13.jpg" alt="Sai Angels School Campus" width={1600} height={500} className="h-auto w-full object-cover"/>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-6">
        <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Our Campus
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Campus Information */}
          <div className="text-justify lg:col-span-2">
            {/* Bhajan Session */}
            <CampusSection title="A Mass Session Bhajans">
              Spiritual awakening through pious vibration is what we seek from these sessions. To unite 
              mind and body for concentration and control of thought process is the sole idea. Every 
              thursday starts on a rejuvenating note of Bhajan Session that assists students be in better 
              control of their stream-of-consciousness and physical and mental communion. Union with the 
              Almighty and service to Him is reflected through the course.
            </CampusSection>

            {/* English Lab */}
            <CampusSection title="English Lab">
              SAI SPEAKS ,an acronym for Sai Angels Institute for Spoken and Communicative skills is a 
              modern, state-of-the-art digital English language laboratory, a first of its kind, among 
              the schools of Karnataka for learning effective communicative skills in English in the 
              global scenario. It is the result of the painstaking effort of Mr. Mark Annand of New 
              Zealand.
              <br /><br />
              A conventional classroom approach permits limited interaction between the teacher and the 
              students and at most encourages reading and writing. The language lab in contrast provides 
              for more wholesome language learning experience for the modern student’s needs. This lab 
              Offers e- learning opportunities for language learning at school for students from 
              non-English speaking backgrounds using various listening and spoken English exercise.
            </CampusSection>

            {/* School Library */}
            <CampusSection title="School Library">
              A well furnished school library hosts whole gamut of literature material apt for literary 
              upliftment and curriculum boosting. It also opens avenues for new learning in the spheres 
              of photography, archaeology, scientific exploration, sports, music, history, art and craft, 
              agriculture, and more.
            </CampusSection>
          </div>

          {/* Sidebar */}
          <QuickLinks />
        </div>

        {/* Additional Facilities */}
        <div className="text-justify">
          <CampusSection title="Maths Lab">
            Sai Angels stands first again to strap another amenity to its grace-The Maths Lab, with the 
            help of Funtoot. This software is specially designed to turn Mathematics, which is dreaded by 
            students in most parts of the world into a fun and child-friendly subject.
            <br /><br />
            Everyone is aware of how modern children adapt to computers and enjoy playing games on them. 
            Funtoot encourages them to play math related games thereby ridding them of ‘MATH PHOBIA’. The 
            software is designed to support CBSE related syllabus for math. The lab gives the child the 
            opportunity to be tutored on a one-to one basis. The child is able to identify his/her 
            individual skill level through games and then proceed to higher levels at his/her own pace.
          </CampusSection>

          <CampusSection title="Science Lab">
            Abundantly stocked labs with up-to-date equipments, implements ,models, instruments, acids 
            and solutions for experimentations and research combined with amicable department assistants 
            take lab learning to next level for our students.
            <br /><br />
            Physics ,Biology ,Chemistry and Maths Labs offer up to date teaching and learning 
            infrastructure. Their creativity and discoveries are so obviously manifest in science 
            exhibitions held in our school or outside from time to time. Budding scientists, engineers 
            and doctors of tomorrow are carved right here taking these baby steps to giant leap one day. 
            Regular projects and models are also made as part of students’ activity or home work which 
            they present in the school.
          </CampusSection>

          <CampusSection title="Smart Classes">
            At Sai Angels, Each classroom is provided with a large screen and a projector which provides 
            visual simulations for anything that isn’t readily or practically available such as natural 
            phenomena, mechanical objects, medical equipments, flora and species unseen and functionality 
            of anything natural or unnatural, a few to mention. It propels thought process among students 
            which helps them learn things quickly and without much strain on neurons. It makes for an 
            effective teaching aid for the teachers as well as fun learning way for children.
          </CampusSection>

          <CampusSection title="Play Ground">
            At Sai angels we have a very spacious playground, a separate basketball ground and an 
            attractive play area for little ones. Here we also provide special cricket, basketball 
            coaching, taekwondo, karate, skating, volleyball etc from leading professional coaches from 
            Karnataka.
          </CampusSection>
        </div>
      </section>
    </main>
  );
}

// Reusable content section component
function CampusSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 text-base leading-7 text-gray-800">
      <h2 className="mb-2 text-2xl font-bold text-gray-900 italic">{title}</h2>
      <p>{children}</p>
    </div>
  );
}