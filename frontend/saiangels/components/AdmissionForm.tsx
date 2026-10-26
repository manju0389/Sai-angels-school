"use client";

import { FormEvent } from "react";

export default function AdmissionEnquiryForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#6b5b5b] px-6 py-4">
        <h2 className="text-white text-lg font-semibold uppercase tracking-wide">
          Admission Enquiry Form
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <input type="text" placeholder="Name*" required className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="email" placeholder="Email Id*" required className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="tel" placeholder="Mobile Number*" required className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <select defaultValue="" required className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-600" >
          
          <option value="" disabled>
            Select Grade*
          </option>
          <option value="LKG">LKG</option>
          <option value="UKG">UKG</option>
          <option value="First Standard">First Standard</option>
          <option value="Second Standard">Second Standard</option>
          <option value="Third Standard">Third Standard</option>
          <option value="Fourth Standard">Fourth Standard</option>
          <option value="Fifth Standard">Fifth Standard</option>
          <option value="Sixth Standard">Sixth Standard</option>
          <option value="Seventh Standard">Seventh Standard</option>
          <option value="Eighth Standard">Eighth Standard</option>
          <option value="Ninth Standard">Ninth Standard</option>
          <option value="Tenth Standard">Tenth Standard</option>
        </select>

        <input type="text" placeholder="Country*" required className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="text" placeholder="City*" required className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <button type="submit" className="w-full cursor-pointer bg-[#2E1F66] hover:bg-[#080028] text-green-500 font-semibold py-2 rounded-md" >
          Submit
        </button>
      </form>
    </div>
  );
}