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

  const updateUserInLocalStorage = (user) => {
    if (user) {
      const storedUser = localStorage.getItem("user");
      const updatedUser = {
        ...user,
        accessToken: storedUser && JSON.parse(storedUser).accessToken,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    updateUserInLocalStorage(user);
  }, [user]);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    updateUserInLocalStorage(loggedInUser);
  };

  return (
    <div className="App">
      {user ? <Map /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
