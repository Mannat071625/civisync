import L from "leaflet";

function createIcon(color: string) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export const markerIcons = {
  red: createIcon("red"),
  blue: createIcon("blue"),
  green: createIcon("green"),
  orange: createIcon("orange"),
  yellow: createIcon("yellow"),
  violet: createIcon("violet"),
};