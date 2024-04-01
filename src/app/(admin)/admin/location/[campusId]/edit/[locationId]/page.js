import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import EditLocation from "@/components/dashboard/EditLocation";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
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

  return (
    <>
      <EditLocation
        lat={lat}
        lng={lng}
        locationId={params.locationId}
        campusId={params.campusId}
      />
    </>
  );
};

export default Page;
