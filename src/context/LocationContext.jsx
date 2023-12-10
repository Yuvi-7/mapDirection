import React, { createContext, useContext, useRef, useState } from "react";

const LocationContextApi = createContext();

export const useLocationContext = () => {
  return useContext(LocationContextApi);
};

const LocationContextProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [encodedGeometry, setEncodedGeometry] = useState("");

  return (
    <LocationContextApi.Provider
      value={{
        locationData,
        setLocationData,
        position,
        setPosition,
        encodedGeometry,
        setEncodedGeometry,
      }}
    >
      {children}
    </LocationContextApi.Provider>
  );
};

export default LocationContextProvider;
