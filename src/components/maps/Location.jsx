"use client";
import { GeoJSON } from "react-leaflet";
import hatyai_poi from "./data/hatyai_poi.json";
import pattani_poi from "./data/pattani_poi.json";
import surat_poi from "./data/surat_poi.json";
import phuket_poi from "./data/phuket_poi.json";
import trang_poi from "./data/trang_poi.json";
import { useEffect, useState } from "react";
import { database } from "@/lib/firebase";

const Location = ({ campusId }) => {
  const [fileCampus, setFileCampus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    database.files
      .where("campusId", "==", campusId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const file = querySnapshot.docs[0].data();
          try {
            const parsedData = JSON.parse(file.data);
            if (!parsedData.type || parsedData.type !== "FeatureCollection") {
              throw new Error(
                "Invalid JSON format: 'type' property is missing or not equal to 'FeatureCollection'"
              );
            }
            if (!parsedData.features || !Array.isArray(parsedData.features)) {
              throw new Error(
                "Invalid JSON format: 'features' property is missing or not an array"
              );
            }
            for (const feature of parsedData.features) {
              if (
                feature.type !== "Feature" ||
                !feature.geometry ||
                !feature.properties
              ) {
                throw new Error(
                  "Invalid JSON format: 'feature' 'geometry' or 'properties' property is missing or not an array"
                );
              }
              const geometry = feature.geometry;
              if (
                geometry.type !== "Polygon" ||
                !Array.isArray(geometry.coordinates)
              ) {
                throw new Error(
                  "Invalid JSON format: 'geometry type' or 'geometry coordinates' property is missing or not an array"
                );
              }
            }
            setFileCampus(parsedData);
            setIsLoading(false);
          } catch (error) {
            setFileCampus(null);
            setIsLoading(false);
          }
        } else {
          setFileCampus(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setFileCampus(null);
        setIsLoading(false);
      });
  }, [campusId]);

  return (
    <>
      {!isLoading && (
        <>
          {campusId === "01"
            ? hatyai_poi && (
                <GeoJSON data={fileCampus || hatyai_poi} style={styleGeoJSON} />
              )
            : campusId === "02"
            ? pattani_poi && (
                <GeoJSON
                  data={fileCampus || pattani_poi}
                  style={styleGeoJSON}
                />
              )
            : campusId === "03"
            ? phuket_poi && (
                <GeoJSON data={fileCampus || phuket_poi} style={styleGeoJSON} />
              )
            : campusId === "04"
            ? surat_poi && (
                <GeoJSON data={fileCampus || surat_poi} style={styleGeoJSON} />
              )
            : campusId === "05"
            ? trang_poi && (
                <GeoJSON data={fileCampus || trang_poi} style={styleGeoJSON} />
              )
            : hatyai_poi && <GeoJSON data={hatyai_poi} style={styleGeoJSON} />}
        </>
      )}
    </>
  );
};

export default Location;
