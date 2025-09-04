import React from "react";
import "./Filters.css";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="filters">
      <h3>🔍 Filters</h3>

      {/* Date Range */}
      <label>
        Date Range:
        <select
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
        >
          <option value="day">Past Day</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
        </select>
      </label>

      {/* Magnitude */}
      <label>
        Min Magnitude:
        <input
          type="number"
          value={filters.minMag}
          min="0"
          max="10"
          step="0.1"
          onChange={(e) => setFilters({ ...filters, minMag: parseFloat(e.target.value) })}
        />
      </label>

      <label>
        Max Magnitude:
        <input
          type="number"
          value={filters.maxMag}
          min="0"
          max="10"
          step="0.1"
          onChange={(e) => setFilters({ ...filters, maxMag: parseFloat(e.target.value) })}
        />
      </label>

      {/* Depth */}
      <label>
        Depth:
        <select
          value={filters.depth}
          onChange={(e) => setFilters({ ...filters, depth: e.target.value })}
        >
          <option value="all">All</option>
          <option value="shallow">Shallow (&lt; 70km)</option>
          <option value="intermediate">Intermediate (70–300km)</option>
          <option value="deep">Deep (&gt; 300km)</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
