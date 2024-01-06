import React, { useState } from "react";
import { useLocationContext } from "../../context/LocationContext";
import SearchBar from "./SearchBar";
import Direction from "./Direction";
import LocationListModal from "../modal/LocationListModal";

const Controls = () => {
  const { type } = useLocationContext();
  const [searchList, setSearchList] = useState({ addrList: [] });
  const [isUserInteraction, setIsUserInteraction] = useState(false);

  const props = {
    setSearchList,
    isUserInteraction,
    setIsUserInteraction,
    searchListLength: searchList?.addrList?.length,
  };

  return (
    <div className="w-[30%] h-[100%] p-3 z-[999] absolute bottom-0 right-0">
      <div className="flex justify-center">
        {type === "search" ? (
          <SearchBar {...props} />
        ) : (
          <Direction {...props} />
        )}
      </div>

      {searchList?.addrList?.length > 0 && (
        <LocationListModal
          searchList={searchList}
          setSearchList={setSearchList}
          setIsUserInteraction={setIsUserInteraction}
        />
      )}
    </div>
  );
};

export default Controls;
