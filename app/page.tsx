
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HomeBanner from "@/components/HomeBanner";
import AboutSection from "@/components/AboutSection";
import AcademicPrograms from "@/components/AcademicPrograms";
import ChairmanMessage from "@/components/ChairmanMessage";
import AmenitiesSection from "@/components/AmenitiesSection";
import HomeAdmission from "@/components/HomeAdmission";
import HomeGallery from "@/components/HomeGallery";
import HomeVideo from "@/components/HomeVideo";
import ToppersSection from "@/components/ToppersSection";
import SchoolTestinomial from "@/components/SchoolTestinomial";
import RecentNews from "@/components/RecentNews";
import ToughtDay from "@/components/ToughtDay";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <HomeBanner />

        {/* About the Institution */}
        <AboutSection />

        {/* Academic Programs */}
        <AcademicPrograms />

        {/* Chairman's Message */}
        <ChairmanMessage />

        {/* Campus Facilities */}
        <AmenitiesSection />

        {/* Admissions + Thought of the Day */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Thought of the Day */}
          <div>
            <ToughtDay />
          </div>

          {/* Admissions */}
          <div>
            <HomeAdmission />
          </div>
        </section>

        {/* Toppers Section */}
        <ToppersSection />

        {/* Gallery */}
        <HomeGallery />

        {/* Videos */}
        <HomeVideo />


        {/* News and Updates + Testimonials */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* News and Update */}
          <div>
            <RecentNews />
          </div>

          {/* Testimonials */}
          <div>
            <SchoolTestinomial />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
