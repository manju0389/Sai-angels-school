
import Link from "next/link";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-semibold uppercase tracking-widest text-emerald-700">
          Sai Angels Institutions
        </p>

        <h1 className="mb-6 text-4xl font-bold text-slate-900">
          School Activities
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          Explore the academic, cultural, sports, and extracurricular
          activities that support our students' all-round development.
        </p>

        <div className="mt-8">
          <Link
            href="/activities/sai-angels-cbse-school"
            className="inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Explore School Activities
          </Link>
        </div>
      </div>
    </main>
  );
}
