
import React from "react";
import {
  FaTrophy,
  FaAward,
  FaMedal,
} from "react-icons/fa";

const awards = [
  {
    title: "Rank No.1 in Education Excellence",
    award: "Times Education Excellence Award",
    icon: FaTrophy,
    bg: "bg-[#013e37]",
    iconBg: "bg-sky-600",
    border: "border-emerald-700",
    text: "text-white",
  },
  {
    title: "Rank No.1 in Holistic Education",
    award: "India School Merit Award",
    icon: FaMedal,
    bg: "bg-[#4e5252]",
    iconBg: "bg-sky-600",
    border: "border-gray-600",
    text: "text-white",
  },
  {
    title: "Rank No.1 in Education Excellence",
    award: "The Education Excellence Award",
    icon: FaAward,
    bg: "bg-[#013e37]",
    iconBg: "bg-sky-600",
    border: "border-emerald-700",
    text: "text-white",
  },
];

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-15">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Image Composition */}
          <div className="relative mx-auto w-full max-w-xl pb-10 pr-8 sm:pb-12 sm:pr-12">
            {/* Decorative Background */}
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />

            {/* Main Image */}
            <div className="relative z-10 h-[520px] overflow-hidden rounded-bl-[100px] rounded-tr-[100px]">
              <img src="/images/best-school-Kukatpally.webp" alt="Students participating in school activities"
                className="w-full transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Secondary Image */}
            <div className="absolute -bottom-1 right-0 z-20 h-40 w-44 overflow-hidden rounded-bl-[55px] rounded-tr-[55px] border-[6px] border-white shadow-xl sm:h-52 sm:w-60">
              <img src="/images/best-school-Kukatpally.webp" alt="Students enjoying classroom activities" className="w-full" />
            </div>

            {/* Decorative Dots */}
            <div className="absolute bottom-0 left-1/4 z-0 grid grid-cols-6 gap-2">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} className="h-2 w-2 rounded-full border border-sky-500" />
              ))}
            </div>

            <div className="absolute right-2 top-1/4 z-0 grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <span  key={index} className="h-2 w-2 rounded-full border border-sky-500" />
              ))}
            </div>
          </div>

          {/* About Content */}
          <div className="relative z-10 pt-4 lg:pt-0"> 

            <h2 className="pb-4 text-3xl font-extrabold leading-tight text-[#102c50] sm:text-4xl lg:text-5xl">
              Welcome to{" "} <br></br>
              <span className="text-[#be9939]">
                Sai Angels School
              </span>
            </h2>

            <p className="mb-5 text-base leading-8 text-slate-600 text-justify">
              Sai Angels is committed to serving society in an environment dedicated to student success. 
              The Institution has always focused on educational excellence and the quality of education 
              among the students. The institution strives to promote in young minds a sense of 
              responsibility for their own development and an understanding of their duties as members of 
              a society. The Institution encourages students to learn, the ability to think clearly and 
              express themselves effectively, the habit of analytical and reflective thought, and an 
              awareness about themselves, their heritage, their culture, their environment and their 
              country.
            </p>

            <p className="mb-5 text-base leading-8 text-slate-600 font-bold text-justify">
              "Education is natural, harmonious and progressive development of man's innate powers."It 
              inculcates certain values and principles and also prepares a human being for social life.
            </p>

            {/* Learn More Button */}
            <a href="/about-us/about-us" 
            className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-[#07204f] px-5 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg" >
              
              Learn More
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </a>
            
          </div>
        </div>

      </div>
    </section>
  );
}