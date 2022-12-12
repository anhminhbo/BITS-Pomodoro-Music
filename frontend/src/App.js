import { useState, useEffect } from "react";
import React from "react";
//import { Route, Link } from "react-route-dom"

import axios from "axios";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import LogIn from "./components/Login";
import Register from "./components/Register";
import Setting from "./components/Setting";

function App() {
  const [backend, setBackend] = useState("No Backend connection");
  const backendURL = `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/test`;
  console.log(backendURL);
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      console.log(response.data.data);
      setBackend(
        response.data.data === "Test Success"
          ? "Connected to Backend Successfully."
          : "Unable to connect to Backend."
      );
    });
  });

  // // Sample
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
      {backend}
      <Header />
      {/* <LogIn /> */}
      <Register />
      {/* <Timer min={0} sec={5} /> */}
      {/* <MusicPlayer /> */}
      <Footer />
    </div>
  );
}

export default App;

