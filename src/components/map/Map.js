import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { fetchTracks } from "../../services/FetchAllTracks";
import { handleTrackClick } from "../../handlers/HandleTrackClick";
import { resetMapView } from "../../handlers/ResetMapView";
import TrackDetails from "../track-details-panel/TrackDetailsPanel";
import "./Map.css";

function Map() {
  const [tracks, setTracks] = useState([]);
  const mapRef = useRef();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onTrackClick = (track) => {
    handleTrackClick(track, mapRef, setTracks, tracks);
    setSelectedTrack(track);
  };

  const resetView = () => {
    resetMapView(mapRef, tracks, setTracks);
    setSelectedTrack(null);
  };

  useEffect(() => {
    fetchTracks().then((allTracks) => {
      setTracks(allTracks);
      setIsLoading(false);
      if (mapRef.current) {
        const bounds = L.latLngBounds(
          allTracks.flatMap((track) => track.points.map((p) => [p.lat, p.lon]))
        );
        mapRef.current.fitBounds(bounds);
      }
    });
  }, []);

  //to make the map fit the bounds of the polyline
  L.Path.CLIP_PADDING = 1.5;

  return (
    <div className="map-container-wrapper">
      <TrackDetails
        isLoading={isLoading}
        track={selectedTrack}
        tracks={tracks}
        onTrackClick={onTrackClick}
        onResetView={resetView}
      />
      <MapContainer
        ref={mapRef}
        className="map-container"
        center={[52.45695926652283, 13.53180803278803]}
        zoom={9}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
        {tracks.map((track) =>
          track.points.length > 0 ? (
            <Polyline
              key={track.fileName}
              pathOptions={track.pathOptions}
              positions={track.points.map((p) => [p.lat, p.lon])}
              eventHandlers={{
                click: () => {
                  handleTrackClick(track, mapRef, setTracks, tracks);
                  setSelectedTrack(track);
                },
                mouseover: (e) => {
                  const tooltip = L.tooltip({ permanent: false });
                  tooltip.setContent(track.name);
                  e.target.bindTooltip(tooltip).openTooltip();
                },
                mouseout: (e) => {
                  setTimeout(() => {
                    e.target.closeTooltip();
                  }, 1000);
                },
              }}
            />
          ) : null
        )}
      </MapContainer>
      <button className="reset-view-btn" onClick={resetView}>
        Show all tracks
      </button>
    </div>
  );
}

export default Map;
