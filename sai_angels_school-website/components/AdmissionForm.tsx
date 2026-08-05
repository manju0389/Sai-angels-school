"use client";

export default function AdmissionEnquiryForm() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        <input type="text" placeholder="Name*" className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="email" placeholder="Email Id*" className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="tel" placeholder="Mobile Number*" className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <select className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-600">
          <option>Select Grade*</option>
          <option>LKG</option>
          <option>UKG</option>
          <option>First Standard</option>
          <option>Second Standard</option>
          <option>Third Standard</option>
          <option>Fourth Standard</option>
          <option>Fifth Standard</option>
          <option>Sixth Standard</option>
          <option>Seventh Standard</option>
          <option>Eighth Standard</option>
          <option>Ninth Standard</option>
          <option>Tenth Standard</option>
        </select>

        <input type="text" placeholder="Country*" className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <input type="text" placeholder="City*" className="w-full rounded-md border border-gray-300 px-4 py-2" />

        <button type="submit" className="w-full cursor-pointer bg-[#2E1F66] hover:bg-[#080028] text-green-500 font-semibold py-2 rounded-md">
          Submit
        </button>

      </form>
    </div>
  );
}