import React from "react";
import myLocation from "../assets/icons/gps.png";
import { useLeafletContext } from "@react-leaflet/core";
import { useLocationContext } from "../context/LocationContext";

const FindMyLocation = () => {
  const mapContext = useLeafletContext();
  const { setPosition, setDirection } = useLocationContext();

  const findMyLocation = () => {
    mapContext.map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      setDirection((prev) => ({
        ...prev,
        from: {
          ...prev.from,
          lat: e.latlng?.lat,
          lon: e.latlng?.lng,
        },
      }));
      mapContext.map.flyTo(e.latlng, 13);
    });
  };

  return (
    <span
      className="absolute z-[999] left-[12px] top-20 bg-white p-2 w-8 h-8 rounded-[2px] shadow-md cursor-pointer hover:bg-[#F5F5F5]"
      onClick={findMyLocation}
    >
      <img src={myLocation} alt="find-my-location" />
    </span>
  );
};

export default FindMyLocation;
