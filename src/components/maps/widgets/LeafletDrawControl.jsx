"use client";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup } from "react-leaflet";

function LeafletDrawControl({ onCreate, onEdited, onDeleted }) {
  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        onEdited={onEdited}
        onCreated={onCreate}
        onDeleted={onDeleted}
        draw={{
          rectangle: false,
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
        }}
      />
    </FeatureGroup>
  );
}

export default LeafletDrawControl;
