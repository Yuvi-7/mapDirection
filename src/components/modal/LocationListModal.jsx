import React, { useEffect, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { useLocationContext } from "../../context/LocationContext";

const LocationListModal = ({ address, setSearch, setModal, type }) => {
  const { setLocationData, setEncodedGeometry, setDirection } =
    useLocationContext();

  useEffect(() => {
    if (address?.addrList?.length > 0) {
      setModal(true);
    }
  }, [address]);

  const setLocationFunc = (lat, lon, name) => {
    setModal(false);
    setEncodedGeometry("");

    if (type === "direction") {
      // setLocationData([]);

      setDirection((prev) => ({
        ...prev,
        [address?.type]: {
          ...prev[address.type],
          lat,
          lon,
          name,
        },
      }));

      return;
    }

    setLocationData({ lat, lon, name });
    setDirection((prev) => ({
      ...prev,
      search: {
        ...prev.search,
        lat,
        lon,
        name,
      },
      to: {
        ...prev.to,
        lat,
        lon,
        name,
      },
    }));
  };

  return (
    <div className="shadow bg-white z-40 w-full max-h-[20rem] max-h-select overflow-y-auto rounded-b-2xl">
      <hr />
      <div className="flex flex-col w-full">
        {address?.addrList?.map((adrs) => (
          <div
            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 px-2 py-3 "
            key={adrs?.place_id}
            onClick={() => setLocationFunc(adrs?.lat, adrs?.lon, adrs?.name)}
          >
            <div className="flex items-center justify-between">
              <span className="basis-[13%]">
                <MdOutlineLocationOn size={22} />
              </span>
              <address className="basis-[87%] text-left text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {adrs?.display_name}
              </address>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationListModal;
