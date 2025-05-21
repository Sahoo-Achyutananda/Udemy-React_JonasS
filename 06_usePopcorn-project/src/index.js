// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React, { useState } from "react";
import ReactDom from "react-dom/client";
// import * as util from "./utils.js";

import "./index.css";
// import App from "./App.js";
// import StarComponent from "./StarComponent";
import App from "./App.js";

import Main from "./Main";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
