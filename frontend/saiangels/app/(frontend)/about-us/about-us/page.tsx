
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-700">
          Sai Angels Institutions
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
          About Us
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          Discover our institution, our history, our vision and mission,
          and the people dedicated to providing quality education.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Our History", href: "/about-us/history" },
            { title: "Our Founder", href: "/about-us/our-founder" },
            { title: "Administration", href: "/about-us/administration" },
            { title: "Principal Speaks", href: "/about-us/principal-speaks" },
            { title: "Vision & Mission", href: "/about-us/vision-mission" },
            { title: "Our Campus", href: "/about-us/campus" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-white p-6 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md"
            >
              {item.title} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
