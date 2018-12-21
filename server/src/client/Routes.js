import React from "react";
import Home from "./components/Home.js";
import { Route } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/about"
        render={() => {
          return <h1>About Page</h1>;
        }}
      />
    </React.Fragment>
  );
};
