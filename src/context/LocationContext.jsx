import React, { createContext, useContext, useRef, useState } from "react";

const LocationContextApi = createContext();

export const useLocationContext = () => {
  return useContext(LocationContextApi);
};

const LocationContextProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [direction, setDirection] = useState({
    from: { text: "", lat: "", lon: "", name: "" },
    to: { text: "", lat: "", lon: "", name: "" },
  });
  const [encodedGeometry, setEncodedGeometry] = useState("");
  const [mode, setMode] = useState("bike");

  return (
    <LocationContextApi.Provider
      value={{
        locationData,
        setLocationData,
        position,
        setPosition,
        encodedGeometry,
        setEncodedGeometry,
        direction,
        setDirection,
        mode,
        setMode,
      }}
    >
      {children}
    </LocationContextApi.Provider>
  );
};

export default LocationContextProvider;
