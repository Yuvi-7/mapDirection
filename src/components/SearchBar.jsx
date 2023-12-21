import React, { useEffect, useState } from "react";
import { SearchAddressURL } from "../utils/ConstantUrl";
import { useApiHandler } from "../utils/useApiHandler";
import { MdOutlineLocationOn } from "react-icons/md";

const SearchBar = () => {
  const { apiCall } = useApiHandler();
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

          {/* <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
              <div className="w-6 flex flex-col items-center">
                <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                  <img
                    className="rounded-full"
                    alt="A"
                    src="https://randomuser.me/api/portraits/men/62.jpg"
                  />{" "}
                </div>
              </div>
              <div className="w-full items-center flex">
                <div className="mx-2 -mt-1  ">
                  Jack jhon
                  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                    CEO &amp; managin director
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
              <div className="w-6 flex flex-col items-center">
                <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                  <img
                    className="rounded-full"
                    alt="A"
                    src="https://randomuser.me/api/portraits/women/62.jpg"
                  />{" "}
                </div>
              </div>
              <div className="w-full items-center flex">
                <div className="mx-2 -mt-1  ">
                  Liza Blue
                  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                    COO &amp; co-founder
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
              <div className="w-6 flex flex-col items-center">
                <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                  <img
                    className="rounded-full"
                    alt="A"
                    src="https://randomuser.me/api/portraits/men/65.jpg"
                  />{" "}
                </div>
              </div>
              <div className="w-full items-center flex">
                <div className="mx-2 -mt-1 w-1/2 ">
                  Brian White
                  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                    CTO &amp; technical manager
                  </div>
                </div>
                <div className="w-1/2 flex">
                  <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                      Hiring!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
              <div className="w-6 flex flex-col items-center">
                <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                  <img
                    className="rounded-full"
                    alt="A"
                    src="https://randomuser.me/api/portraits/men/85.jpg"
                  />{" "}
                </div>
              </div>
              <div className="w-full items-center flex">
                <div className="mx-2 -mt-1  ">
                  Eric Dripper
                  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                    CMO &amp; marketing manager
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
