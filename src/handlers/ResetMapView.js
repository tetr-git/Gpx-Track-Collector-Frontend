import L from "leaflet";

export const resetMapView = (mapRef, tracks, setTracks) => {
  if (mapRef.current) {
    const bounds = L.latLngBounds(
      tracks.flatMap((track) => track.points.map((p) => [p.lat, p.lon]))
    );
    mapRef.current.fitBounds(bounds);
  }
  setTracks(
    tracks.map((track) => ({
      ...track,
      pathOptions: {
        color: "blue",
        weight: 3,
      },
    }))
  );
};
