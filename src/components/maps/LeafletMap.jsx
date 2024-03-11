"use client";
import { useRef, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormDrawer from "../FormDrawer";
import Box from "@mui/material/Box";
import { FaTable } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import TableDrawer from "../TableDrawer";
import RedMarker from "@/assets/images/search-marker.png";
import MapLayers from "./layers/MapLayers";
import MapEvents from "./events/MapEvents";
import MarkerIcon from "@/assets/images/red-marker-3d.png";
import GreenMarker from "@/assets/images/found-marker.png";

const LeafletMap = (params) => {
  const mapRef = useRef(null);
  const [openFormDrawer, setOpenFormDrawer] = useState(false);
  const [openTableDrawer, setOpenTableDrawer] = useState(false);
  const [position, setPosition] = useState(null);
  const [form, setForm] = useState({
    title: "",
    detail: "",
    location: "",
    subLocation: "",
    lat: 0,
    lng: 0,
  });

  function handleOpenTableDrawer() {
    setOpenTableDrawer(true);
  }

  const flyTo = (lat, lng) => {
    mapRef.current.flyTo([lat, lng], 18);
  };

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={[params?.lat, params?.lng]}
        zoom={16}
        style={{ height: "100vh" }}
      >
        <MapLayers />
        <Marker
          eventHandlers={{
            click: () => flyTo(params?.lat, params?.lng),
          }}
          position={[params?.lat, params?.lng]}
          icon={L.icon({
            iconSize: [35, 35],
            iconUrl: RedMarker.src,
          })}
        >
          <Popup>TEST123</Popup>
        </Marker>
        <MapEvents
          setPosition={setPosition}
          position={position}
          form={form}
          setForm={setForm}
          setOpenFormDrawer={setOpenFormDrawer}
        />
      </MapContainer>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Button
          sx={{
            zIndex: 9999,
          }}
          onClick={handleOpenTableDrawer}
          isIconOnly
          color="danger"
          aria-label="Table"
        >
          <FaTable size={20} />
        </Button>
      </Box>
      <FormDrawer
        open={openFormDrawer}
        setOpen={setOpenFormDrawer}
        form={form}
        setForm={setForm}
      />
      <TableDrawer
        open={openTableDrawer}
        setOpen={setOpenTableDrawer}
        flyTo={flyTo}
      />
    </>
  );
};

export default LeafletMap;
