
import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Header({
  minMag,
  setMinMag,
  loadData,
  loading,
  timeRange,
  setTimeRange,
  setCustomRange,
  showPlates,
  setShowPlates,
  countryQuery,
  setCountryQuery,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const applyCustomRange = () => {
    if (startDate && endDate) {
      const range = { start: startDate, end: endDate };
      setTimeRange("custom");
      setCustomRange(range);
      loadData("custom", range);
    }
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    if (value === "custom") return;
    loadData(value);
  };

  // Mobile sidebar content (filters + searchbar)
  const SidebarContent = () => (
    <div className="mobile-sidebar-content">
      <SearchBar
        minMag={minMag}
        setMinMag={setMinMag}
        refresh={() => loadData(timeRange)}
        loading={loading}
      />
      <label className="filter">
        Time Range:
        <select
          value={timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value)}
        >
          <option value="hour">Past 1 Hour</option>
          <option value="day">Past 24 Hours</option>
          <option value="week">Past 7 Days</option>
          <option value="15days">Past 15 Days</option>
          <option value="month">Past 30 Days</option>
          <option value="all">All (Significant)</option>
          <option value="custom">Custom Range</option>
        </select>
      </label>

      {timeRange === "custom" && (
        <div className="custom-range">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            onClick={applyCustomRange}
            disabled={!startDate || !endDate || loading}
          >
            Apply
          </button>
        </div>
      )}

      <label className="filter">
        Country/Region:
        <input
          type="text"
          placeholder="e.g. India"
          value={countryQuery}
          onChange={(e) => setCountryQuery(e.target.value)}
        />
      </label>

      <label className="filter plates-toggle">
        <input
          type="checkbox"
          checked={showPlates}
          onChange={(e) => setShowPlates(e.target.checked)}
        />
        Show Tectonic Plates
      </label>
    </div>
  );

  return (
    <header className="header">
      <div className="header-top">
        <h1>Earthquake Visualizer</h1>
        <p>Explore global earthquakes from USGS feeds</p>

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            className="mobile-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        )}
      </div>

      {/* Desktop controls remain visible */}
      {!isMobile && <div className="controls">
        <SearchBar
          minMag={minMag}
          setMinMag={setMinMag}
          refresh={() => loadData(timeRange)}
          loading={loading}
        />

        <label className="filter">
          Time Range:
          <select
            value={timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
          >
            <option value="hour">Past 1 Hour</option>
            <option value="day">Past 24 Hours</option>
            <option value="week">Past 7 Days</option>
            <option value="15days">Past 15 Days</option>
            <option value="month">Past 30 Days</option>
            <option value="all">All (Significant)</option>
            <option value="custom">Custom Range</option>
          </select>
        </label>

        {timeRange === "custom" && (
          <div className="custom-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={applyCustomRange}
              disabled={!startDate || !endDate || loading}
            >
              Apply
            </button>
          </div>
        )}

        <label className="filter">
          Country/Region:
          <input
            type="text"
            placeholder="e.g. India"
            value={countryQuery}
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </label>

        <label className="filter plates-toggle">
          <input
            type="checkbox"
            checked={showPlates}
            onChange={(e) => setShowPlates(e.target.checked)}
          />
          Show Tectonic Plates
        </label>
      </div>}

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && <div className="mobile-sidebar"><SidebarContent /></div>}
    </header>
  );
}
