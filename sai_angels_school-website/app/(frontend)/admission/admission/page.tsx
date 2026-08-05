import AdmissionEnquiryForm from "@/components/AdmissionForm";

export default function AdmissionPage() {
  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full">
        <img src="/images/admission-banner.jpg" alt="Sai Angels School" className="w-full object-cover"/>
      </section>

      {/* Content */}
      <section className="container mx-auto py-6">
        <h1 className="mb-5 text-center text-4xl font-bold text-gray-800 md:text-3xl">
          Admission
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2 text-justify">

            {/* School Admission */}
            <h2 className="mb-2 text-2xl font-bold">
              Guidelines for admission to School
            </h2>

            <ul className="mb-6 list-disc pl-6 space-y-3 text-gray-700">
              <li>
                <strong>For admission to Nursery and Cherubs:</strong>{" "}
                For information regarding nursery admissions.
              </li>

              <li>
                <strong>For admission to LKG:</strong>{" "}
                The child should be 3 years and 6 months of age or more as on 1st June.
              </li>

              <li>
                <strong>For admission to First Grade:</strong>{" "}
                The child should be 5 years and 6 months of age or more as on 1st June.
              </li>

              <li>
                <strong>For any other information regarding admission:</strong>{" "}
                Please contact us. Our dedicated staff members will provide all the information required.
              </li>
            </ul>

            {/* PU College */}
            <h2 className="mb-2 text-2xl font-bold">
              Guidelines for admission to PU College
            </h2>

            <p className="mb-6 text-base leading-7 text-gray-800">
              The student should have finished his SSLC examination from state PU board/CBSE/ICSE.
              Since only science combinations are available (PCMB, PCMC, and PCME), the student
              needs to qualify in a basic entrance test based on 10th standard science syllabus.
            </p>

            {/* Boarding Home */}
            <h2 className="mb-2 text-2xl font-bold">
              Guidelines for admission to Boarding Home
            </h2>

            <p className="mb-6 text-base leading-7 text-gray-800">
              We have a spacious and well-organised boarding facility for non-residents of Chikmagalur
              seeking admissions. For more information regarding admission to boarding, please contact us.
            </p>

          </div>
        
          {/* Sidebar */}
          <AdmissionEnquiryForm />

        </div>
      </section>
    </main>
  );
}