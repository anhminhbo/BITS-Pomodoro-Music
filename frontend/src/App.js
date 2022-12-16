import { useState, useEffect } from "react";
import React from "react";
//import { Route, Link } from "react-route-dom"

import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import LogIn from "./components/Login";
import Register from "./components/Register";
import SettingTimer from "./components/SettingTimer";
import Task from "./components/Task";
import LandingPage from "./components/LandingPage";

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
      <Header />
      <LandingPage/>
      {/* <LogIn /> */}
      <Register />
      {/* <SettingTimer /> */}
      {/* <MusicPlayer />
      <Task /> */}
      <Footer />
    </div>
  );
}

export default App;

