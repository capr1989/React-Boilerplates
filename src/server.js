// import App from './App';
// import React from 'react';
// import { StaticRouter } from 'react-router-dom';
// import express from 'express';
// import { renderToString } from 'react-dom/server';

// const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// const server = express();
// server
//   .disable('x-powered-by')
//   .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
//   .get('/*', (req, res) => {
//     const context = {};
//     const markup = renderToString(
//       <StaticRouter context={context} location={req.url}>
//         <App />
//       </StaticRouter>
//     );

//     if (context.url) {
//       res.redirect(context.url);
//     } else {
//       res.status(200).send(
//         `<!doctype html>
//     <html lang="">
//     <head>
//         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta charset="utf-8" />
//         <title>Welcome to Razzle</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         ${
//           assets.client.css
//             ? `<link rel="stylesheet" href="${assets.client.css}">`
//             : ''
//         }
//         ${
//           process.env.NODE_ENV === 'production'
//             ? `<script src="${assets.client.js}" defer></script>`
//             : `<script src="${assets.client.js}" defer crossorigin></script>`
//         }
//     </head>
//     <body>
//         <div id="root">${markup}</div>
//     </body>
// </html>`
//       );
//     }
//   });
// export default server;



import App from './App'
import React, {Fragment} from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import { StaticRouter } from 'react-router'
import 'isomorphic-fetch'
import client from './Utils/initApollo'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
const context = {}


server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', async (req, res) => {

        const Root = () => (
            <ApolloProvider client={client}>
                    <StaticRouter location={req.url} context={context}>
                        <Fragment>
                            <App />
                        </Fragment>
                    </StaticRouter>
            </ApolloProvider>
        )
        let initialApolloState = client.extract()

        try {
            await getDataFromTree(<Root />)
        } catch (e) {
            console.log(e)
        }
      

        // When the app is rendered collect the styles that are used inside it
        const markup = renderToString(<Root />)

        // Generate all the style tags so they can be rendered into the page

        res.send(
            // prettier-ignore
            `<!doctype html>
    <html lang="en">
    <head>
       
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-37411302-9"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-37411302-9');
        </script>
        ${
    assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
}
        ${
    process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
}
        
    </head>
    <body>
        <div id="root">${markup}</div>
           <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(
        initialApolloState
    ).replace(/</g, '\\u003c')}
        </script>
    </body>
</html>`
        )
    })

export default server
