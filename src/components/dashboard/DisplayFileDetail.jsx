"use client";
import { database } from "@/lib/firebase";
import { useEffect, useState, useRef } from "react";
import { Button } from "@nextui-org/react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useTheme } from "next-themes";
import { MapContainer } from "react-leaflet";
import MapLayers from "@/components/maps/layers/MapLayers";
import LeafletDrawControl from "@/components/maps/widgets/LeafletDrawControl";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/php/php";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/textile/textile";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";

const DisplayFileDetail = ({ fileId }) => {
  const { theme } = useTheme();
  const mapRef = useRef(null);
  const router = useRouter();
  const [geoJsonFeature, setGeoJsonFeature] = useState([]);
  const [geoCoordinates, setGeoCoordinates] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [currentData, setCurrentData] = useState("");
  const [previousData, setPreviousData] = useState("");
  const editor = useRef();
  const wrapper = useRef();
  const editorWillUnmount = () => {
    editor.current.display.wrapper.remove();
  };

  const codes = {
    html: "xml",
    php: "php",
    js: "javascript",
    jsx: "jsx",
    txt: "textile",
    xml: "xml",
    css: "css",
    c: "clike",
    cpp: "clike",
    java: "textile",
    cs: "clike",
    py: "python",
    json: "javascript",
  };

  const extension =
    currentFile &&
    currentFile.name.split(".")[currentFile.name.split(".").length - 1];

  useEffect(() => {
    database.files
      .doc(fileId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentFile(doc.data());
        } else {
          setCurrentFile(null);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong, try again later.");
      });
  }, [fileId]);

  useEffect(() => {
    if (currentFile) {
      setCurrentData(currentFile.data);
      setPreviousData(currentFile.data);
    }
  }, [currentFile]);

  const handleDrawPolygon = (geojson) => {
    setGeoJsonFeature([]);
    const { layerType, layer } = geojson;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setGeoJsonFeature((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
      const transformedCoordinates = layer
        .getLatLngs()[0]
        .map((coord) => [coord.lng, coord.lat]);
      setGeoCoordinates({
        coordinates: [transformedCoordinates],
        type: "Polygon",
      });
    }
  };
  const handleDeletePolygon = (geojson) => {
    const {
      layers: { _layers },
    } = geojson;
    Object.values(_layers).map(({ _leaflet_id }) => {
      setGeoJsonFeature((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };
  const handleEditPolygon = (geojson) => {
    const {
      layers: { _layers },
    } = geojson;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setGeoJsonFeature((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const handleCopyCoordinates = () => {
    const coordinatesString = JSON.stringify(geoCoordinates, null, 2);
    navigator.clipboard.writeText(coordinatesString);
    toast.success("Copied to clipboard");
  };

  const pushBack = () => {
    if (currentData.trim() !== previousData.trim()) {
      if (window.confirm("are your sure to leave without saving data?")) {
        router.back();
      } else {
        return;
      }
    } else {
      router.back();
    }
  };

  const handleUpdateFileData = () => {
    try {
      const parsedData = JSON.parse(currentData);
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
      setCurrentData(currentData + "\n");
      setPreviousData(currentData + "\n");
      database.files
        .doc(fileId)
        .update({
          updatedAt: new Date(),
          data: currentData,
        })
        .then(() => {
          toast.success("Saved successful");
          document.querySelector(".CodeMirror").focus();
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    } catch (e) {
      toast.error("Invalid JSON format. " + e.message);
    }
  };

  return (
    <div>
      <div className="flex gap-x-4 items-center">
        <h1 className="text-default-500 pb-2 font-bold text-2xl">
          {fileId}.json
        </h1>
        {currentData !== previousData && (
          <span className="text-red-500 font-bold">(Modified)</span>
        )}
      </div>
      <div className="flex justify-end gap-x-5">
        <div className="flex justify-start">
          <Button color="primary" onClick={() => pushBack()}>
            Back
          </Button>
        </div>
        <Button
          variant="flat"
          color="success"
          isDisabled={currentData === previousData}
          onClick={handleUpdateFileData}
        >
          Save
        </Button>
      </div>
      {currentFile && (
        <div className="grid grid-cols-12 w-full m-0 py-5 gap-x-5">
          <div
            className="col-span-12 md:col-span-6"
            style={{ overflowX: "hidden", overflowY: "auto" }}
          >
            <CodeMirror
              value={currentData}
              options={{
                mode: {
                  name: codes[extension],
                  json: extension === "json",
                },
                theme: theme === "dark" ? "blackboard" : "eclipse",
                lineNumbers: true,
                inputStyle: "textarea",
                autofocus: true,
                lineWrapping: true,
              }}
              onBeforeChange={(editor, data, value) => {
                setCurrentData(value);
              }}
              style={{ textAlign: "left !important" }}
              ref={wrapper}
              editorDidMount={(e) => (editor.current = e)}
              editorWillUnmount={editorWillUnmount}
            />
          </div>
          <div className="col-span-12 md:col-span-6 max-h-[100vh]">
            <MapContainer
              ref={mapRef}
              center={[currentFile?.lat, currentFile?.lng]}
              zoom={16}
              style={{ height: "65vh", width: "100%" }}
            >
              <MapLayers isCheckedArea={true} campusId={currentFile.campusId} />
              <LeafletDrawControl
                onCreate={handleDrawPolygon}
                onEdited={handleEditPolygon}
                onDeleted={handleDeletePolygon}
              />
            </MapContainer>
            <div className="card border dark:border-slate-600 shadow-md bg-slate-200/25 dark:bg-slate-800/50 w-full h-[33vh] mt-[2vh] overflow-y-auto">
              <div className="flex justify-end bg-[#0c1021] h-8 items-center">
                <span
                  className="p-4 cursor-pointer"
                  onClick={handleCopyCoordinates}
                >
                  <Copy size={15} />
                </span>
              </div>
              <pre className="p-3">
                {JSON.stringify(geoCoordinates, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayFileDetail;
