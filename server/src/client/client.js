import React from "react";
import { hydrate } from "react-dom";
import Home from "../client/components/Home.js";

import "./components/main.css";

hydrate(<Home />, document.getElementById("root"));
