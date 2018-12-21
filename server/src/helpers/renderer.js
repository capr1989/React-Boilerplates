import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../client/components/Home.js";
export default () => {
  const content = renderToString(<Home />);
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="styles.css" />
    </head>
    <body>
        <div id ="root">${content}</div>
        <script src="main-client-bundle.js"></script>
   </body>
    </html>`;
};
