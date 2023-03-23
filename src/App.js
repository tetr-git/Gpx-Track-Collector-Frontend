import React, { useState, useEffect } from "react";
import Map from "./components/map/Map";
import LoginPage from "./components/loginpage/LoginPage";
import "leaflet";
import "leaflet-gpx";
import "leaflet/dist/leaflet.css";
import "./App.css";

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
