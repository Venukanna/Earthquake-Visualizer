


// utils/api.js
import axios from "axios";

export async function fetchEarthquakes(range = "day", customRange = null) {
  let url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

  if (range === "custom" && customRange) {
    url += `&starttime=${customRange.start}&endtime=${customRange.end}`;
  } else {
    switch (range) {
      case "hour":
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
        break;
      case "day":
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
        break;
      case "week":
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
        break;
      case "15days":
        // no official feed, fetch last 30 days and filter
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
        break;
      case "month":
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
        break;
      case "all":
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
        break;
      default:
        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    }
  }

  const response = await axios.get(url);

  // filter if 15days custom range
  if (range === "15days") {
    const start = new Date();
    start.setDate(start.getDate() - 15);
    const filtered = response.data.features.filter(
      (f) => new Date(f.properties.time) >= start
    );
    return { ...response.data, features: filtered };
  }

  return response.data;
}
