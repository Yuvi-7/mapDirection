import React from "react";
import { useLocationContext } from "../context/LocationContext";
import { Polyline } from "react-leaflet";
import { decodePolyline } from "../utils/decodePolyline";

const Polyline_ = () => {
  const { encodedGeometry } = useLocationContext();
  console.log(encodedGeometry, "yuc");
  let multiPolyline = [];

  const limeOptions = { color: "#009BD6" };

  if (encodedGeometry) {
    multiPolyline = decodePolyline(encodedGeometry);
  }

  return (
    multiPolyline !== "" && (
      <Polyline
        pathOptions={limeOptions}
        positions={multiPolyline}
        weight={5}
      />
    )
  );
};

export default Polyline_;
