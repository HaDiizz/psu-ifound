"use client";
import React from "react";
import { LayersControl, LayerGroup } from "react-leaflet";
import BaseMapLayers from "./BaseMapLayers";

const MapLayers = () => {
  return (
    <LayersControl position="topright">
      <LayersControl.Overlay></LayersControl.Overlay>
      <BaseMapLayers />
    </LayersControl>
  );
};

export default MapLayers;
