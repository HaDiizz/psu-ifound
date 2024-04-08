"use client";
import { LayersControl } from "react-leaflet";
import BaseMapLayers from "./BaseMapLayers";
import Location from "../Location";

const MapLayers = ({ campusId, isCheckedArea }) => {
  return (
    <LayersControl position="topright">
      <LayersControl.Overlay
        name="Location Area"
        checked={isCheckedArea ? true : false}
      >
        <Location campusId={campusId} />
      </LayersControl.Overlay>
      <BaseMapLayers />
    </LayersControl>
  );
};

export default MapLayers;
