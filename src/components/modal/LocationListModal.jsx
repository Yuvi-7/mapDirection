import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { useLocationContext } from "../../context/LocationContext";

const LocationListModal = ({
  searchList,
  setSearchList,
  setIsUserInteraction,
}) => {
  const { setDirection, type, direction } = useLocationContext();

  const setLocationFunc = (lat, lon, name, fullName) => {
    setSearchList({ addrList: [] });
    setIsUserInteraction(false);
    setDirection((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        lat,
        lon,
        name,
        text: fullName,
      },
    }));
  };

  return (
    <div className="shadow bg-white z-40 w-full max-h-[20rem] max-h-select overflow-y-auto rounded-b-2xl">
      <hr />
      <div className="flex flex-col w-full">
        {searchList?.addrList?.map((adrs) => (
          <div
            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 px-2 py-3 "
            key={adrs?.place_id}
            onClick={() =>
              setLocationFunc(
                adrs?.lat,
                adrs?.lon,
                adrs?.name,
                adrs?.display_name
              )
            }
          >
            <div className="flex items-center justify-between">
              <span className="basis-[13%]">
                <MdOutlineLocationOn size={22} />
              </span>
              <span className="basis-[87%] text-left text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {adrs?.display_name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationListModal;
