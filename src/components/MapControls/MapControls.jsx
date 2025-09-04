import React from "react";
import "./MapControls.css";
import { Plus, Minus, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";

const MapControls = ({ map }) => {
  if (!map) return null;

  const zoomIn = () => map.setZoom(map.getZoom() + 1);
  const zoomOut = () => map.setZoom(map.getZoom() - 1);
  const moveUp = () => map.panBy([0, -100]);
  const moveDown = () => map.panBy([0, 100]);
  const moveLeft = () => map.panBy([-100, 0]);
  const moveRight = () => map.panBy([100, 0]);

  const goFullscreen = () => {
    if (map._container.requestFullscreen) {
      map._container.requestFullscreen();
    }
  };

  return (
    <div className="map-controls">
      <button className="control-btn up" onClick={moveUp}><ArrowUp size={18} /></button>
      <button className="control-btn left" onClick={moveLeft}><ArrowLeft size={18} /></button>
      <button className="control-btn right" onClick={moveRight}><ArrowRight size={18} /></button>
      <button className="control-btn down" onClick={moveDown}><ArrowDown size={18} /></button>
      <button className="control-btn zoom-in" onClick={zoomIn}><Plus size={18} /></button>
      <button className="control-btn zoom-out" onClick={zoomOut}><Minus size={18} /></button>
      <button className="control-btn fullscreen" onClick={goFullscreen}><Maximize2 size={18} /></button>
    </div>
  );
};

export default MapControls;
