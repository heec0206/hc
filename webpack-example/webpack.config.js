
const path = require('path');
module.exports = {
  entry : "./source/index.js",
  output : {
    path : path.resolve(__dirname, "publish"),
    filename : 'index_bundle.js'
  }
}
