import React from "react";
import "./MapSwitcher.css";

export default function MapSwitcher({ mapType, setMapType }) {
  return (
    <div className="map-switcher">
      <button
        className={mapType === "satellite" ? "active" : ""}
        onClick={() => setMapType("satellite")}
      >
        Satellite
      </button>
      <button
        className={mapType === "map" ? "active" : ""}
        onClick={() => setMapType("map")}
      >
        Map
      </button>
    </div>
  );
}
