import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./CSS/App.css";
import Parse from "parse";

Parse.initialize(
  "KqoIYLreqOxM9D4hI1VyukJBa7yj03D1dTd75CzR",
  "zPHndnwR1xEJVLyz1An9bktfus78e1uKmP9F4lVJ"
);

Parse.serverURL = "https://parseapi.back4app.com/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
