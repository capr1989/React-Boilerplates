import React from "react";
export default () => (
  <React.Fragment>
    <h1>Home Component</h1>
    <button
      onClick={() => {
        console.log("Hello");
      }}
    >
      BTN
    </button>
  </React.Fragment>
);
