import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./CSS/App.css";
import Parse from "parse";

Parse.initialize(
  process.env.REACT_APP_Application_Id,
  process.env.REACT_APP_JavaScript_Key
);

Parse.serverURL = "https://parseapi.back4app.com/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
