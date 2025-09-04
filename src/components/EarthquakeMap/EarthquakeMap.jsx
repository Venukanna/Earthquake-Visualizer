
import React, { useMemo, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import fixLeafletMarkerIcon from "../../utils/markerIcon";
import MapSwitcher from "../MapSwitcher/MapSwitcher";
import Legend from "../Legend/Legend";
import MapControls from "../MapControls/MapControls";
import TectonicPlates from "../TectonicPlates/TectonicPlates"; 
import MagnitudeTimeline from "../MagnitudeTimeline/MagnitudeTimeline"; // ✅ New import
import "./EarthquakeMap.css";

fixLeafletMarkerIcon();

function FlyToFeature({ feature, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (feature) {
      const [lon, lat] = feature.geometry.coordinates;
      map.flyTo([lat, lon], 6, { duration: 2 });

      const marker = markerRefs.current[feature.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [feature, map, markerRefs]);

  return null;
}

function MapWithControls({ children, markerRefs, feature }) {
  const map = useMap();
  return (
    <>
      {children}
      <FlyToFeature feature={feature} markerRefs={markerRefs} />
      <MapControls map={map} />
    </>
  );
}

export default function EarthquakeMap({
  features = [],
  selected,
  mapType = "map",
  setMapType,
  showPlates,
}) {
  const center = [20, 0];
  const markerRefs = useRef({});

  const markers = useMemo(
    () =>
      features.map((f) => {
        const [lon, lat, depth] = f.geometry.coordinates;
        return {
          id: f.id,
          lat,
          lon,
          depth,
          mag: f.properties.mag,
          place: f.properties.place,
          time: new Date(f.properties.time).toLocaleString(),
          url: f.properties.url,
          raw: f,
        };
      }),
    [features]
  );

  const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
  const magRadius = (mag) => Math.max(4, mag * 4);

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
        <ZoomControl position="topright" />

        <MapWithControls markerRefs={markerRefs} feature={selected}>
          {/* ✅ Base layers */}
          {mapType === "map" && (
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}

          {mapType === "satellite" && (
            <TileLayer
              attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          )}

          {/* ✅ Earthquake markers */}
          {markers.map((m) => (
            <CircleMarker
              key={m.id}
              center={[m.lat, m.lon]}
              radius={magRadius(m.mag)}
              pathOptions={{
                color: magColor(m.mag),
                fillColor: magColor(m.mag),
                fillOpacity: 0.7,
              }}
              ref={(el) => (markerRefs.current[m.id] = el)}
            >
              <Popup>
                <strong>{m.place}</strong>
                <br />
                Magnitude: {m.mag}
                <br />
                Depth: {m.depth} km
                <br />
                Time: {m.time}
                <br />
                <a href={m.url} target="_blank" rel="noreferrer">
                  More info
                </a>
              </Popup>
            </CircleMarker>
          ))}

          {/* ✅ Tectonic Plates overlay */}
          {showPlates && <TectonicPlates visible={true} />}
        </MapWithControls>
      </MapContainer>

      <MapSwitcher mapType={mapType} setMapType={setMapType} />
      <Legend />

      {/* ✅ New Magnitude Timeline on left side */}
      <MagnitudeTimeline features={features} />
    </div>
  );
}
