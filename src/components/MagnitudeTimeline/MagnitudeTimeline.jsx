// // src/components/MagnitudeTimeline/MagnitudeTimeline.jsx
// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./MagnitudeTimeline.css";

// export default function MagnitudeTimeline({ features = [] }) {
//   const [open, setOpen] = useState(true);

//   // prepare data
//   const data = features.map((f) => ({
//     time: new Date(f.properties.time).toLocaleTimeString(),
//     mag: f.properties.mag,
//   }));

//   return (
//     <div className={`timeline-container ${open ? "open" : "collapsed"}`}>
//       <button className="toggle-btn" onClick={() => setOpen(!open)}>
//         {open ? "⯈" : "⯇"}
//       </button>

//       {open && (
//         <div className="timeline-content">
//           <h4>Magnitude Timeline</h4>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={data}>
//               <XAxis dataKey="time" hide />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="mag" stroke="#ff5733" dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// }
// src/components/MagnitudeTimeline/MagnitudeTimeline.jsx
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Scatter,
} from "recharts";
import "./MagnitudeTimeline.css";

export default function MagnitudeTimeline({ features = [] }) {
  // 🔄 Convert features into chart data
  const data = useMemo(
    () =>
      features.map((f) => ({
        time: new Date(f.properties.time).toLocaleString(),
        mag: f.properties.mag,
      })),
    [features]
  );

  return (
    <div className="timeline-container">
      <h3>Magnitude Timeline</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide /> {/* Hide for compactness */}
          <YAxis />
          <Tooltip formatter={(val) => `M ${val}`} labelStyle={{ color: "#555" }} />

          {/* 🔵 Normal magnitudes */}
          <Line type="monotone" dataKey="mag" stroke="#ff5722" dot={false} />

          {/* 🔴 Highlight magnitudes > 5 */}
          <Scatter
            data={data.filter((d) => d.mag >= 5)}
            fill="red"
            shape="circle"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
