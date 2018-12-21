import React from "react";
import { hydrate } from "react-dom";
import Home from "../client/components/Home.js";

import "./components/main.scss";

hydrate(<Home />, document.getElementById("root"));
