"use server";
import BannerSection from "@/components/BannerSection";

export default async function Home() {
  return (
    <div className="container pt-[5rem]">
      <BannerSection />
    </div>
  );
}
