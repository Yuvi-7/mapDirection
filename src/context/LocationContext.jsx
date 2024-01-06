import React, { createContext, useContext, useState } from "react";

const LocationContextApi = createContext();

export const useLocationContext = () => {
  return useContext(LocationContextApi);
};

const LocationContextProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [direction, setDirection] = useState({
    search: { text: "", lat: "", lon: "", name: "" },
    from: { text: "", lat: "", lon: "", name: "" },
    to: { text: "", lat: "", lon: "", name: "" },
    multipleMarker: [],
  });
  const [encodedGeometry, setEncodedGeometry] = useState("");
  const [type, setType] = useState("search");
  const [mode, setMode] = useState("bike");

  const contextValue = {
    position,
    setPosition,
    encodedGeometry,
    setEncodedGeometry,
    direction,
    setDirection,
    mode,
    setMode,
    setType,
    type,
  };

  return (
    <LocationContextApi.Provider value={contextValue}>
      {children}
    </LocationContextApi.Provider>
  );
};

export default LocationContextProvider;
