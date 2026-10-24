"use client";

import React, { useState } from "react";
import {
  FaUserGraduate,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

export default function HomeAdmission() {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Connect this handler to your backend or form service.
  console.log("Admission enquiry:", formData);
  alert("Your admission enquiry has been prepared successfully!");

  setFormData({
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "",
    parentName: "",
    phone: "",
    email: "",
    address: "",
  });
};

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-5">

          {/* Right Admission Form */}
          <div className="p-4 sm:p-10 lg:p-10">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-800">
                Admission 2027–28
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Enquire for Admission
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fill in the details below. Our admissions team can guide you
                through the next steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Information */}
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
                  <FaUserGraduate className="text-blue-700" />
                  Student Information
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter student's full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Class Applying For *
                    </label>
                    <select
                      name="classApplying"
                      value={formData.classApplying}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select class</option>
                      <option value="Pre-Nursery">Pre-Nursery</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={`Class ${i + 1}`}>
                          Class {i + 1}
                        </option>
                      ))}
                      <option value="PUC 1st Year">PUC 1st Year</option>
                      <option value="PUC 2nd Year">PUC 2nd Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-800">
                  <FaUser className="text-blue-700" />
                  Parent / Guardian Information
                </h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Enter parent or guardian name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      pattern="[0-9]{10}"
                      title="Enter a 10-digit mobile number"
                      maxLength={10}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Residential Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter your residential address"
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-blue-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-900 sm:text-base"
              >
                Submit Admission Enquiry
                <FaArrowRight />
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                By submitting this form, you agree to be contacted regarding
                your admission enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}