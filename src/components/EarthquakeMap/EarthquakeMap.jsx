// import React, { useMemo } from 'react'
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet'
// import fixLeafletMarkerIcon from '../../utils/markerIcon'
// import './EarthquakeMap.css'

// fixLeafletMarkerIcon()

// export default function EarthquakeMap({ features = [] }) {
//   const center = [20, 0]

//   const markers = useMemo(() =>
//     features.map(f => {
//       const [lon, lat, depth] = f.geometry.coordinates
//       return {
//         id: f.id,
//         lat,
//         lon,
//         depth,
//         mag: f.properties.mag,
//         place: f.properties.place,
//         time: new Date(f.properties.time).toLocaleString(),
//         url: f.properties.url
//       }
//     }), [features])

//   const magColor = mag => mag >= 5 ? 'red' : mag >= 2.5 ? 'orange' : 'green'
//   const magRadius = mag => Math.max(4, mag * 4)

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {markers.map(m => (
//           <CircleMarker
//             key={m.id}
//             center={[m.lat, m.lon]}
//             radius={magRadius(m.mag)}
//             pathOptions={{ color: magColor(m.mag), fillColor: magColor(m.mag), fillOpacity: 0.7 }}
//           >
//             <Popup>
//               <strong>{m.place}</strong><br/>
//               Magnitude: {m.mag}<br/>
//               Depth: {m.depth} km<br/>
//               Time: {m.time}<br/>
//               <a href={m.url} target="_blank">More info</a>
//             </Popup>
//           </CircleMarker>
//         ))}
//       </MapContainer>
//     </div>
//   )
// }
// //...............................................................
// import React, { useMemo, useEffect, useRef } from 'react'
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from 'react-leaflet'
// import fixLeafletMarkerIcon from '../../utils/markerIcon'
// import './EarthquakeMap.css'

// fixLeafletMarkerIcon()

// // 🔑 Fly to location when selected
// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap()

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates
//       // Fly to location
//       map.flyTo([lat, lon], 6, { duration: 2 })

//       // Open popup on the selected marker
//       const marker = markerRefs.current[feature.id]
//       if (marker) {
//         marker.openPopup()
//       }
//     }
//   }, [feature, map, markerRefs])

//   return null
// }

// export default function EarthquakeMap({ features = [], selected }) {
//   const center = [20, 0]
//   const markerRefs = useRef({})

//   // ✅ Convert GeoJSON features into marker objects
//   const markers = useMemo(
//     () =>
//       features.map(f => {
//         const [lon, lat, depth] = f.geometry.coordinates
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         }
//       }),
//     [features]
//   )

//   const magColor = mag => (mag >= 5 ? 'red' : mag >= 2.5 ? 'orange' : 'green')
//   const magRadius = mag => Math.max(4, mag * 4)

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* ✅ Render markers */}
//         {markers.map(m => (
//           <CircleMarker
//             key={m.id}
//             center={[m.lat, m.lon]}
//             radius={magRadius(m.mag)}
//             pathOptions={{
//               color: magColor(m.mag),
//               fillColor: magColor(m.mag),
//               fillOpacity: 0.7,
//             }}
//             ref={el => (markerRefs.current[m.id] = el)} // store ref
//           >
//             <Popup>
//               <strong>{m.place}</strong>
//               <br />
//               Magnitude: {m.mag}
//               <br />
//               Depth: {m.depth} km
//               <br />
//               Time: {m.time}
//               <br />
//               <a href={m.url} target="_blank" rel="noreferrer">
//                 More info
//               </a>
//             </Popup>
//           </CircleMarker>
//         ))}

//         {/* 🔑 Fly to selected feature and open popup */}
//         <FlyToFeature feature={selected} markerRefs={markerRefs} />
//       </MapContainer>
//     </div>
//   )
// }

//..................................its working code.....................

// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// // 🔑 Fly to location when selected
// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// export default function EarthquakeMap({ features = [], selected, mapType }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   // ✅ Convert GeoJSON features into marker objects
//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         {/* ✅ Switch between Map and Satellite */}
//         {mapType === "satellite" ? (
//           <TileLayer
//             attribution="Tiles © Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
//             url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           />
//         ) : (
//           <TileLayer
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//         )}

//         {/* ✅ Render markers */}
//         {markers.map((m) => (
//           <CircleMarker
//             key={m.id}
//             center={[m.lat, m.lon]}
//             radius={magRadius(m.mag)}
//             pathOptions={{
//               color: magColor(m.mag),
//               fillColor: magColor(m.mag),
//               fillOpacity: 0.7,
//             }}
//             ref={(el) => (markerRefs.current[m.id] = el)}
//           >
//             <Popup>
//               <strong>{m.place}</strong>
//               <br />
//               Magnitude: {m.mag}
//               <br />
//               Depth: {m.depth} km
//               <br />
//               Time: {m.time}
//               <br />
//               <a href={m.url} target="_blank" rel="noreferrer">
//                 More info
//               </a>
//             </Popup>
//           </CircleMarker>
//         ))}

//         {/* 🔑 Fly to selected feature and open popup */}
//         <FlyToFeature feature={selected} markerRefs={markerRefs} />
//       </MapContainer>
//     </div>
//   );
// }
//................its working fine now.........................................................

// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import MapSwitcher from "../MapSwitcher/MapSwitcher";
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// // 🔑 Fly to location when selected
// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// export default function EarthquakeMap({ features = [], selected, mapType, setMapType }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   // ✅ Convert GeoJSON features into marker objects
//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         {/* ✅ Always render both layers, just toggle opacity */}
//         <TileLayer
//           key="osm"
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           opacity={mapType === "map" ? 1 : 0}
//         />
//         <TileLayer
//           key="esri-sat"
//           attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           opacity={mapType === "satellite" ? 1 : 0}
//         />

//         {/* ✅ Render markers */}
//         {markers.map((m) => (
//           <CircleMarker
//             key={m.id}
//             center={[m.lat, m.lon]}
//             radius={magRadius(m.mag)}
//             pathOptions={{
//               color: magColor(m.mag),
//               fillColor: magColor(m.mag),
//               fillOpacity: 0.7,
//             }}
//             ref={(el) => (markerRefs.current[m.id] = el)}
//           >
//             <Popup>
//               <strong>{m.place}</strong>
//               <br />
//               Magnitude: {m.mag}
//               <br />
//               Depth: {m.depth} km
//               <br />
//               Time: {m.time}
//               <br />
//               <a href={m.url} target="_blank" rel="noreferrer">
//                 More info
//               </a>
//             </Popup>
//           </CircleMarker>
//         ))}

//         {/* 🔑 Fly to selected feature */}
//         <FlyToFeature feature={selected} markerRefs={markerRefs} />
//       </MapContainer>

//       {/* ✅ Map Switcher inside map */}
//       <MapSwitcher mapType={mapType} setMapType={setMapType} />
//     </div>
//   );
// }

//....................2nd working code ..................................

// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import MapSwitcher from "../MapSwitcher/MapSwitcher";
// import Legend from "../Legend/Legend"; // ✅ Import Legend
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// // 🔑 Fly to location when selected
// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// export default function EarthquakeMap({ features = [], selected, mapType, setMapType }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   // ✅ Convert GeoJSON features into marker objects
//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         {/* ✅ Always render both layers, just toggle opacity */}
//         <TileLayer
//           key="osm"
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           opacity={mapType === "map" ? 1 : 0}
//         />
//         <TileLayer
//           key="esri-sat"
//           attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           opacity={mapType === "satellite" ? 1 : 0}
//         />

//         {/* ✅ Render markers */}
//         {markers.map((m) => (
//           <CircleMarker
//             key={m.id}
//             center={[m.lat, m.lon]}
//             radius={magRadius(m.mag)}
//             pathOptions={{
//               color: magColor(m.mag),
//               fillColor: magColor(m.mag),
//               fillOpacity: 0.7,
//             }}
//             ref={(el) => (markerRefs.current[m.id] = el)}
//           >
//             <Popup>
//               <strong>{m.place}</strong>
//               <br />
//               Magnitude: {m.mag}
//               <br />
//               Depth: {m.depth} km
//               <br />
//               Time: {m.time}
//               <br />
//               <a href={m.url} target="_blank" rel="noreferrer">
//                 More info
//               </a>
//             </Popup>
//           </CircleMarker>
//         ))}

//         {/* 🔑 Fly to selected feature */}
//         <FlyToFeature feature={selected} markerRefs={markerRefs} />
//       </MapContainer>

//       {/* ✅ Map Switcher inside map */}
//       <MapSwitcher mapType={mapType} setMapType={setMapType} />

//       {/* ✅ Legend inside map */}
//       <Legend />
//     </div>
//   );
// }

// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import MapSwitcher from "../MapSwitcher/MapSwitcher";
// import Legend from "../Legend/Legend";
// import MapControls from "../MapControls/MapControls"; // ✅ Import custom controls
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// // 🔑 Fly to location when selected
// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// // 🔑 Wrapper to attach controls to map
// function MapWithControls({ children, markerRefs, feature }) {
//   const map = useMap();
//   return (
//     <>
//       {children}
//       <FlyToFeature feature={feature} markerRefs={markerRefs} />
//       <MapControls map={map} /> {/* ✅ Attach custom controls */}
//     </>
//   );
// }

// export default function EarthquakeMap({ features = [], selected, mapType, setMapType }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   // ✅ Convert GeoJSON features into marker objects
//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         <MapWithControls markerRefs={markerRefs} feature={selected}>
//           {/* ✅ Always render both layers, just toggle opacity */}
//           <TileLayer
//             key="osm"
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             opacity={mapType === "map" ? 1 : 0}
//           />
//           <TileLayer
//             key="esri-sat"
//             attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
//             url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//             opacity={mapType === "satellite" ? 1 : 0}
//           />

//           {/* ✅ Render markers */}
//           {markers.map((m) => (
//             <CircleMarker
//               key={m.id}
//               center={[m.lat, m.lon]}
//               radius={magRadius(m.mag)}
//               pathOptions={{
//                 color: magColor(m.mag),
//                 fillColor: magColor(m.mag),
//                 fillOpacity: 0.7,
//               }}
//               ref={(el) => (markerRefs.current[m.id] = el)}
//             >
//               <Popup>
//                 <strong>{m.place}</strong>
//                 <br />
//                 Magnitude: {m.mag}
//                 <br />
//                 Depth: {m.depth} km
//                 <br />
//                 Time: {m.time}
//                 <br />
//                 <a href={m.url} target="_blank" rel="noreferrer">
//                   More info
//                 </a>
//               </Popup>
//             </CircleMarker>
//           ))}
//         </MapWithControls>
//       </MapContainer>

//       {/* ✅ Map Switcher inside map */}
//       <MapSwitcher mapType={mapType} setMapType={setMapType} />

//       {/* ✅ Legend inside map */}
//       <Legend />
//     </div>
//   );
// }
//........................................................
// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import MapSwitcher from "../MapSwitcher/MapSwitcher";
// import Legend from "../Legend/Legend";
// import MapControls from "../MapControls/MapControls";
// import TectonicPlates from "../TectonicPlates/TectonicPlates"; // ✅ Import here
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// function MapWithControls({ children, markerRefs, feature }) {
//   const map = useMap();
//   return (
//     <>
//       {children}
//       <FlyToFeature feature={feature} markerRefs={markerRefs} />
//       <MapControls map={map} />
//     </>
//   );
// }

// export default function EarthquakeMap({ features = [], selected, mapType, setMapType, showPlates }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         <MapWithControls markerRefs={markerRefs} feature={selected}>
//           {/* ✅ Base layers */}
//           <TileLayer
//             key="osm"
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             opacity={mapType === "map" ? 1 : 0}
//           />
//           <TileLayer
//             key="esri-sat"
//             attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
//             url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//             opacity={mapType === "satellite" ? 1 : 0}
//           />

//           {/* ✅ Earthquake markers */}
//           {markers.map((m) => (
//             <CircleMarker
//               key={m.id}
//               center={[m.lat, m.lon]}
//               radius={magRadius(m.mag)}
//               pathOptions={{
//                 color: magColor(m.mag),
//                 fillColor: magColor(m.mag),
//                 fillOpacity: 0.7,
//               }}
//               ref={(el) => (markerRefs.current[m.id] = el)}
//             >
//               <Popup>
//                 <strong>{m.place}</strong>
//                 <br />
//                 Magnitude: {m.mag}
//                 <br />
//                 Depth: {m.depth} km
//                 <br />
//                 Time: {m.time}
//                 <br />
//                 <a href={m.url} target="_blank" rel="noreferrer">
//                   More info
//                 </a>
//               </Popup>
//             </CircleMarker>
//           ))}

//           {/* ✅ Tectonic Plates overlay (inside MapContainer) */}
//           {showPlates && <TectonicPlates visible={true} />}
//         </MapWithControls>
//       </MapContainer>

//       <MapSwitcher mapType={mapType} setMapType={setMapType} />
//       <Legend />
//     </div>
//   );
// }
//........................................................

// import React, { useMemo, useEffect, useRef } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   CircleMarker,
//   Popup,
//   ZoomControl,
//   useMap,
// } from "react-leaflet";
// import fixLeafletMarkerIcon from "../../utils/markerIcon";
// import MapSwitcher from "../MapSwitcher/MapSwitcher";
// import Legend from "../Legend/Legend";
// import MapControls from "../MapControls/MapControls";
// import TectonicPlates from "../TectonicPlates/TectonicPlates"; // ✅ Import here
// import "./EarthquakeMap.css";

// fixLeafletMarkerIcon();

// function FlyToFeature({ feature, markerRefs }) {
//   const map = useMap();

//   useEffect(() => {
//     if (feature) {
//       const [lon, lat] = feature.geometry.coordinates;
//       map.flyTo([lat, lon], 6, { duration: 2 });

//       const marker = markerRefs.current[feature.id];
//       if (marker) {
//         marker.openPopup();
//       }
//     }
//   }, [feature, map, markerRefs]);

//   return null;
// }

// function MapWithControls({ children, markerRefs, feature }) {
//   const map = useMap();
//   return (
//     <>
//       {children}
//       <FlyToFeature feature={feature} markerRefs={markerRefs} />
//       <MapControls map={map} />
//     </>
//   );
// }

// export default function EarthquakeMap({
//   features = [],
//   selected,
//   mapType = "map",   // ✅ safe default
//   setMapType,
//   showPlates,
// }) {
//   const center = [20, 0];
//   const markerRefs = useRef({});

//   const markers = useMemo(
//     () =>
//       features.map((f) => {
//         const [lon, lat, depth] = f.geometry.coordinates;
//         return {
//           id: f.id,
//           lat,
//           lon,
//           depth,
//           mag: f.properties.mag,
//           place: f.properties.place,
//           time: new Date(f.properties.time).toLocaleString(),
//           url: f.properties.url,
//           raw: f,
//         };
//       }),
//     [features]
//   );

//   const magColor = (mag) => (mag >= 5 ? "red" : mag >= 2.5 ? "orange" : "green");
//   const magRadius = (mag) => Math.max(4, mag * 4);

//   return (
//     <div className="map-container">
//       <MapContainer center={center} zoom={2} zoomControl={false} scrollWheelZoom>
//         <ZoomControl position="topright" />

//         <MapWithControls markerRefs={markerRefs} feature={selected}>
          

//           {/* ✅ Base layers (only render active one) */}
// {mapType === "map" && (
//   <TileLayer
//     attribution="&copy; OpenStreetMap contributors"
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
// )}

// {mapType === "satellite" && (
//   <TileLayer
//     attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
//     url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//   />
// )}


//           {/* ✅ Earthquake markers */}
//           {markers.map((m) => (
//             <CircleMarker
//               key={m.id}
//               center={[m.lat, m.lon]}
//               radius={magRadius(m.mag)}
//               pathOptions={{
//                 color: magColor(m.mag),
//                 fillColor: magColor(m.mag),
//                 fillOpacity: 0.7,
//               }}
//               ref={(el) => (markerRefs.current[m.id] = el)}
//             >
//               <Popup>
//                 <strong>{m.place}</strong>
//                 <br />
//                 Magnitude: {m.mag}
//                 <br />
//                 Depth: {m.depth} km
//                 <br />
//                 Time: {m.time}
//                 <br />
//                 <a href={m.url} target="_blank" rel="noreferrer">
//                   More info
//                 </a>
//               </Popup>
//             </CircleMarker>
//           ))}

//           {/* ✅ Tectonic Plates overlay */}
//           {showPlates && <TectonicPlates visible={true} />}
//         </MapWithControls>
//       </MapContainer>

//       <MapSwitcher mapType={mapType} setMapType={setMapType} />
//       <Legend />
//     </div>
//   );
// } this working fine

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
