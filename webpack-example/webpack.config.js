const path = require('path');
module.exports = {
  //mode : "production",
  mode : "development",
  entry : {
    index : "./source/index.js",
    about : "./source/about.js",
  },
  
  output : {
    path: path.resolve(__dirname, 'publish'),
    filename : "[name]_bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

};
