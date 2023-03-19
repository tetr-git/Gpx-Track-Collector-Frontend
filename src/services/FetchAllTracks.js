import axios from "axios";

export const fetchTracks = async (onSuccess, onError, setLoadingProgress) => {
  try {
    const allFilesResponse = await axios.get(
      "http://localhost:3003/api/gpx/all"
    );
    const trackCount = allFilesResponse.data.count;

    const trackPromises = Array.from({ length: trackCount }, (_, index) =>
      axios.get(`http://localhost:3003/api/gpx/${index}`)
    );

    const trackResponses = [];
    for (let i = 0; i < trackPromises.length; i++) {
      const response = await trackPromises[i];
      trackResponses.push(response);
      setLoadingProgress(Math.floor(((i + 1) / trackPromises.length) * 100));
    }

    const tracks = trackResponses.map((response, index) => {
      const trackData = response.data.data[0];
      const points = trackData.points || [];
      const startTime = points.length > 0 ? new Date(points[0].time) : null;
      const endTime =
        points.length > 0 ? new Date(points[points.length - 1].time) : null;
      const totalTime = startTime && endTime ? (endTime - startTime) / 1000 : 0; // Time difference in seconds
      const totalLengthInKm = (trackData.distance?.total || 0) / 1000;
      const avgSpeed = totalTime > 0 ? totalLengthInKm / (totalTime / 3600) : 0; // Speed in km/h

      return {
        fileName: response.data.fileName,
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

    onSuccess(tracks);
  } catch (error) {
    console.error(error);
    onError("Error fetching tracks");
  }
};
