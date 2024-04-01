"use client";
import React from "react";
import { GeoJSON } from "react-leaflet";
import hatyai_poi from "./data/hatyai_poi.json";
import pattani_poi from "./data/pattani_poi.json";
import surat_poi from "./data/surat_poi.json";
import phuket_poi from "./data/phuket_poi.json";
import trang_poi from "./data/trang_poi.json";

const Location = ({ campusId }) => {
  const styleGeoJSON = () => {
    return {
      color: "#5C00FF",
      fillColor: "#7C36F8",
      weight: 1,
      opacity: 0.4,
      fillOpacity: 0.3,
      dashArray: "5, 5",
    };
  };
  return (
    <>
      {campusId === "01"
        ? hatyai_poi && <GeoJSON data={hatyai_poi} style={styleGeoJSON} />
        : campusId === "02"
        ? pattani_poi && <GeoJSON data={pattani_poi} style={styleGeoJSON} />
        : campusId === "03"
        ? phuket_poi && <GeoJSON data={phuket_poi} style={styleGeoJSON} />
        : campusId === "04"
        ? surat_poi && <GeoJSON data={surat_poi} style={styleGeoJSON} />
        : campusId === "05"
        ? trang_poi && <GeoJSON data={trang_poi} style={styleGeoJSON} />
        : hatyai_poi && <GeoJSON data={hatyai_poi} style={styleGeoJSON} />}
    </>
  );
};

export default Location;
