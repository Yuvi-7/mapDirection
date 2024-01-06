import React, { useEffect } from "react";
import Transportation from "../Transportation";
import { useLocationContext } from "../../context/LocationContext";
import { useApiHandler } from "../../utils/useApiHandler";
import { ORMAbsoluteURL, SearchAddressURL } from "../../utils/ConstantUrl";

const Direction = ({
  isUserInteraction,
  setIsUserInteraction,
  setSearchList,
}) => {
  const { setEncodedGeometry, direction, setDirection, mode, setType } =
    useLocationContext();
  const { apiCall } = useApiHandler();

  useEffect(() => {
    const fetchAddressWithTimer = (searchList, type) => {
      const timer = setTimeout(() => {
        fetchAddress(searchList, type);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    };

    if (direction.from.text !== "Your location" && isUserInteraction) {
      return fetchAddressWithTimer(direction.from.text, "from");
    }
  }, [direction.from.text, isUserInteraction]);

  useEffect(() => {
    const fetchAddressWithTimer = (searchList, type) => {
      const timer = setTimeout(() => {
        fetchAddress(searchList, type);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    };

    if (direction.to.text !== "" && isUserInteraction) {
      return fetchAddressWithTimer(direction.to.text, "to");
    }
  }, [direction.to.text, isUserInteraction]);

  useEffect(() => {
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
      setSearchList((prev) => ({
        ...prev,
        addrList: res,
      }));
      setType(type);
    }
  };

  const getEncodedPolyline = async () => {
    const res = await apiCall(
      "get",
      `${ORMAbsoluteURL}/routed-${mode}/route/v1/driving/${direction?.from?.lon},${direction?.from?.lat};${direction?.to?.lon},${direction?.to?.lat}?overview=full&geometries=polyline&alternatives=true&steps=true`
    );

    if (res) {
      setEncodedGeometry(res?.routes?.[0]?.geometry);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setIsUserInteraction(true);

    setDirection((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        text: value,
      },
    }));
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col items-center justify-between w-full bg-white p-3 rounded-md">
        <Transportation />
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
    </div>
  );
};

export default Direction;
