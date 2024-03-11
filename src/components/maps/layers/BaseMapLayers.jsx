import React from "react";
import { LayersControl, TileLayer, LayerGroup } from "react-leaflet";

const BaseMapLayers = () => {
  return (
    <>
      <LayersControl.BaseLayer name="Open Street Map" checked>
        <TileLayer
          attribution="Open Street Map"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Satellite Map">
        <TileLayer
          attribution="Satellite Map"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked name="Google Map">
        <TileLayer
          attribution="Google Map"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer name="Google Map Satellite">
        <LayerGroup>
          <TileLayer
            attribution="Google Map Satellite"
            url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          />
          <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
        </LayerGroup>
      </LayersControl.BaseLayer>
    </>
  );
};

export default BaseMapLayers;
