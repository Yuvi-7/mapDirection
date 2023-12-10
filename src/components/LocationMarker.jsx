import React, { useEffect, useContext } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { Marker, Popup } from "react-leaflet";
import { useLocationContext } from "../context/LocationContext";
import { MdLocationPin } from "react-icons/md";
import markerIcon from "../assets/icons/location.png";
import L from "leaflet";

const LocationMarker = () => {
  const mapContext = useLeafletContext();
  const { position, setPosition } = useLocationContext();

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    mapContext.map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      mapContext.map.flyTo(e.latlng, mapContext.map.getZoom());
    });
  }, []);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;