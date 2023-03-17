import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

function TrackMap() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const allTracks = data.map((track) => {
          return {
            name: track.fileName,
            points: track.data[0].points,
            pathOptions: {
              color: "blue",
              weight: 3,
            },
          };
        });
        setTracks(allTracks);
        if (mapRef.current) {
          const bounds = L.latLngBounds(
            allTracks.flatMap((track) =>
              track.points.map((p) => [p.lat, p.lon])
            )
          );
          mapRef.current.fitBounds(bounds);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTrackClick = (track) => {
    //setSelectedTrack(track);
    const bounds = L.latLngBounds(track.points.map((p) => [p.lat, p.lon]));
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
    setTracks((prevTracks) =>
      prevTracks.map((prevTrack) => {
        if (prevTrack === track) {
          return {
            ...prevTrack,
            pathOptions: {
              color: "blue",
              weight: 5,
            },
          };
        } else {
          return {
            ...prevTrack,
            pathOptions: {
              color: "grey",
              weight: 3,
            },
          };
        }
      })
    );
  };

  return (
    <MapContainer
      ref={mapRef}
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tracks.map((track) =>
        track.points.length > 0 ? (
          <Polyline
            key={track.fileName}
            pathOptions={track.pathOptions}
            positions={track.points.map((p) => [p.lat, p.lon])}
            eventHandlers={{
              click: () => handleTrackClick(track),
            }}
          />
        ) : null
      )}
    </MapContainer>
  );
}

export default TrackMap;

/*
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

function TrackMap() {
  const [tracks, setTracks] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const allTracks = data.map((track) => {
          return {
            name: track.fileName,
            points: track.data[0].points,
          };
        });
        setTracks(allTracks);
        if (mapRef.current) {
          const bounds = L.latLngBounds(
            allTracks.flatMap((track) =>
              track.points.map((p) => [p.lat, p.lon])
            )
          );
          mapRef.current.fitBounds(bounds);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MapContainer
      ref={mapRef}
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tracks.map((track) =>
        track.points.length > 0 ? (
          <Polyline
            key={track.fileName}
            pathOptions={{ fillColor: "red", color: "blue" }}
            positions={track.points.map((p) => [p.lat, p.lon])}
          />
        ) : null
      )}
    </MapContainer>
  );
}

export default TrackMap;


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

function TrackMap() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(9);

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const allTracks = data.map((track) => {
          return {
            name: track.fileName,
            points: track.data[0].points,
          };
        });
        setTracks(allTracks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    setZoomLevel(15); // or any other zoom level you prefer
  };

  return (
    <div>
      <MapContainer
        className="map-container"
        center={[52.45695926652283, 13.53180803278803]}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {tracks.map((track) =>
          track.points.length > 0 ? (
            <Polyline
              key={track.fileName}
              pathOptions={{ fillColor: "red", color: "blue" }}
              positions={track.points.map((p) => [p.lat, p.lon])}
              eventHandlers={{
                click: () => handleTrackClick(track),
              }}
            />
          ) : null
        )}
      </MapContainer>

      {selectedTrack && (
        <div>
          <h2>{selectedTrack.name}</h2>
          <ul>
            {selectedTrack.points.map((p, index) => (
              <li key={index}>
                Latitude: {p.lat}, Longitude: {p.lon}, Elevation: {p.ele}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrackMap;

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

function TrackMap() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const allTracks = data.map((track) => {
          return {
            name: track.fileName,
            points: track.data[0].points,
          };
        });
        setTracks(allTracks);
        if (mapRef.current) {
          const bounds = L.latLngBounds(
            allTracks.flatMap((track) =>
              track.points.map((p) => [p.lat, p.lon])
            )
          );
          mapRef.current.fitBounds(bounds);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
    const bounds = L.latLngBounds(track.points.map((p) => [p.lat, p.lon]));
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
    }
  };

  return (
    <MapContainer
      ref={mapRef}
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={9}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {tracks.map((track) =>
        track.points.length > 0 ? (
          <Polyline
            key={track.fileName}
            pathOptions={{
              color: selectedTrack === track ? "blue" : "grey",
              weight: selectedTrack === track ? 5 : 3,
            }}
            positions={track.points.map((p) => [p.lat, p.lon])}
            eventHandlers={{
              click: () => handleTrackClick(track),
            }}
          />
        ) : null
      )}
    </MapContainer>
  );
}

export default TrackMap;
*/
