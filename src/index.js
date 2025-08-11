import React from "react";
import ReactDom from "react-dom/client";
import App from "./component/App";
import "./index.css";
import { WeatherProvider } from "./context/WeatherContext";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>,
);
