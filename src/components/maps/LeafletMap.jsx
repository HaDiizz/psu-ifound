"use client";
import { useRef, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import FormDrawer from "../FormDrawer";
import Box from "@mui/material/Box";
import { FaTable } from "react-icons/fa";
import { Button, useDisclosure } from "@nextui-org/react";
import TableDrawer from "../TableDrawer";
import RedMarker from "@/assets/images/search-marker.png";
import MapLayers from "./layers/MapLayers";
import MapEvents from "./events/MapEvents";
import GreenMarker from "@/assets/images/found-marker.png";
import DetailModal from "../DetailModal";

const LeafletMap = (params) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemId, setItemId] = useState("");
  const mapRef = useRef(null);
  const [openFormDrawer, setOpenFormDrawer] = useState(false);
  const [openTableDrawer, setOpenTableDrawer] = useState(false);
  const [position, setPosition] = useState(null);
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
  });

  function handleOpenTableDrawer() {
    setOpenTableDrawer(true);
  }

  const flyTo = (lat, lng) => {
    mapRef?.current?.flyTo([lat, lng], 18);
  };

  const handleOpenDetailModal = async (id, latitude, longitude) => {
    await flyTo(latitude, longitude);
    await setItemId(id);
    await onOpen();
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
        {params?.posts.map((post) => (
          <Marker
            key={post._id}
            eventHandlers={{
              click: () => flyTo(post?.lat, post?.lng),
            }}
            position={[post?.lat, post?.lng]}
            icon={L.icon({
              iconSize: [35, 35],
              iconUrl:
                post.status === "unclaimed" ? RedMarker.src : GreenMarker.src,
            })}
          >
            <Popup>
              <div className="grid">
                <span className="text-md font-bold capitalize">
                  {post.title}
                </span>
                <span
                  className="underline text-small capitalize text-default-400 cursor-pointer"
                  onClick={() => handleOpenDetailModal(post._id, post.lat, post.lng)}
                >
                  ดูรายละเอียดเพิ่มเติม
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
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
        campusId={params.campusId}
      />
      <TableDrawer
        open={openTableDrawer}
        setOpen={setOpenTableDrawer}
        flyTo={flyTo}
        posts={params.posts}
        setItemId={setItemId}
        handleOpenDetailModal={handleOpenDetailModal}
      />
      <DetailModal isOpen={isOpen} onClose={onClose} itemId={itemId} />
    </>
  );
};

export default LeafletMap;
