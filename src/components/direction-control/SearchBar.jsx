import React, { useEffect } from "react";
import { FaDirections } from "react-icons/fa";
import { ORMAbsoluteURL, SearchAddressURL } from "../../utils/ConstantUrl";
import { useApiHandler } from "../../utils/useApiHandler";
import { useLocationContext } from "../../context/LocationContext";
import { IoClose } from "react-icons/io5";

const SearchBar = ({
  setSearchList,
  isUserInteraction,
  setIsUserInteraction,
  searchListLength,
}) => {
  const { apiCall } = useApiHandler();
  const { position, setEncodedGeometry, setDirection, direction, setType } =
    useLocationContext();

  useEffect(() => {
    if (direction?.search?.text.length > 0 && isUserInteraction) {
      const timer = setTimeout(() => {
        fetchAddress();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [direction?.search?.text, isUserInteraction]);

  const handleChange = (e) => {
    const { value } = e.target;
    setIsUserInteraction(true);

    setDirection((prev) => ({
      ...prev,
      search: {
        ...prev.search,
        text: value,
      },
    }));
  };

  const fetchAddress = async () => {
    const res = await apiCall(
      "get",
      `${SearchAddressURL}?addressdetails=1&q=${direction?.search?.text}&format=jsonv2&limit=40`
    );

    if (res) {
      setSearchList((prev) => ({
        ...prev,
        addrList: res,
      }));
    }
  };

  const switchDirectionComp = () => {
    setType("to");
    setDirection((prev) => ({
      ...prev,
      from: {
        ...prev.from,
        text: "Your location",
        lat: position?.lat,
        lon: position?.lng,
      },
      to: {
        ...prev.to,
        text: direction.search.text,
        lat: prev?.search?.lat,
        lon: prev?.search?.lon,
      },
    }));
  };

  const reset = () => {
    setEncodedGeometry("");
    setDirection((prev) => ({
      ...prev,
      search: { text: "", lat: "", lon: "", name: "" },
      to: { text: "", lat: "", lon: "", name: "" },
    }));
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div
          className={`w-full h-12 flex items-center justify-between bg-white px-4 appearance-none ${
            searchListLength > 0
              ? "rouned-b-0 rounded-t-2xl"
              : "rounded-b-[30px] rounded-t-[30px]"
          }`}
        >
          <input
            placeholder="Search Address"
            className="w-80 text-gray-800 outline-none"
            value={direction?.search?.text}
            onChange={(e) => handleChange(e)}
          />
          {direction?.search?.text?.length > 0 && (
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
      </div>
    </>
  );
};

export default SearchBar;
