import BannerSection from "@/components/BannerSection";
import { ContainerScroll } from "@/components/ui/ContainerScrollAnimation";
import Image from "next/image";
import Banner from "../../public/ipad_banner.png";
import TitleComponent from "@/components/ui/TitleComponent";
import { CardHoverEffect } from "@/components/ui/CardHoverEffect";
import FooterSection from "@/components/layout/FooterSection";

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
      <ContainerScroll titleComponent={<TitleComponent />}>
        <Image
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          src={Banner}
          height={720}
          width={1400}
          priority
          alt="Ipad review banner"
          unoptimized
        />
      </ContainerScroll>
      <div className="flex md:flex-row flex-col gap-6 pb-[8rem] items-center">
        <h2 className="font-bold text-center">Features</h2>
        <CardHoverEffect />
      </div>
      <FooterSection />
    </div>
  );
}
