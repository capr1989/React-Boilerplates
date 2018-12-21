module.exports = (option, loaders) => {
  return {
    module: {
      exprContextCritical: option,
      rules: [
        //babel-loader
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        browsers: "last 10 versions"
                      }
                    }
                  ],
                  "@babel/preset-react"
                ]
              }
            }
          ]
        },
        //css loaders if any
        loaders
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    }
  };
};
