import axios from "axios";

import { getToken } from "../utils/GetToken";

export const fetchTracks = async (onSuccess, onError, setLoadingProgress) => {
  try {
    const token = getToken();

    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_GRC_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const allFilesResponse = await axiosInstance.get("gpx/all");
    const trackCount = allFilesResponse.data.count;

    const trackPromises = Array.from({ length: trackCount }, (_, index) =>
      axiosInstance.get(`gpx/${index}`)
    );

    let loadedTrackCount = 0;
    const trackResponses = await Promise.all(
      trackPromises.map(async (trackPromise, index) => {
        const response = await trackPromise;
        loadedTrackCount++;
        setLoadingProgress(Math.floor((loadedTrackCount / trackCount) * 100));
        return response;
      })
    );

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
    if (error.message === "Network Error" || error.response?.status >= 500) {
      onError("Server not reachable");
    } else {
      onError("Error fetching tracks");
    }
  }
};
