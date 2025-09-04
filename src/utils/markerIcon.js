import L from 'leaflet'
import markerUrl from 'leaflet/dist/images/marker-icon.png'
import marker2xUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

export default function fixLeafletMarkerIcon() {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2xUrl,
    iconUrl: markerUrl,
    shadowUrl: shadowUrl,
  })
}
