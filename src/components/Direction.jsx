import React, { useEffect, useState } from "react";
import { FaDirections } from "react-icons/fa";
import LocationListModal from "./modal/LocationListModal";
import Transportation from "./Transportation";
import { useLocationContext } from "../context/LocationContext";
import { useApiHandler } from "../utils/useApiHandler";
import { ORMAbsoluteURL, SearchAddressURL } from "../utils/ConstantUrl";

const Direction = ({
  //   address,
  setSearch,
  //   handleChange,
  search,
  modal,
  setModal,
  setToggleSearch,
}) => {
  const {
    locationData,
    position,
    setEncodedGeometry,
    setLocationData,
    direction,
    setDirection,
    mode,
  } = useLocationContext();
  const { apiCall } = useApiHandler();

  //   const [direction, setDirection] = useState({ from: "", to: "" });
  const [address, setAddress] = useState({ addrList: [], type: "" });

  console.log(direction, setDirection, "cco");

  useEffect(() => {
    const fetchAddressWithTimer = (address, type) => {
      const timer = setTimeout(() => {
        fetchAddress(address, type);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    };

    if (direction.from.text !== "Your location") {
      return fetchAddressWithTimer(direction.from.text, "from");
    }
  }, [direction.from.text]);

  useEffect(() => {
    const fetchAddressWithTimer = (address, type) => {
      const timer = setTimeout(() => {
        fetchAddress(address, type);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    };

    if (direction.to.text !== "") {
      return fetchAddressWithTimer(direction.to.text, "to");
    }
  }, [direction.to.text]);

  useEffect(() => {
    console.log("first", direction);
    if (direction?.from?.lat && direction?.to?.lon) {
      getEncodedPolyline();
    }
  }, [direction?.from?.lat, direction?.to?.lon, mode]);

  const fetchAddress = async (searchVal, type) => {
    const res = await apiCall(
      "get",
      `${SearchAddressURL}?addressdetails=1&q=${searchVal}&format=jsonv2&limit=40`
    );

    if (res) {
      setAddress((prev) => ({
        ...prev,
        addrList: res,
        type: type,
      }));
      setModal(true);
    }
  };

  const getEncodedPolyline = async () => {
    const res = await apiCall(
      "get",
      // `${ORMAbsoluteURL}transit/${direction?.from?.lon},${direction?.from?.lat};${direction?.to?.lon},${direction?.to?.lat}?overview=full&geometries=polyline`
      `${ORMAbsoluteURL}/routed-${mode}/route/v1/driving/${direction?.from?.lon},${direction?.from?.lat};${direction?.to?.lon},${direction?.to?.lat}?overview=full&geometries=polyline&alternatives=true&steps=true`
    );

    if (res) {
      setEncodedGeometry(res?.routes?.[0]?.geometry);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDirection((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        text: value,
      },
    }));
  };

  console.log(direction, "direction", modal);

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col items-center justify-between w-full bg-white p-3 rounded-md">
        <Transportation setToggleSearch={setToggleSearch} />
        <input
          placeholder="Choose starting point"
          className="w-full h-10 border-2 text-gray-800 mb-1 outline-none rounded-md bg-white px-4 appearance-none"
          value={direction.from.text}
          name="from"
          onChange={(e) => handleChange(e)}
        />

        <input
          placeholder="Choose destination..."
          className="w-full h-10 border-2 text-gray-800 outline-none rounded-md bg-white px-4 appearance-none"
          value={direction.to.text}
          name="to"
          onChange={(e) => handleChange(e)}
        />
      </div>

      {modal && (
        <LocationListModal
          address={address}
          setSearch={setSearch}
          setModal={setModal}
          type="direction"
        />
      )}
    </div>
  );
};

export default Direction;
