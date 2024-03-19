import axios from "@/lib/axios";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
  ssr: false,
});

const page = async ({ params }) => {
  let lat = 7.0063301;
  let lng = 100.4998717;
  const campusCoordinates = {
    "01": { lat: 7.0063301, lng: 100.4998717 },
    "02": { lat: 6.8782041, lng: 101.2359429 },
    "03": { lat: 7.8942686, lng: 98.3530526 },
    "04": { lat: 9.0937187, lng: 99.3568276 },
    "05": { lat: 7.5184169, lng: 99.5785418 },
  };

  if (campusCoordinates[params.campusId]) {
    lat = campusCoordinates[params.campusId].lat;
    lng = campusCoordinates[params.campusId].lng;
  }

  const { data } = await axios(`/report/campus/${params.campusId}`, {
    next: { revalidate: 3600 },
  });

  return (
    <div className="container pt-[5rem]">
      <LeafletMap lat={lat} lng={lng} campusId={params.campusId} reports={data} />
    </div>
  );
};

export default page;
