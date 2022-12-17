import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import LogIn from "./components/Login";
import Register from "./components/Register";
import SettingTimer from "./components/SettingTimer";
import Task from "./components/Task";
import LandingPage from "./components/LandingPage";

axios.defaults.withCredentials = true;

function App() {
  const [backend, setBackend] = useState("No Backend connection");
  const backendURL = `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/test`;
  console.log(backendURL);
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      console.log(response.data.data);
      setBackend(
        response.data.data === "Test Success"
          ? "Connected to Backend Successfully. Github action"
          : "Unable to connect to Backend."
      );
    });
  });
  console.log(backend);

  // // Sample haha
  // const register = async (username, password) => {
  //   try {
  //     const response = await axios.post(
  //       `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/register`,
  //       {
  //         username,
  //         password,
  //       }
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="App">
      {/* {backend} */}
      {/* <Header /> */}
      {/* <LandingPage/> */}
      {/* <LogIn /> */}
      {/* <Register /> */}
      {/* <SettingTimer /> */}
      {/* <MusicPlayer /> */}
      {/* <Task /> */}
      {/* <Footer /> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SettingTimer />
              <MusicPlayer />
              <Task />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <LogIn />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
