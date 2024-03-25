"use client";
import React, { useMemo } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const LocationMarker = ({ position, setPosition }) => {
  return position === null ? null : (
    <Marker
      eventHandlers={{
        click: () => setPosition(null),
      }}
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

  return useMemo(
    () => <LocationMarker position={position} setPosition={setPosition} />,
    [position, setPosition]
  );
};

export default MapEvents;
