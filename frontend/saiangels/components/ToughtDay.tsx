import React from "react";
import { FaQuoteLeft, FaSun } from "react-icons/fa";

const ToughtDay = () => {
  return (
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 mt-10 rounded-3xl">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 px-6 py-10 text-center shadow-2xl backdrop-blur-md sm:px-8 sm:py-10">

          <div className="relative">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-blue-950 shadow-lg">
              <FaSun size={25} />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-amber-300">
              Inspire • Learn • Grow
            </p>

            <h2 className="mb-8 text-3xl font-extrabold text-white sm:text-4xl">
              Thought for the Day
            </h2>

            <FaQuoteLeft className="mx-auto mb-5 text-3xl text-amber-300" />

            <blockquote className="mx-auto max-w-3xl text-xl font-medium leading-9 text-blue-50 sm:text-2xl sm:leading-10">
              "Education is the most powerful weapon which you can use to
              change the world."
            </blockquote>

            <div className="mx-auto my-7 h-1 w-20 rounded-full bg-amber-400" />

            <p className="text-sm font-semibold tracking-wide text-amber-200">
              A Message to Inspire Every Learner
            </p>

            <p className="mt-6 text-sm text-blue-200">
              Start each day with a positive thought and a willingness to learn.
            </p>
          </div>
        </div>

        <img src="/images/image2.jpg"></img>
      </div>
    </section>
  );
};

export default ToughtDay;