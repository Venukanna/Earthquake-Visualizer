// import axios from 'axios'

// const USGS_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

// export async function fetchEarthquakes() {
//   const res = await axios.get(USGS_URL)
//   return res.data
// }

// import axios from 'axios'

// // USGS valid feeds: hour | day | week | month
// export async function fetchEarthquakes(range = "day") {
//   const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${range}.geojson`
//   const res = await axios.get(url)
//   return res.data
// }

// import axios from "axios";

// // USGS valid feeds: hour | day | week | month
// export async function fetchEarthquakes(range = "day") {
//   if (range === "all") {
//     // 🆕 Special case: fetch all ranges and merge them
//     const ranges = ["hour", "day", "week", "month"];
//     const responses = await Promise.all(
//       ranges.map(r =>
//         axios.get(
//           `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${r}.geojson`
//         )
//       )
//     );

//     // merge all features without duplicates
//     const mergedFeatures = responses.flatMap(res => res.data.features);
//     const unique = Array.from(
//       new Map(mergedFeatures.map(f => [f.id, f])).values()
//     );

//     return { type: "FeatureCollection", features: unique };
//   }

//   // ✅ Default single feed
//   const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${range}.geojson`;
//   const res = await axios.get(url);
//   return res.data;
// }

// import axios from "axios";

// // USGS feeds: hour | day | week | month
// // For custom ranges, we switch to FDSN API
// export async function fetchEarthquakes(range = "day", customRange = null) {
//   let url;

//   if (range === "custom" && customRange) {
//     const { start, end } = customRange;
//     url =
//       "https://earthquake.usgs.gov/fdsnws/event/1/query?" +
//       "format=geojson" +
//       `&starttime=${start}` +
//       `&endtime=${end}` +
//       "&minmagnitude=2.5" +  // safe threshold (can lower to 0 if needed)
//       "&limit=20000" +
//       "&orderby=time";
//   } else if (range === "15days") {
//     // 15 days ago → today
//     const start = new Date();
//     start.setDate(start.getDate() - 15);
//     const startStr = start.toISOString().split("T")[0];
//     const endStr = new Date().toISOString().split("T")[0];

//     url =
//       "https://earthquake.usgs.gov/fdsnws/event/1/query?" +
//       "format=geojson" +
//       `&starttime=${startStr}` +
//       `&endtime=${endStr}` +
//       "&minmagnitude=2.5" +
//       "&limit=20000" +
//       "&orderby=time";
//   } else {
//     // Default USGS summary feeds
//     url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${range}.geojson`;
//   }

//   const res = await axios.get(url);
//   return res.data;
// }

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
