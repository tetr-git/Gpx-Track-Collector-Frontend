export const fetchTracks = async () => {
  const response = await fetch("http://localhost:3003/api/gpx");
  const data = await response.json();
  return data.map((track) => {
    const trackData = track.data[0];
    const points = trackData.points || [];
    const startTime = points.length > 0 ? new Date(points[0].time) : null;
    const endTime =
      points.length > 0 ? new Date(points[points.length - 1].time) : null;
    const totalTime = startTime && endTime ? (endTime - startTime) / 1000 : 0; // Time difference in seconds
    const totalLengthInKm = (trackData.distance?.total || 0) / 1000;
    const avgSpeed = totalTime > 0 ? totalLengthInKm / (totalTime / 3600) : 0; // Speed in km/h

    return {
      fileName: track.fileName || "",
      name: trackData.name || "",
      points: points,
      totalLength: trackData.distance?.total || 0,
      totalIncline: trackData.elevation?.pos || 0,
      totalDecline: trackData.elevation?.neg || 0,
      totalTime,
      avgSpeed,
      pathOptions: {
        color: "blue",
        weight: 3,
      },
    };
  });
};
