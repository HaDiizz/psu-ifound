import { LayersControl, TileLayer, LayerGroup } from "react-leaflet";
import { useTheme } from "next-themes";

const BaseMapLayers = () => {
  const { theme } = useTheme();
  return (
    <>
      <LayersControl.BaseLayer name="Night Map" checked={theme === "dark"}>
        <TileLayer
          attribution="Night Map"
          url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.ACCESS_TOKEN_MAP_TILE}`}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Open Street Map">
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
      <LayersControl.BaseLayer name="Google Map" checked={theme === "light"}>
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
