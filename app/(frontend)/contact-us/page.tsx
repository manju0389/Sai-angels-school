
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sai Angels Schools | Chikmagalur",
  description: "Contact Little Sai Angels Pre School, Sai Angels School, Sai Angels Boarding Home, and Sai Cherubs International in Chikmagalur, Karnataka.",
  keywords: ["Sai Angels School Chikmagalur", "preschool in Chikmagalur", "schools in Chikmagalur",
    "Sai Cherubs International", "Sai Angels Boarding Home", "contact Sai Angels School",
  ],
  alternates: {
    canonical: "https://www.saiangelsinstitutions.com/contact",
  },
  openGraph: {
    title: "Contact Sai Angels Schools | Chikmagalur",
    description: "Find addresses and contact numbers for Sai Angels schools in Chikmagalur.",
    url: "https://www.saiangelsinstitutions.com/contact", siteName: "Sai Angels Schools", type: "website",
    images: [
      {
        url: "https://www.saiangelsinstitutions.com/images/contact-banner.jpg",
        alt: "Sai Angels School, Chikmagalur",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const contacts = [
  {
    title: "Little Sai Angels Pre School",
    address: "Chokkanna Street, Chikmagalur - 577101",
    phones: ["08262-23729"],
  },
  {
    title: "Sai Angels School",
    address: "Srigapura, Malalur Post, Chikmagalur - 577133",
    phones: ["9632315633", "8277522020"],
  },
  {
    title: "Sai Angels Boarding Home",
    address: "Srigapura, Malalur Post, Chikmagalur - 577133",
    phones: ["9916068002", "9731361473"],
  },
  {
    title: "Sai Cherubs International",
    address: "Jayanagar (Behind Cafe Coffee Day), Chikmagalur - 577101",
    phones: ["9148594659", "08262-233659"],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <img src="/images/contact-banner.jpg" alt="Sai Angels Schools, Chikmagalur" className="block h-auto max-h-[450px] w-full object-cover" />
      </section>

      {/* Page Heading */}
      <section className="px-4 pt-10 text-center">
        <h1 className="mb-5 text-center text-3xl md:text-4xl font-bold leading-tight text-[#102c50] sm:text-4xl">
          Contact Sai Angels Schools
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Get in touch with our schools in Chikmagalur, Karnataka. Find branch addresses and contact numbers below.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item) => (
            <article key={item.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <h2 className="mb-3 text-lg font-semibold text-gray-800">
                {item.title}
              </h2>

              <div className="mb-6 flex items-start gap-2 text-gray-600">
                <span aria-hidden="true">📍</span>
                <p className="text-sm leading-6">{item.address}</p>
              </div>

              <div className="mt-auto space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Contact Number
                </h3>

                {item.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 break-words font-medium text-red-500 transition-colors hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label={`Call ${item.title} at ${phone}`}
                  >
                    <span aria-hidden="true">📞</span>
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Google Maps */}
      <section className="w-full px-4 pb-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-center text-2xl md:text-3xl font-bold leading-tight text-[#102c50] sm:text-3xl">
            Find Us on Google Maps
          </h2>

          <div className="h-[300px] overflow-hidden rounded-xl shadow-md sm:h-[400px]">
            <iframe title="Sai Angels School location in Chikmagalur"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15532.886856081122!2d75.7798978!3d13.2740808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbf7afe6c45841854!2sSri+Sai+Angels+School!5e0!3m2!1sen!2sin!4v1487095296588"
              className="h-full w-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
