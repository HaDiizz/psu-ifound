"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useLocation } from "@/hooks/swr";
import { Spinner } from "@nextui-org/react";
const LeafletMap = dynamic(
  () => import("@/components/dashboard/maps/LeafletMapContent"),
  {
    ssr: false,
  }
);
const EditLocation = ({ campusId, lat, lng, locationId }) => {
  const { data, mutate, isLoading } = useLocation(locationId);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center pt-5">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <LeafletMap
          lat={data?.lat || lat}
          lng={data?.lng || lng}
          campusId={campusId}
          isEdit={true}
          location={data}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default EditLocation;
