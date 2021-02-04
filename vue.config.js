module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/scss/global.scss";`,
      },
    },
  },
  devServer: {
    proxy: "http://localhost:3000",
    // proxy: 'http://47.100.167.209:3000'
  },
  publicPath: "./",
  outputDir: "dist",
};
