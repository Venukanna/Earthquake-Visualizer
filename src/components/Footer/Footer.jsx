import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          🌍 <strong>About Earthquakes:</strong>  
          Earthquakes are the shaking of the Earth's surface caused by sudden movements of tectonic plates. 
          Their strength is measured in <em>magnitude</em>, and stronger quakes can cause significant damage.  
          Monitoring earthquakes helps scientists understand seismic patterns and improve safety.
        </p>
        <small>Data from USGS • Made for Interview Task</small>
      </div>
    </footer>
  )
}
