"use client";
import { useEffect, useMemo, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import * as turf from "@turf/turf";
import hatyai_poi from "../data/hatyai_poi.json";
import pattani_poi from "../data/pattani_poi.json";
import surat_poi from "../data/surat_poi.json";
import phuket_poi from "../data/phuket_poi.json";
import trang_poi from "../data/trang_poi.json";

const LocationMarker = ({ position, setPosition }) => {
  return position === null ? null : (
    <Marker
      // eventHandlers={{
      //   click: () => setPosition(null),
      // }}
      position={position}
      icon={L.icon({
        iconSize: [30, 30],
        iconUrl: "/red-marker-3d.png",
      })}
    ></Marker>
  );
};

const MapEvents = ({
  setForm,
  form,
  setPosition,
  position,
  setOpenFormDrawer,
  isAdminDashBoard,
  campusId,
}) => {
  const [geojson, setGeoJson] = useState({});
  useEffect(() => {
    if (campusId === "01") {
      setGeoJson(hatyai_poi);
    } else if (campusId === "02") {
      setGeoJson(pattani_poi);
    } else if (campusId === "03") {
      setGeoJson(phuket_poi);
    } else if (campusId === "04") {
      setGeoJson(surat_poi);
    } else if (campusId === "05") {
      setGeoJson(trang_poi);
    } else {
      setGeoJson(hatyai_poi);
    }
  }, [campusId]);
  const map = useMapEvents({
    async click(e) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      await map.flyTo(e.latlng, 18);
      setPosition(e.latlng);
      setForm({
        ...form,
        lat: Number(e.latlng.lat),
        lng: Number(e.latlng.lng),
      });
      if (isAdminDashBoard) {
        setForm({
          ...form,
          locationName: "",
          lat: Number(e.latlng.lat),
          lng: Number(e.latlng.lng),
        });
      } else {
        setForm({
          ...form,
          location: "",
          lat: Number(e.latlng.lat),
          lng: Number(e.latlng.lng),
        });
        setOpenFormDrawer(true);
      }
      const clickedPoint = turf.point([e.latlng.lng, e.latlng.lat]);
      geojson.features.forEach((feature) => {
        if (turf.booleanPointInPolygon(clickedPoint, feature.geometry)) {
          const locationName = feature.properties.LOCATION_NAME;
          if (isAdminDashBoard) {
            setForm({
              ...form,
              locationName: locationName,
              lat: Number(e.latlng.lat),
              lng: Number(e.latlng.lng),
            });
          } else {
            setForm({
              ...form,
              location: locationName,
              lat: Number(e.latlng.lat),
              lng: Number(e.latlng.lng),
            });
          }
        }
      });
    },
  });

  return useMemo(
    () => <LocationMarker position={position} setPosition={setPosition} />,
    [position, setPosition]
  );
};

export default MapEvents;
