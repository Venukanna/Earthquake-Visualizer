import React from 'react'
import './SearchBar.css'

export default function SearchBar({ minMag, setMinMag, refresh, loading }) {
  return (
    <div className="searchbar">
      <label>
        Min Magnitude:
        <input
          type="number"
          min="0"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(Number(e.target.value))}
        />
      </label>
      <button onClick={refresh} disabled={loading}>
        {loading ? 'Loading…' : 'Refresh'}
      </button>
    </div>
  )
}
