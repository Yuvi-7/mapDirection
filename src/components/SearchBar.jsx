import React, { useEffect, useMemo, useState } from "react";
import { FaDirections } from "react-icons/fa";
import { ORMAbsoluteURL, SearchAddressURL } from "../utils/ConstantUrl";
import { useApiHandler } from "../utils/useApiHandler";
import LocationListModal from "./modal/LocationListModal";
import { useLocationContext } from "../context/LocationContext";
import Direction from "./Direction";
import { IoClose } from "react-icons/io5";

const SearchBar = () => {
  const { apiCall } = useApiHandler();
  const {
    locationData,
    position,
    setEncodedGeometry,
    setLocationData,
    setDirection,
    direction,
    mode,
  } = useLocationContext();
  const [search, setSearch] = useState("");
  // const [address, setAddress] = useState([]);
  const [address, setAddress] = useState({ addrList: [], type: "" });

  const [modal, setModal] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      const timer = setTimeout(() => {
        fetchAddress();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);

  // useEffect(() => {
  //   if (toggleSearch && Object.keys(locationData)?.length > 0) {
  //     getEncodedPolyline();
  //   }
  // }, [toggleSearch, locationData]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const fetchAddress = async () => {
    const res = await apiCall(
      "get",
      `${SearchAddressURL}?addressdetails=1&q=${search}&format=jsonv2&limit=40`
    );

    if (res) {
      // setAddress(res);
      setAddress((prev) => ({
        ...prev,
        addrList: res,
        type: "search",
      }));
      setModal(true);
    }
  };

  const getEncodedPolyline = async () => {
    const res = await apiCall(
      "get",
      `${ORMAbsoluteURL}/routed-bike/route/v1/driving/${direction?.from?.lon},${direction?.from?.lat};${direction?.to?.lon},${direction?.to?.lat}?overview=full&geometries=polyline&alternatives=true&steps=true`
    );

    if (res) {
      setEncodedGeometry(res?.routes?.[0]?.geometry);
    }

    // if (!locationData?.lon) return;
    // const res = await apiCall(
    //   "get",
    //   // `${ORMAbsoluteURL}foot/${position?.lng},${position?.lat};${locationData?.lon},${locationData?.lat}?steps=true&overview=full&geometries=polyline`
    //   `${ORMAbsoluteURL}/routed-bike/route/v1/driving/${position?.lng},${position?.lat};${locationData?.lon},${locationData?.lat}?overview=full&geometries=polyline&alternatives=true&steps=true`
    // );

    // if (res) {
    //   setEncodedGeometry(res?.routes?.[0]?.geometry);
    // }
  };

  const reset = () => {
    setEncodedGeometry("");
    setSearch("");
    setLocationData("");
    setModal(false);
  };

  console.log(modal, "modal");

  const switchDirectionComp = () => {
    console.log(position, "ss9");
    // setLocationData([]);
    setDirection((prev) => ({
      ...prev,
      from: {
        ...prev.from,
        text: "Your location",
        lat: position?.lat,
        lon: position?.lng,
      },
      to: { ...prev.to, text: search },
    }));
    setToggleSearch(true);
    // getEncodedPolyline();
  };

  return (
    <>
      {toggleSearch ? (
        <Direction
          address={address}
          setSearch={setSearch}
          handleChange={handleChange}
          search={search}
          modal={modal}
          setModal={setModal}
          setToggleSearch={setToggleSearch}
        />
      ) : (
        <div className="flex flex-col w-full">
          <div
            className={`w-full h-12 flex items-center justify-between bg-white px-4 appearance-none ${
              modal && search.length > 0
                ? "rouned-b-0 rounded-t-2xl"
                : "rounded-b-[30px] rounded-t-[30px]"
            }`}
          >
            <input
              placeholder="Search Address"
              className="w-80 text-gray-800 outline-none"
              value={search}
              onChange={(e) => handleChange(e)}
            />
            {search.length > 0 && (
              <span>
                <IoClose size={25} className="cursor-pointer" onClick={reset} />
              </span>
            )}

            <FaDirections
              size={20}
              className="cursor-pointer"
              color="blue"
              onClick={switchDirectionComp}
            />
          </div>

          {modal && search.length > 0 && (
            <LocationListModal
              address={address}
              setSearch={setSearch}
              setModal={setModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
