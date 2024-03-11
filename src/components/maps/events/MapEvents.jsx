"use client";
import React, { useMemo } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerIcon from "@/assets/images/red-marker-3d.png";

const LocationMarker = ({ position }) => {
  return position === null ? null : (
    <Marker
      position={position}
      icon={L.icon({
        iconSize: [30, 30],
        iconUrl: MarkerIcon.src,
      })}
    >
      <Popup>I am here</Popup>
    </Marker>
  );
};

const MapEvents = ({
  setForm,
  form,
  setPosition,
  position,
  setOpenFormDrawer,
}) => {
  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, 18);
      setPosition(e.latlng);
      setForm({
        ...form,
        lat: Number(e.latlng.lat),
        lng: Number(e.latlng.lng),
      });
      setOpenFormDrawer(true);
    },
  });

  return useMemo(() => <LocationMarker position={position} />, [position]);
};

export default MapEvents;
