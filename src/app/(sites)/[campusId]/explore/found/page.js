import { axios } from "@/lib/axios";
import dynamic from "next/dynamic";
import { campusCoordinates } from "@/utils/constants";
import { campusData } from "@/utils/constants";
const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
  ssr: false,
});

export async function generateMetadata({ params }) {
  return {
    title:
      campusData
        .find((campus) => campus.campId === params.campusId)
        .campNameEng.split("Prince of Songkla University ")[1] || "-",
    description: `Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you. This is ${
      campusData.find((campus) => campus.campId === params.campusId)
        .campNameEng || "-"
    }, Lost and Found Hub: ค้นพบและประกาศรายการของที่หายในทุกวิทยาเขต 5 แห่งของมหาวิทยาลัยสงขลานครินทร์ ติดต่อเจ้าของหรือผู้ค้นพบ สิ่งของที่หายของคุณอาจพบทางกลับมาหาคุณได้ และนี่คือประกาศเจอของหายในมหาวิทยาลัยสงขลานครินทร์ ${
      campusData.find((campus) => campus.campId === params.campusId)
        .campNameThai || "-"
    }`,
    openGraph: {
      title: "PSU iFound",
      description: `Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you. This is ${
        campusData.find((campus) => campus.campId === params.campusId)
          .campNameEng || "-"
      }`,
      images: [
        {
          url: "/logo-ifound.webp",
          width: 400,
          height: 300,
        },
      ],
    },
    alternates: {
      canonical: `/${params.campusId}/explore/found`,
      languages: {
        en: `/en/${params.campusId}/explore/found`,
      },
    },
  };
}

const page = async ({ params }) => {
  let lat = 7.0063301;
  let lng = 100.4998717;

  if (campusCoordinates[params.campusId]) {
    lat = campusCoordinates[params.campusId].lat;
    lng = campusCoordinates[params.campusId].lng;
  }

  const { data } = await axios(`/report/campus/${params.campusId}`);

  return (
    <div className="container pt-[5rem]">
      <LeafletMap
        lat={lat}
        lng={lng}
        campusId={params.campusId}
        reports={data}
      />
    </div>
  );
};

export default page;
