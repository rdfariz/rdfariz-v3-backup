const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: 'RdFariz' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: []
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/main.scss'
  ],
  layoutTransition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDyfOiP4muV38cWTPoq3ztHM6eLctsSIRI',
          authDomain: 'rdfariz-data.firebaseapp.com',
          databaseURL: 'https://rdfariz-data.firebaseio.com',
          projectId: 'rdfariz-data',
          storageBucket: 'rdfariz-data.appspot.com',
          messagingSenderId: '418992693682',
          appId: '1:418992693682:web:89692e4085ca9198ad04ab',
          measurementId: 'G-VGGY9XM72G'
        },
        services: {
          analytics: true,
          firestore: true
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    fallback: true
  }
}
