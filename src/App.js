import "./App.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import TrackMap from "./components/Trackmap/Trackmap";

<script
  src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
  integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
  crossorigin=""
  List
></script>;

<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js"></script>;

/*
function App() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const newPositions = data[0].points.map((p) => [p.lat, p.lon]);
        setPositions(newPositions);
        console.log(newPositions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MapContainer
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.45695926652283, 13.53180803278803]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: "red", color: "blue" }}
        positions={positions}
      />
    </MapContainer>
  );
}
*/

/*

function App() {TrackMap
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MapContainer
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tracks.map((track) => (
        <Polyline
          key={track.name}
          pathOptions={{ fillColor: "red", color: "blue" }}
          positions={track.points.map((p) => [p.lat, p.lon])}
        />
      ))}
    </MapContainer>
  );
}

export default App;ä



function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        const allTracks = data.map((track) => {
          return {
            name: track.fileName,
            points: track.data[0].points.map((point) => [point.lat, point.lon]),
          };
        });
        setTracks(allTracks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MapContainer
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tracks.map((track) => (
        <Polyline
          key={track.name}
          pathOptions={{ fillColor: "red", color: "blue" }}
          positions={track.points}
        />
      ))}
    </MapContainer>
  );
}

export default App;

function App() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/api/gpx")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const polylines = tracks.map((track, index) => (
    <Polyline
      key={index}
      pathOptions={{ fillColor: "red", color: "blue" }}
      positions={track.points.map((p) => [p.lat, p.lon])}
    />
  ));

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && polylines.length > 0) {
      const bounds = L.latLngBounds(
        polylines.map((polyline) => polyline.props.positions)
      );
      mapRef.current.leafletElement.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [polylines]);

  return (
    <MapContainer
      className="map-container"
      center={[52.45695926652283, 13.53180803278803]}
      zoom={13}
      scrollWheelZoom={true}
      whenReady={() => {
        mapRef.current.leafletElement.invalidateSize();
      }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polylines}
    </MapContainer>
  );
}

export default App;
*/

function App() {
  return (
    <div className="App">
      <TrackMap />
    </div>
  );
}

export default App;
