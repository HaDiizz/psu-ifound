import BannerSection from "@/components/BannerSection";

export const metadata = {
  alternates: {
    canonical: `/`,
    languages: {
      en: `/en`,
    },
  },
};

export default async function Home() {
  return (
    <div className="container pt-[5rem]">
      <BannerSection />
    </div>
  );
}
