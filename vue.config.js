module.exports = {
  publicPath: "./",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://m.maizuo.com/",
        // ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
