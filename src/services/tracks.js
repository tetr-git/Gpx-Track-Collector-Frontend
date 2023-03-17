export const fetchTracks = () => {
  return fetch("http://localhost:3003/api/gpx")
    .then((response) => response.json())
    .then((data) => {
      return data.map((track) => {
        const trackData = track.data[0];
        const startTime = new Date(trackData.points[0].time);
        const endTime = new Date(
          trackData.points[trackData.points.length - 1].time
        );
        const totalTime = (endTime - startTime) / 1000; // Time difference in seconds
        const totalLengthInKm = trackData.distance.total / 1000;
        const avgSpeed = totalLengthInKm / (totalTime / 3600); // Speed in km/h

        return {
          fileName: track.fileName,
          name: trackData.name,
          points: trackData.points,
          totalLength: trackData.distance.total,
          totalIncline: trackData.elevation.pos,
          totalDecline: trackData.elevation.neg,
          totalTime,
          avgSpeed,
          pathOptions: {
            color: "blue",
            weight: 3,
          },
        };
      });
    });
};
