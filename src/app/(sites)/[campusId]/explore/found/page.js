import { axios } from "@/lib/axios";
import dynamic from "next/dynamic";
import { campusCoordinates } from "@/utils/constants";
const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
  ssr: false,
});

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
