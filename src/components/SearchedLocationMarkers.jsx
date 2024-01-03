import React from "react";
import { useLocationContext } from "../context/LocationContext";
import { Marker, Popup } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import { useApiHandler } from "../utils/useApiHandler";
import { ORMAbsoluteURL, TollAbsoluteURL } from "../utils/ConstantUrl";
import { decodePolyline } from "../utils/decodePolyline";
import locationMark from "../assets/icons/other_location.png";
import L from "leaflet";

const SearchedLocationMarkers = () => {
  const { position, setEncodedGeometry, direction, type } =
    useLocationContext();
  const { apiCall } = useApiHandler();
  const mapContext = useLeafletContext();

  const customIcon = new L.Icon({
    iconUrl: locationMark,
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });

  // const caluclateTollNFuel = async (geometry, id) => {
  //   const data = {
  //     mapProvider: "here",
  //     polyline: geometry,
  //     vehicle: {
  //       type: "2AxlesMotorcycle",
  //     },
  //     fuelOptions: {
  //       fuelCost: {
  //         units: "INR/liter",
  //         currency: "INR",
  //         fuelUnit: "liter",
  //       },
  //     },
  //     units: {
  //       currency: "INR",
  //     },
  //   };

  //   const res = await apiCall(
  //     "post",
  //     "/tollguru-data",
  //     {
  //       "x-api-key": process.env.REACT_APP_TOLL_API_KEY,
  //       "Content-Type": "application/json",
  //       mode: "no-cors",
  //     },
  //     data
  //   );

  //   if (res) {
  //     const arr = [...locationData];

  //     // setLocationData(
  //     //   arr.map((location) =>
  //     //     location.id === id
  //     //       ? { ...location, route: res?.route, summary: res?.summary }
  //     //       : location
  //     //   )
  //     // );
  //   }
  // };

  const getCoordinates = async (lat, lon, id) => {
    const res = await apiCall(
      "get",
      // `${ORMAbsoluteURL}bike/${position?.lng},${position?.lat};${lon},${lat}?overview=full&geometries=polyline`
      `${ORMAbsoluteURL}/routed-bike/route/v1/driving/${position?.lng},${position?.lat};${lon},${lat}?overview=full&geometries=polyline&alternatives=true&steps=true`
    );

    if (res) {
      setEncodedGeometry(res?.routes?.[0]?.geometry);
      // setLocationData(
      //   locationData?.map((location) =>
      //     location.id === id
      //       ? {
      //           ...location,
      //           distance: res?.routes?.[0]?.distance,
      //           duration: res?.routes?.[0]?.duration,
      //         }
      //       : location
      //   )
      // );
      // caluclateTollNFuel(res?.routes?.[0]?.geometry, id);
    }
  };

  function metersToKilometers(meters) {
    return (meters / 1000).toFixed(2) + " km";
  }

  function secondsToMinutes(seconds) {
    return (seconds / 60).toFixed(2) + " min";
  }

  const displayMarker = () => {
    if (type === "direction") {
      return (
        <>
          {direction?.from?.lat !== position.lat &&
            direction?.from?.lon !== position.lon && (
              <Marker
                position={[direction?.from?.lat, direction?.from?.lon]}
                icon={customIcon}
              >
                <Popup>{direction?.from?.name}</Popup>
              </Marker>
            )}
          <Marker
            position={[direction?.to?.lat, direction?.to?.lon]}
            icon={customIcon}
          >
            <Popup>{direction?.to?.name}</Popup>
          </Marker>
        </>
      );
    } else {
      return (
        <Marker
          position={[direction?.search?.lat, direction?.search?.lon]}
          icon={customIcon}
        >
          <Popup>{direction?.search?.name}</Popup>
        </Marker>
      );
    }
  };

  return (
    <>
      {displayMarker()}

      {/* {locationData.length > 0 &&
        locationData.map((location) => (
          <Marker
            position={[location?.lat, location?.lon]}
            icon={customIcon}
            key={location?.id}
            eventHandlers={{
              click: () => {
                getCoordinates(location?.lat, location?.lon, location?.id);
              },
            }}
          >
            <Popup>
              <strong>{location?.tags?.name || "N/A"}</strong>
              <address className="py-2">
                {location.tags["addr:full"] ||
                  (location.tags["addr:subdistrict"] || "") +
                    (location.tags["addr:place"] || "") +
                    (location.tags["addr:postcode"] || "") ||
                  "N/A"}
              </address>

              <span>Distance: {metersToKilometers(location?.distance)}</span>
              <br />
              <span>Duration: {secondsToMinutes(location?.duration)}</span>
              <br />
              <span>
                Estimate Petrol Cost:
                {location?.route?.costs?.fuel
                  ? " Rs." + location?.route?.costs?.fuel
                  : "N/A"}
              </span>

              <hr className="my-2" />
              <div className="flex flex-col">
                <strong>Tolls</strong>
                {location?.route?.hasTolls
                  ? location?.route?.tolls?.map((toll) => (
                      <div className="flex justify-between">
                        <span>{toll?.name || "Unknown"}</span>
                        <span>Rs.{toll?.cashCost || toll?.tagCost || 0}</span>
                      </div>
                    ))
                  : "None"}
              </div>
            </Popup>
          </Marker>
        ))} */}
    </>
  );
};

export default SearchedLocationMarkers;
