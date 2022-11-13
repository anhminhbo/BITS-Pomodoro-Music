import { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./components/Timer";

function App() {
  const [backend, setBackend] = useState("No Backend connection");
  const backendURL = `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/test`;
  console.log(backendURL);
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      console.log(response.data.data);
      setBackend(
        response.data.data === "Success"
          ? "Connected to Backend Successfully, test new Jenkins 22 new size 1 "
          : "Unable to connect to Backend"
      );
    });
  }, []);
  return (
    <div className="App">
      {backend}
      <Timer min={0} sec={5} />
    </div>
  );
}

export default App;
