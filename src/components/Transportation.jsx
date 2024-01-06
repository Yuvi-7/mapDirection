import React from "react";
import { FaMotorcycle, FaCar, FaWalking } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLocationContext } from "../context/LocationContext";

const Transportation = () => {
  const { setEncodedGeometry, setDirection, setMode, setType, mode } =
    useLocationContext();

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
    {
      id: "__2walking",
      modes: "walking",
      medium: "foot",
      icon: <FaWalking size={18} />,
    },
  ];

  const reset = () => {
    setEncodedGeometry("");

    setDirection((prev) => ({
      ...prev,
      from: { text: "Your location", lat: "", lon: "", name: "" },
      to: { ...prev.search },
    }));
    setType("search");
  };

  return (
    <div className="w-full flex justify-between items-center pb-2">
      <div className="w-[45%] flex justify-around">
        {transport.map((trans) => (
          <span
            className={`w-9 h-9 cursor-pointer text-gray-600 rounded-full transition duration-100 hover:bg-[#F5F5F5] p-2 flex items-center justify-center ${
              mode === trans?.medium ? "bg-[#F5F5F5]" : "bg-transparent"
            }`}
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
