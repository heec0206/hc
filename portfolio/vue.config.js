module.exports = {
  devServer: { overlay: false },
  chainWebpack(config) {
    config.devtool('source-map')
  },
  //css : { sourceMap : true },

  publicPath: process.env.NODE_ENV === 'production'
      ? '/portfolio/'
      : '/'
}
