const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  output: {
    path: __dirname+'/public',
    filename: '[name].bundle.js'
  },
  mode: "development",
  // watch: true
});
