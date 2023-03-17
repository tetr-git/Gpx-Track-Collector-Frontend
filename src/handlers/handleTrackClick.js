import L from "leaflet";
import { colorTracks } from "../utils/colorTracks";

export const handleTrackClick = (selectedTrack, mapRef, setTracks, tracks) => {
  const bounds = L.latLngBounds(
    selectedTrack.points.map((p) => [p.lat, p.lon])
  );
  if (mapRef.current) {
    mapRef.current.fitBounds(bounds, { padding: [50, 50] });
  }
  setTracks(colorTracks(selectedTrack, tracks));
};
