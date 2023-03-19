import React, { useState } from "react";
import "./TrackDetailsPanel.css";
import ReactLoading from "react-loading";
import uploadFile from "../../services/fileUploadService";
import Overlay from "../overlay/Overlay";
import deleteTrack from "../../services/deleteTrackService";

const TrackDetails = ({
  isLoading,
  loadingProgress,
  track,
  tracks,
  onTrackClick,
  onResetView,
  refreshTracks,
}) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [sortType, setSortType] = useState("name-asc");
  const [overlay, setOverlay] = useState({ isVisible: false, message: "" });

  if (isLoading) {
    return (
      <div className="track-details">
        <div className="loading-container">
          <ReactLoading
            type={"spin"}
            color={"#000"}
            height={"20%"}
            width={"20%"}
            className="loading-animation"
          />
          <div className="loading-progress">
            <p>Loading tracks... {loadingProgress}%</p>
          </div>
        </div>
      </div>
    );
  }

  const filterAndSortTracks = () => {
    return tracks
      .filter((t) => t.name.toLowerCase().includes(filterTerm.toLowerCase()))
      .sort((a, b) => {
        switch (sortType) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "distance-asc":
            return a.totalLength - b.totalLength;
          case "distance-desc":
            return b.totalLength - a.totalLength;
          case "time-asc":
            return a.totalTime - b.totalTime;
          case "time-desc":
            return b.totalTime - a.totalTime;
          default:
            return 0;
        }
      });
  };

  const sortedAndFilteredTracks = filterAndSortTracks();

  const getTotalDistanceAndTime = () => {
    const totalDistance = tracks.reduce((sum, t) => sum + t.totalLength, 0);
    const totalTime = tracks.reduce((sum, t) => sum + t.totalTime, 0);
    return {
      totalDistance: (totalDistance / 1000).toFixed(2),
      totalTime: (totalTime / 3600).toFixed(2),
    };
  };

  const { totalDistance, totalTime } = getTotalDistanceAndTime();

  const handleDelete = () => {
    deleteTrack(
      track.fileName,
      (message) => {
        setOverlay({ isVisible: true, message });
        onResetView();
        refreshTracks();
      },
      (errorMessage) => {
        console.error(errorMessage);
        setOverlay({ isVisible: true, message: "Error deleting the file" });
      }
    );
  };

  if (!track) {
    return (
      <div className="track-details">
        <h4>GPXTrackCollector</h4>
        <p>Total distance {totalDistance} km</p>
        <p>Total time {totalTime} hours</p>
        <div>
          <input
            type="text"
            placeholder="Filter by name"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="distance-asc">Distance (min)</option>
            <option value="distance-desc">Distance (max)</option>
            <option value="time-asc">Time (min)</option>
            <option value="time-desc">Time (max)</option>
          </select>
          {sortedAndFilteredTracks.map((t, index) => (
            <div key={t.fileName} className="track-item">
              <button
                onClick={() => onTrackClick(t, index)}
                onMouseOver={(e) => {
                  e.target.title = t.name;
                }}
              >
                <div className="track-name">
                  {t.name.length > 25 ? t.name.slice(0, 25) + "..." : t.name}
                </div>
                <div className="track-info">
                  <span>{(t.totalLength / 1000).toFixed(2)} km</span>
                  <span>{(t.totalTime / 3600).toFixed(2)} h</span>
                </div>
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="file"
            id="file-input"
            accept=".gpx"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                uploadFile(
                  e.target.files[0],
                  refreshTracks,
                  (message) => setOverlay({ isVisible: true, message }),
                  (errorMessage) =>
                    setOverlay({ isVisible: true, message: errorMessage })
                );
              }
            }}
          />
          <button
            id="upload-button"
            onClick={() => {
              const fileInput = document.getElementById("file-input");
              if (!fileInput.files || fileInput.files.length === 0) {
                setOverlay({
                  isVisible: true,
                  message: "Please select a file to upload",
                });
                return;
              }
              uploadFile(
                fileInput.files[0],
                refreshTracks,
                (message) => setOverlay({ isVisible: true, message }),
                (errorMessage) =>
                  setOverlay({ isVisible: true, message: errorMessage })
              );
            }}
          >
            Upload
          </button>
          <Overlay
            isVisible={overlay.isVisible}
            message={overlay.message}
            onClose={() => setOverlay({ isVisible: false, message: "" })}
          />
        </div>
      </div>
    );
  }

  const totalLengthInKm = track.totalLength / 1000;
  const totalTimeInHours = (track.totalTime / 3600).toFixed(2);
  const avgSpeed = track.avgSpeed.toFixed(2);

  return (
    <div className="track-details">
      <button className="track-details-btn" onClick={onResetView}>
        Back
      </button>
      <h4>{track.name}</h4>
      <p>
        <strong>Total length:</strong> {totalLengthInKm.toFixed(2)} km
      </p>
      <p>
        <strong>Total time:</strong> {totalTimeInHours} hours
      </p>
      <p>
        <strong>Average speed:</strong> {avgSpeed} km/h
      </p>
      <p>
        <strong>Total incline:</strong> {track.totalIncline.toFixed(2)} m
      </p>
      <p>
        <strong>Total decline:</strong> {track.totalDecline.toFixed(2)} m
      </p>
      {track && (
        <button className="delete-track-btn" onClick={handleDelete}>
          Delete Track
        </button>
      )}
    </div>
  );
};

export default TrackDetails;
