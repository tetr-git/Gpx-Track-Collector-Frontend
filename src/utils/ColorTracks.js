export const colorTracks = (selectedTrack, tracks) => {
  return tracks.map((track) => {
    if (track === selectedTrack) {
      return {
        ...track,
        pathOptions: {
          color: "blue",
          weight: 3,
        },
      };
    } else {
      return {
        ...track,
        pathOptions: {
          color: "grey",
          weight: 2,
        },
      };
    }
  });
};
