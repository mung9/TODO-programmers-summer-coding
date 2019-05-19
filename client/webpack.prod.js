const merge = require("webpack-merge");
const common = require("./webpack.common");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  output: {
    path: __dirname+'/build',
    filename: '[name].bundle.js'
  },
  plugins:[
    new Dotenv({
      path: './.env.production'
    })
  ],
  mode: "production"
});
