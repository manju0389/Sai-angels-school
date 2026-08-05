export default function ContactPage() {
  // Contact information for all branches
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

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Banner */}
      <section className="w-full">
        <img src="/images/contact-banner.jpg" alt="Sai Angels School" className="h-72 w-full object-cover" />
      </section>

      {/* Contact Cards Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((item, idx) => (
            <div key={idx} className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-lg" >
              {/* Branch Name */}
              <h2 className="mb-3 text-lg font-semibold text-gray-800">
                {item.title}
              </h2>

              {/* Branch Address */}
              <p className="mb-6 text-md text-gray-600">{item.address}</p>

              {/* Contact Numbers */}
              <div className="space-y-2">
                {item.phones.map((phone, i) => (
                  <a key={i} href={`tel:${phone}`} className="block font-medium text-red-500 hover:text-gray-700" >
                    📞 {phone}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Google Maps Location */}
      <section className="w-full px-4 pb-10">
        <div className="mx-auto h-[350px] max-w-6xl overflow-hidden rounded-xl shadow-md">
          <iframe className="h-full w-full"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15532.886856081122!2d75.7798978!3d13.2740808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbf7afe6c45841854!2sSri+Sai+Angels+School!5e0!3m2!1sen!2sin!4v1487095296588"
            loading="lazy" allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}