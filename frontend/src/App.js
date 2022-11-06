import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [backend, setBackend] = useState("No Backend connection");
  const backendURL = `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/test`;
  console.log(backendURL);
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      console.log(response.data.data);
      setBackend(
        response.data.data === "Success"
          ? "Connected to Backend Successfully"
          : "Unable to connect to Backend"
      );
    });
  }, []);
  return <div className="App">{backend}</div>;
}

export default App;
