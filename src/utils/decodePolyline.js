import polyline from "@mapbox/polyline";

export const decodePolyline = (encodedGeometry) => {
  return polyline.decode(encodedGeometry);
};
