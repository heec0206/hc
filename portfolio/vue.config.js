module.exports = {
  devServer: { overlay: false },
  chainWebpack(config) {
    config.devtool('source-map')
  },
  //css : { sourceMap : true },

  publicPath : '/hc/portfolio'
}
