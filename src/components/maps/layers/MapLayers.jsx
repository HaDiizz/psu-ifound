"use client";
import { LayersControl } from "react-leaflet";
import BaseMapLayers from "./BaseMapLayers";
import Location from "../Location";

const MapLayers = ({ campusId }) => {
  return (
    <LayersControl position="topright">
      <LayersControl.Overlay name="Location Area">
        <Location campusId={campusId} />
      </LayersControl.Overlay>
      <BaseMapLayers />
    </LayersControl>
  );
};

export default MapLayers;
