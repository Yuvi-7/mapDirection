import React from "react";
import { FaMotorcycle, FaCar, FaBus, FaWalking } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLocationContext } from "../context/LocationContext";

const Transportation = ({ setToggleSearch }) => {
  const {
    setEncodedGeometry,
    setDirection,
    setLocationData,
    setMode,
    setType,
  } = useLocationContext();

  const transport = [
    {
      id: "__2AxlesMotorcycle",
      modes: "motorcycling",
      medium: "bike",
      icon: <FaMotorcycle size={26} />,
    },
    {
      id: "__2AxlesTaxi",
      modes: "driving",
      medium: "car",
      icon: <FaCar size={23} />,
    },
    // {
    //   id: "__2AxlesBus",
    //   modes: "transit",
    //   medium: "2AxlesBus",
    //   icon: <FaBus size={17} />,
    // },
    {
      id: "__2walking",
      modes: "walking",
      medium: "foot",
      icon: <FaWalking size={18} />,
    },
  ];

  const reset = () => {
    setToggleSearch(false);
    setEncodedGeometry("");
    // setLocationData([]);
    // setDirection({
    //   from: { text: "Your location", lat: "", lon: "", name: "" },
    //   to: { text: "", lat: "", lon: "", name: "" },
    // });

    setDirection((prev) => ({
      ...prev,
      from: { text: "Your location", lat: "", lon: "", name: "" },
      to: { ...prev.search },
    }));
    setType("search");
  };

  return (
    <div className="w-full flex justify-between items-center pb-2">
      <div className="w-[60%] flex justify-around">
        {transport.map((trans) => (
          <span
            className="w-9 h-9 cursor-pointer text-gray-600 rounded-full transition duration-100 hover:bg-[#F5F5F5] p-2 flex items-center justify-center"
            key={trans.id}
            onClick={() => setMode(trans.medium)}
          >
            {trans.icon}
          </span>
        ))}
      </div>
      <span>
        <IoClose size={25} className="cursor-pointer" onClick={reset} />
      </span>
    </div>
  );
};

export default Transportation;
