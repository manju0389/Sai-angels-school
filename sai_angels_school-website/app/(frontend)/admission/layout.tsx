import Banner from "@/components/Banner";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner />   {/* 🔥 ONE banner for ALL pages */}
      {children}
    </>
  );
}