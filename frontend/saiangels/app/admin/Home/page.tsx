

const banners = [
  { id: 1, image: "/images/banner1.jpg" },
  { id: 2, image: "/images/banner2.jpg" },
  { id: 3, image: "/images/banner3.jpg" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">


      <section className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full bg-[#4b455b] text-white md:w-[330px] md:shrink-0">
          <div className="border-b border-white/40 px-8 py-8">
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
          </div>

          <nav className="px-4 py-4">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`block border-b border-white/40 px-5 py-6 text-lg transition hover:bg-white/10 ${
                  item === "Banners Page"
                    ? "font-semibold bg-white/10"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1 bg-[#f3f3f5] px-6 py-10 md:px-10">

          <div className="mx-auto max-w-7xl">

            <h1 className="mb-5 text-4xl font-normal text-gray-900 md:text-5xl">
              Banners Page
            </h1>

            <hr className="mb-8 border-gray-400" />

            {/* Upload Banner */}
            <div className="space-y-5">

              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full rounded-lg border border-gray-300 bg-[#e9e9e9] text-lg file:mr-5 file:cursor-pointer file:rounded-lg file:border-0 file:bg-cyan-500 file:px-5 file:py-3 file:font-semibold file:text-black"
              />

              <button className="rounded-md bg-blue-600 px-7 py-3 text-lg text-white hover:bg-blue-700">
                Upload
              </button>

            </div>

            <hr className="my-8 border-gray-400" />

            {/* Banner List */}
            <div className="overflow-x-auto">

              <table className="w-full border-collapse text-left">

                <thead>
                  <tr className="bg-[#174b91] text-white">
                    <th className="px-4 py-5 text-lg">S.No</th>
                    <th className="px-4 py-5 text-lg text-center">
                      Banner Image
                    </th>
                    <th className="px-4 py-5 text-lg">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {banners.map((banner, index) => (
                    <tr
                      key={banner.id}
                      className="border-b border-gray-500 bg-[#e9e9e9]"
                    >
                      <td className="px-4 py-6 text-lg">
                        {index + 1}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            className="h-24 w-48 rounded-md border border-gray-400 object-cover"
                          />

                          <a
                            href={banner.image}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 underline"
                          >
                            View Banner
                          </a>
                        </div>
                      </td>

                      <td className="px-4 py-6">
                        <div className="flex flex-wrap gap-2">
                          <button className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                            Edit
                          </button>

                          <button className="rounded-md bg-red-600 px-5 py-2 text-white hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
