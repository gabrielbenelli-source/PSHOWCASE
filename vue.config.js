const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // CONFIGURACIÓN PARA GITHUB PAGES (Corregida con mayúsculas)
  publicPath: process.env.NODE_ENV === "production" ? "/PSHOWCASE/" : "/",

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
