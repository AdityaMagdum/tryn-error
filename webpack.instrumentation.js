const webpack = require('webpack');
const path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.(ts)$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["babel-plugin-istanbul"],
            },
          },
          enforce: "post",
          // include: require('path').join(__dirname, '..', 'src'),
          include: require("path").join(__dirname, "src"),
          exclude: [/node_modules/, /\.(e2e|spec)\.ts$/, /(ngfactory|ngstyle)\.js/],
        },
      ],
    },
}
