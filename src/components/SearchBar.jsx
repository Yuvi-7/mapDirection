import React, { useEffect, useState } from "react";
import { SearchAddressURL } from "../utils/ConstantUrl";
import { useApiHandler } from "../utils/useApiHandler";
import { MdOutlineLocationOn } from "react-icons/md";
import { useLocationContext } from "../context/LocationContext";

const SearchBar = () => {
  const { apiCall } = useApiHandler();
  const { locationData, setLocationData, position, setEncodedGeometry } =
    useLocationContext();
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAddress();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

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
      setAddress(res);
    }
  };

  const setLocation = (lat, lon, name) => {
    setLocationData({ lat, lon, name });
  };

  return (
    <div className="flex flex-col w-full">
      <input
        placeholder="Search Address"
        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <div className="shadow bg-white top-100 z-40 w-full max-h-[20rem] left-0 rounded max-h-select overflow-y-auto mt-1">
        <div className="flex flex-col w-full">
          {address?.map((adrs) => (
            <div
              className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 px-2 py-3"
              key={adrs?.place_id}
              onClick={() => setLocation(adrs?.lat, adrs?.lon, adrs?.name)}
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
    </div>
  );
};

export default SearchBar;
