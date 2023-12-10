import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import SearchedLocationMarkers from "./SearchedLocationMarkers";
import { useLocationContext } from "../context/LocationContext";
import Polyline_ from "./Polyline_";

const Map = () => {
  const { position } = useLocationContext();

  return (
    <div id="map" className="h-[100%]">
      <MapContainer
        center={position ? position : [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[100%]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
        <SearchedLocationMarkers />

        <Polyline_ />
      </MapContainer>
    </div>
  );
};

export default Map;
