import React, { useEffect, useRef, useState } from "react";
import { useApiHandler } from "../utils/useApiHandler";
import { OverPassAbsoluteURL } from "../utils/ConstantUrl";
import { useLocationContext } from "../context/LocationContext";
import { toast } from "react-toastify";

const Controls = () => {
  const { apiCall } = useApiHandler();
  const [search, setSearch] = useState("");
  const { setLocationData, setEncodedGeometry } = useLocationContext();
  const [range, setRange] = useState(500);

  useEffect(() => {
    if (search) {
      const time = setTimeout(() => {
        fetchLocation();
      }, 2000);

      return () => {
        clearTimeout(time);
      };
    }
  }, [range]);

  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const fetchLocation = async () => {
    setEncodedGeometry("");
    const res = await apiCall(
      "get",
      `${OverPassAbsoluteURL}?data=[out:json];node["amenity"=${search.toLowerCase()}](around:${range},28.524620,77.186480);out;\n`
    );

    if (res) {
      setLocationData(res?.elements);
      if (res?.elements?.length === 0) {
        toast.warn("Increase Range or Search Amenity Only!");
      }
    }
  };

  const handleRange = (e) => {
    const { value } = e.target;
    setRange(value);
  };

  return (
    <div className="h-[100%] bg-[#F2EFE9] p-3 relative">
      <h1 className="font-bold text-[1.5rem] mb-3">
        Toll Calculator Application
      </h1>

      <div className="flex justify-center">
        <input
          type="text"
          className="p-1 w-[14rem] outline-none"
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="bg-[#3081D0] text-white px-2 ml-1"
          onClick={fetchLocation}
        >
          Search
        </button>
      </div>
      <p className="text-left pl-[2.3rem] pt-1 text-xs text-[#FF0000]">
        amenity only*
      </p>

      <div className=" pt-3">
        <label htmlFor="rangeInput" className="text-sm pr-2">
          Select Area Range:
        </label>
        <br />
        <input
          type="range"
          id="rangeInput"
          min={500}
          max={80000}
          onChange={(e) => handleRange(e)}
        />
        <br />
        <strong className="pl-2 text-sm">{range} meters</strong>
      </div>

      <p className="w-[90%] text-xs absolute bottom-0 pb-2">
        *Might, TollGuru API daily quota has been exceeded in process of
        devlopment. Please try again tomorrow. (Didn't get the daily quota msg
        from api)
      </p>
    </div>
  );
};

export default Controls;