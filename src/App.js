import React, { useState, useEffect } from "react";
import Map from "./components/map/Map";
import LoginPage from "./components/LoginPage/LoginPage";
import "./App.css";
import "leaflet/dist/leaflet.css";

<script
  src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
  integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
  crossorigin=""
  List
></script>;

<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/gpx.min.js"></script>;

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="App">
      {user ? <Map /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
