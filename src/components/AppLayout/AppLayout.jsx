
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import EarthquakeMap from "../EarthquakeMap/EarthquakeMap";
import TectonicPlates from "../TectonicPlates/TectonicPlates";
import "./AppLayout.css";

export default function AppLayout({
  data = [],
  selected,
  setSelected,
  mapType,
  setMapType,   // ✅ add setter here
  showPlates,   // ✅ comes from App.jsx
}) {
  return (
    <div className="app-layout">
      {/* ✅ Left side: Earthquake list */}
      <aside className="sidebar-container">
        <Sidebar earthquakes={data} onSelect={setSelected} />
      </aside>

      {/* ✅ Right side: Map */}
      <section className="map-container">
        <EarthquakeMap
          features={data}
          selected={selected}
          mapType={mapType}
          setMapType={setMapType}   // ✅ pass down real setter
          showPlates={showPlates}   // ✅ pass to EarthquakeMap too
        />
      </section>
    </div>
  );
}
