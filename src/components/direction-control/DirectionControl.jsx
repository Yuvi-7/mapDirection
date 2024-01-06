import React from "react";
import Controls from "./Controls";
import { useLocationContext } from "../../context/LocationContext";

const DirectionControl = () => {
  const { position } = useLocationContext();

  return position && <Controls />;
};

export default DirectionControl;
