


import React from "react";
import "./Sidebar.css";

const Sidebar = ({ earthquakes = [], onSelect }) => {
  return (
    <div className="sidebar">
      <h3>🌍 Earthquake List</h3>
      {earthquakes.length === 0 ? (
        <p>No earthquakes found.</p>
      ) : (
        <ul>
          {earthquakes.map((q) => (
            <li key={q.id} onClick={() => onSelect(q)}>
              <strong>M{q.properties.mag}</strong> - {q.properties.place}
              <br />
              <small>{new Date(q.properties.time).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
