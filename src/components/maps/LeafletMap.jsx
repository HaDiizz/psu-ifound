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
import MapLayers from "./layers/MapLayers";
import MapEvents from "./events/MapEvents";
import DetailModal from "../DetailModal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useLocations } from "@/hooks/swr";

const LeafletMap = (params) => {
  const { data, isLoading } = useLocations(params.campusId);
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

  const handleOnChangeSelection = (key) => {
    const getLocation = data.filter((item) => item._id === key);
    if (!getLocation.length) {
      return;
    }
    flyTo(getLocation[0].lat, getLocation[0].lng);
  };

  return (
    <>
      <div className="pb-5 pt-8">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <>
              <Autocomplete
                size="sm"
                label="Search a location"
                variant="bordered"
                defaultItems={isLoading ? [] : data}
                onSelectionChange={(key) => handleOnChangeSelection(key)}
              >
                {(item) => (
                  <AutocompleteItem key={item._id}>
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </>
          </div>
        </div>
      </div>
      <MapContainer
        ref={mapRef}
        center={[params?.lat, params?.lng]}
        zoom={16}
        style={{ height: "73vh" }}
      >
        <MapLayers campusId={params.campusId} />
        {params?.reports.map((report) => (
          <Marker
            key={report._id}
            eventHandlers={{
              click: () => flyTo(report?.lat, report?.lng),
            }}
            position={[report?.lat, report?.lng]}
            icon={L.icon({
              iconSize: [35, 35],
              iconUrl:
                report.status === "unclaimed"
                  ? "/search-marker.png"
                  : "/found-marker.png",
            })}
          >
            <Popup>
              <div className="grid">
                <span className="text-md font-bold capitalize">
                  {report.title}
                </span>
                <span
                  className="underline text-small capitalize text-default-400 cursor-pointer"
                  onClick={() =>
                    handleOpenDetailModal(report._id, report.lat, report.lng)
                  }
                >
                  ดูรายละเอียดเพิ่มเติม
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapEvents
          campusId={params.campusId}
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
        setForm={setForm}
      />
      <TableDrawer
        open={openTableDrawer}
        setOpen={setOpenTableDrawer}
        flyTo={flyTo}
        reports={params.reports}
        setItemId={setItemId}
        handleOpenDetailModal={handleOpenDetailModal}
      />
      <DetailModal isOpen={isOpen} onClose={onClose} itemId={itemId} />
    </>
  );
};

export default LeafletMap;
