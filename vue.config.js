module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/Mappit/" : "/",

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
};
