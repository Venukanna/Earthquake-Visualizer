import React from 'react'
import './Legend.css'

export default function Legend() {
  return (
    <div className="legend">
      <h4>Legend</h4>
      <div><span className="circle small"></span> Small (&lt; 2.5)</div>
      <div><span className="circle med"></span> Moderate (2.5–5.0)</div>
      <div><span className="circle large"></span> Large (&gt; 5.0)</div>
    </div>
  )
}
