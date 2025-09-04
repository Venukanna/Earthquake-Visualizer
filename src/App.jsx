
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { fetchEarthquakes } from "./utils/api";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minMag, setMinMag] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeRange, setTimeRange] = useState("day");
  const [mapType, setMapType] = useState("map");
  const [showPlates, setShowPlates] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [customRange, setCustomRange] = useState(null);

  useEffect(() => {
    if (timeRange !== "custom") {
      loadData(timeRange);
    } else if (customRange) {
      loadData("custom", customRange);
    }
  }, [timeRange, customRange]);

  async function loadData(range = "day", rangeData = null) {
    setLoading(true);
    setError(null);

    try {
      const geojson = await fetchEarthquakes(range, rangeData);

      if (!geojson.features || geojson.features.length === 0) {
        setError("No earthquakes found for the selected period.");
        setData(null);
      } else {
        setData(geojson);

        const strong = geojson.features.find((f) => f.properties.mag >= 6);
        if (strong) {
          setAlertMsg(
            `⚠️ Strong Earthquake detected: M${strong.properties.mag} near ${strong.properties.place}`
          );
          setTimeout(() => setAlertMsg(""), 5000);
        }
      }
    } catch (err) {
      setError(
        !err.response
          ? "Network error: Unable to reach the server."
          : `API error: ${err.message}`
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  let filtered =
    data?.features?.filter((f) => (f.properties?.mag ?? 0) >= minMag) || [];

  if (countryQuery.trim()) {
    filtered = filtered.filter((f) =>
      f.properties?.place?.toLowerCase().includes(countryQuery.toLowerCase())
    );
  }

  const simulateAlert = () => {
    setAlertMsg("🚨 Simulated Strong Earthquake found");
    setTimeout(() => setAlertMsg(""), 5000);
  };

  return (
    <div className="app">
      <Header
        minMag={minMag}
        setMinMag={setMinMag}
        loadData={loadData}
        loading={loading}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        setCustomRange={setCustomRange}
        showPlates={showPlates}
        setShowPlates={setShowPlates}
        countryQuery={countryQuery}
        setCountryQuery={setCountryQuery}
      />

      <main className="main-content">
        {error && <Notification type="error" message={error} />}
        {loading && <Notification type="loading" message="Loading earthquakes…" />}

        <AppLayout
          data={filtered}
          selected={selected}
          setSelected={setSelected}
          mapType={mapType}
          setMapType={setMapType}
          showPlates={showPlates}
        />
      </main>

      <Footer />

      {alertMsg && (
        <Notification message={alertMsg} onClose={() => setAlertMsg("")} />
      )}

      <button className="simulate-btn" onClick={simulateAlert}>
        Simulate Earthquake
      </button>
    </div>
  );
}
