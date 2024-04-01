"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLayers from "@/components/maps/layers/MapLayers";
import MapEvents from "@/components/maps/events/MapEvents";
import LeafletDrawControl from "@/components/maps/widgets/LeafletDrawControl";
import { Input, Checkbox } from "@nextui-org/react";
import FormButton from "@/components/FormButton";
import BackButton from "@/components/BackButton";
import toast from "react-hot-toast";
import { addLocation, updateLocation } from "@/lib/actions";

const LeafletMapContent = (params) => {
  const mapRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, setPosition] = useState({
    lat: params.lat,
    lng: params.lng,
  });
  const [form, setForm] = useState({
    locationName: "",
    lat: params.lat,
    lng: params.lng,
  });

  useEffect(() => {
    if (params.isEdit) {
      setForm({
        ...form,
        locationName: params?.location?.name,
        lat: params?.location?.lat,
        lng: params?.location?.lng,
      });
    }
  }, []);

  const flyTo = (lat, lng) => {
    mapRef?.current?.flyTo([lat, lng], 18);
  };

  const handleOnChangeCoordinates = (value, name) => {
    setForm({ ...form, [name]: Number(value) });
    setPosition({ ...position, [name]: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!form.locationName) {
      toast.error(`Location name Latitude or Longitude is required.`);
      setIsSubmitting(false);
      return;
    }
    let result;
    if (params.isEdit) {
      result = await updateLocation({
        name: form.locationName,
        lat: form.lat,
        lng: form.lng,
        locationId: params.location._id,
      });
      await params.mutate();
    } else {
      result = await addLocation({
        locationName: form.locationName,
        lat: form.lat,
        lng: form.lng,
        campId: params.campusId,
      });
    }
    if (result?.success) {
      toast.success(`${result?.message}`);
      setIsSubmitting(false);
      return;
    }

    if (result?.error) {
      toast.error(`${result?.message}`);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <BackButton />
      <div className="grid grid-cols-12 gap-5 pt-3 pb-[6rem] md:pb-3">
        <div className="col-span-12 md:col-span-8">
          <MapContainer
            ref={mapRef}
            center={[params?.lat, params?.lng]}
            zoom={16}
            style={{ height: "75vh", width: "100%" }}
          >
            <MapLayers campusId={params.campusId} />
            <MapEvents
              setPosition={setPosition}
              position={position}
              form={form}
              setForm={setForm}
              isAdminDashBoard={true}
              campusId={params.campusId}
            />
          </MapContainer>
        </div>
        <div className="col-span-12 md:col-span-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-y-5">
              <div className="col-span-12">
                <span className="text-xl">เพิ่มข้อมูลสถานที่</span>
              </div>
              <div className="col-span-12">
                <Input
                  value={form.locationName}
                  type="Location Name"
                  variant="bordered"
                  label="Location Name"
                  onValueChange={(input) =>
                    setForm({ ...form, locationName: input })
                  }
                />
              </div>
              <div className="col-span-12">
                <Input
                  type="number"
                  variant="bordered"
                  label="Latitude"
                  value={form?.lat}
                  onValueChange={(input) => {
                    handleOnChangeCoordinates(input, "lat");
                    flyTo(input, form.lng);
                  }}
                />
              </div>
              <div className="col-span-12">
                <Input
                  type="number"
                  variant="bordered"
                  label="Longitude"
                  value={form?.lng}
                  onValueChange={(input) => {
                    handleOnChangeCoordinates(input, "lng");
                    flyTo(form.lat, input);
                  }}
                />
              </div>
              <div className="w-full">
                <FormButton isSubmitting={isSubmitting} text={"Submit"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LeafletMapContent;
