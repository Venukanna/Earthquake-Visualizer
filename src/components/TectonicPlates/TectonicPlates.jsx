import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TectonicPlates({ visible }) {
  const [plates, setPlates] = useState(null);

  useEffect(() => {
    async function fetchPlates() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
        );
        const data = await res.json();
        setPlates(data);
      } catch (err) {
        console.error("Failed to load tectonic plates:", err);
      }
    }
    fetchPlates();
  }, []);

  if (!visible || !plates) return null;

  return (
    <GeoJSON
      data={plates}
      style={() => ({
        color: "orange",
        weight: 2,
      })}
    />
  );
}
