import React, { useState } from "react";
import LoginService from "../../services/Login";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService.login(email, password);
      onLoginSuccess(response.user);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Unable to connect to the server");
      }
    }
  };

  return (
    <div className="loginContainer">
      <MapContainer
        center={[52.52, 13.405]}
        zoom={9}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <div className="loginOverlay">
        <div className="loginHeader">
          <h1>GPX Track Collector</h1>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
