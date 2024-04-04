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

  const { data } = await axios(`/report/campus/${params.campusId}`, {
    next: { revalidate: 3600 },
  });

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
