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

  return (
    <LocationContextApi.Provider
      value={{
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
      }}
    >
      {children}
    </LocationContextApi.Provider>
  );
};

export default LocationContextProvider;
