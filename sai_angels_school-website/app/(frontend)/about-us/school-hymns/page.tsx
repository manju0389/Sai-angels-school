import QuickLinks from "@/components/QuickLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Hymns | Sai Angels School - Top CBSE School in Chikmagalur",
  description: "Sai Angels School is one of the best CBSE schools in Chikmagalur, offering quality education from primary to PU, boarding facilities, and holistic student development.",

  keywords: [
    "Chikmagalur best school", "Top CBSE School in Chikmagalur", 
    "Best Boarding School in Chikmagalur", "Best PU college in chikmagalur", 
    "Top PU college in chikmagalur", "best primary school in chikmagalur", "best campus in Chikmagalur"
  ],

  alternates: {
    canonical: "https://www.saiangelsschool.com/about-us/school-hymns",
  },

  openGraph: {
    title: "Sai Angels School | History",
    description:
      "Discover Sai Angels School, one of the leading CBSE schools in Chikmagalur, dedicated to academic excellence and holistic education.",
    url: "https://www.saiangelsschool.com/about-us/school-hymns",
    siteName: "Sai Angels School",
    locale: "en_IN",
    type: "website",
  },
};

export default function hymnsPage() {

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="mx-auto text-center">
          <h1 className="text-5xl font-bold text-black mb-3">
            Our School Hymns
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto py-6 ">

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2 text-justify">
           
            <p className="mb-6 leading-7 font-bold bg-[#04243d] text-white p-6 rounded-lg leading-9">
                <b className="text-3xl flex items-center justify-center"> School Anthem </b> <br></br>
                Love Is your form, Truth Is Your Breath <br></br>
                Bliss is your food <br></br>
                Your Life is Your Message, Expansion is Your Life <br></br>
                No Reason for love <br></br>
                No season for love <br></br>
                No birth, no death <br></br>
                Prema, satya, Ananda <br></br>
                Dharma, Shanthi, Ahimsa <br></br>
                Shirdi Sai, Satya Sai,Prema <br></br>
                Baba, <br></br>
                Jai Jai <br></br>
                Love is your form........ <br></br>
                Bliss is your food (3)
            </p>

            <hr></hr>

            <p className="mb-6 mt-6 leading-7 font-bold bg-[#002f54] text-white p-6 rounded-lg leading-9">
                <b className="text-3xl flex items-center justify-center"> Prayer </b> <br></br>
                You take all the obstacles away, O'! lord Gananatha <br></br>
                You give me happiness <br></br>
                You give me contentedness <br></br>
                When we start the day with your name <br></br>
                Oh Lord Gananatha
            </p>

            <hr></hr>

            <p className="mb-6 mt-6 leading-7 font-bold bg-[#024274] text-white p-6 rounded-lg leading-9">
                <b className="text-3xl flex items-center justify-center"> School Prayer </b> <br></br>
                He Jaga data vishwa Vidhatha <br></br>
                He Sukh Shanthi niketan he <br></br>
                Pream Ke Sindhu deen Ke bandhu <br></br>
                Dukh daridra Vinashana he <br></br>
                Nitya akhanda anantha anadi <br></br>
                Poorana brahma sanatana he <br></br>
                Jagadashya jaga pati jaga vandan <br></br>
                Anupam alak niranjan he
            </p>

            <hr></hr>

            <p className="mb-6 mt-6 leading-7 font-bold bg-[#23557b] text-white p-6 rounded-lg leading-9">
                <b className="text-3xl flex items-center justify-center"> Prayer Song 1 </b> <br></br>
                WALK WITH ME, O MY LORD, <br></br>
                Walk with me, O my Lord, <br></br>
                Through the darkest night and brightest day, <br></br>
                Be at my side, O Lord, <br></br>
                Hold my hand and guide me in my way. <br></br>
                Sometimes the road seems long <br></br>
                My energy is spent <br></br>
                Then, lord, I think of you and <br></br>
                I am given strength <br></br>
                Stones often bar my path and <br></br>
                There are times I fall. <br></br>
                But you are always there to help me <br></br>
                when I fall. <br></br>

                <b className="text-3xl flex items-center justify-center"> Prayer Song 2 </b> <br></br>
                Lab pe aati hai dua ban ke tamanna meri <br></br>
                Zindagi shamma ki surat ho Khudaya meri <br></br>
                Ho mere dam se yunhi mere watan ki zeenat Jis tarha phool se hoti hai chaman ki zeenat <br></br>
                Zindagi ho meri parwane ki surat ya Rabb <br></br>
                Ilm ki shamma se ho mujh ko mohabbat ya Rabb <br></br>
                Ho mera kaam gharibon ki himayat karna <br></br>
                Dardmando se za'eefon se mohabbat karna <br></br>
                Mere allah burai se bachana mujhko <br></br>
                Naik jo rah ho, ussi reh pe chalana mujhko
            </p>

            <hr></hr>

            <p className="mt-6 leading-7 font-bold bg-[#294154] text-white p-6 rounded-lg leading-9">
                <b className="text-3xl flex items-center justify-center"> School Song </b> <br></br>
                Sai angels Sai Angels Sai Angels my school <br></br>
                Sai angels Sai Angels Sai Angels my school <br></br>
                Teachers here are also dear <br></br>
                We learn to love and care <br></br>
                Here we come every day better than yesterday <br></br>
                We are shown how to grow and pray <br></br>
                In the sea of love we gather pearls <br></br>
                For the wisdom for my life <br></br>
                And they rise and shine with a discipline <br></br>
                Mind is the power I find inside
            </p>

          </div>

          {/* Sidebar */}
            <QuickLinks />

        </div>
      </section>
    </main>
  );
}