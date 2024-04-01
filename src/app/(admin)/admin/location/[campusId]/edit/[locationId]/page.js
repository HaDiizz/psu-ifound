import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import EditLocation from "@/components/dashboard/EditLocation";
import { campusCoordinates } from "@/utils/constants";

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (session && session.user.role !== "admin") {
    redirect("/");
  }
  let lat = 7.0063301;
  let lng = 100.4998717;

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
