import { useState, useEffect } from "react";
import React from "react";
//import { Route, Link } from "react-route-dom"

import axios from "axios";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  // const [backend, setBackend] = useState("No Backend connection");
  // const backendURL = `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/test`;
  // console.log(backendURL);
  // useEffect(() => {
  //   axios.get(backendURL).then((response) => {
  //     console.log(response.data.data);
  //     setBackend(
  //       response.data.data === "Success"
  //         ? "Connected to Backend Successfully with Redis"
  //         : "Unable to connect to Backend"
  //     );
  //   });
  // });
  return (
    <div className="App">
      {/* {backend} */}
      <Header />
      <Footer/>
      {/* <Timer min={0} sec={5} /> */}
      {/* {backend} */}
      <Timer min={0} sec={5} />
      <MusicPlayer />
    </div>
  );
}

export default App;
