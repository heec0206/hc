const path = require('path');
module.exports = {
  //mode : "production",
  mode : "development",
  entry : "./source/index.js",
  output : {
    path: path.resolve(__dirname, 'publish'),
    filename : "index_bundle.js"
  }

}
