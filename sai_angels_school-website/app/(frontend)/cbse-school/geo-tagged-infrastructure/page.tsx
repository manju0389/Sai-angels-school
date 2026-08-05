import CBSESchool from "@/components/CBSESchool";
import Link from "next/link";
import { FileText, MousePointerClick } from "lucide-react";
import Image from "next/image";

const photos = [
  "/images/geotagged/image1.jpg",
  "/images/geotagged/image2.jpg",
  "/images/geotagged/image3.jpg",
  "/images/geotagged/image4.jpg",
  "/images/geotagged/image5.jpg",
];

export default function GtiPage() {
  return (
    <main>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 py-10 px-6 mb-[4%]">
        <div className="mx-auto text-center space-y-10">
            <h1 className="text-4xl font-bold text-black-800 mb-3"> Geo tagged infrastructure </h1>
        </div>
        </section>

                {/* Photos Section */}
                <section className="container mx-auto py-10 px-4">
        
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((photo, index) => (
                      <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300" >
                        <Image src={photo} alt={`Fire Certificate Photo ${index + 1}`}
                          width={600} height={1000}
                          className="w-full h-160 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                

        <CBSESchool />
        </section>
    </main>
  );
}