
export function ToppersSection() {
  const [rankHolders, setRankHolders] = useState<Topper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRankHolders = async () => {
      try {
        const response = await fetch(`${API}/toppers/active`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load toppers");
        }

        setRankHolders(data.toppers || []);
      } catch (error) {
        console.error("Failed to fetch toppers:", error);
      }
    };

    fetchRankHolders();
  }, []);

  const visibleCount = 3;
  const maxIndex = Math.max(0, rankHolders.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current >= maxIndex ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((current) =>
      current <= 0 ? maxIndex : current - 1
    );
  };

  if (rankHolders.length === 0) return null;

  return (
    <section className="bg-[#142f70] px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Our SSLC Rank Holders (2025 - 2026)
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/95 sm:text-base">
            Discover the achievements of our students across SSLC With dedicated academic support
          </p>
        </div>

        {/* Achievement Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleCount)
              }%)`,
            }}
          >
            {rankHolders.map((student) => (
              <div
                key={student._id}
                className="w-1/3 min-w-0 flex-none px-2 sm:px-3"
              >
                <article className="mx-auto max-w-[260px] text-center">

                  {/* Poster */}
                  <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400 bg-white shadow-lg">
                    <img
                      src={student.poster}
                      alt={`${student.name} achievement poster`}
                      className="aspect-[3/3.15] w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Student Details */}
                  <h3 className="mt-3 truncate text-sm font-bold sm:text-base">
                    {student.name}
                  </h3>

                  {/* Score Badge */}
                  <span className="mt-3 inline-block rounded-sm bg-yellow-400 px-3 py-1.5 text-[10px] font-bold text-black sm:text-xs">
                    {student.score}
                  </span>

                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Divider and Controls */}
        <div className="mt-7 border-t border-white/25 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">

            <a
              href="/achievements"
              className="inline-flex items-center justify-center rounded-sm bg-yellow-400 px-4 py-2.5 text-xs font-bold text-white shadow transition hover:bg-yellow-500 sm:text-sm"
            >
              Click for all Achievements
            </a>

            {rankHolders.length > visibleCount && (
              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous rank holders"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  &#8249;
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next rank holders"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white transition hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  &#8250;
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
