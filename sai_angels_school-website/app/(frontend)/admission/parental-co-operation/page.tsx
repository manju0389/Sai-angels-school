import { FaArrowRight } from "react-icons/fa";

export default function ParentalPage() {
  // List of parental cooperation guidelines
  const data = [
    "Parents should have a positive attitude towards school, education and learning.",
    "Help your child with school work and familiarize them with school books.",
    "Encourage independence like dressing, eating habits, and self-care activities.",
    "Take children to parks, zoo, exhibitions, relatives’ homes and encourage social interaction.",
    "Teach hygiene habits like brushing teeth, washing hands, and keeping surroundings clean.",
    "Encourage manners like saying Good Morning, Thank You, Sorry, etc.",
    "Promote reading, storytelling, sensory learning, and environmental awareness.",
    "Involve children in kitchen activities like sorting fruits, vegetables, dals, seeds.",
    "Encourage drawing, coloring, and creative play activities.",
    "Select educational TV programs, CDs, and age-appropriate toys for learning.",
  ];

  return (
    <main className="min-h-screen bg-[#f9f7f7]">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-25 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black">
            Parental Co-Operation
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#6b5b5b] px-6 py-5">
            <h2 className="text-white text-lg md:text-xl font-semibold uppercase tracking-wide">
              To Prepare Your Child for School – Help Your Child Bloom
            </h2>
          </div>

          {/* Guidelines Table */}
          <table className="w-full">
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition" >
                  <td className="px-6 py-4 flex items-start gap-3 text-gray-700 text-sm md:text-base leading-relaxed">
                    {/* Arrow Icon */}
                    <FaArrowRight className="text-[#6b5b5b] mt-1 shrink-0" />

                    {/* Guideline Text */}
                    <span>{item}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}