const webpack = require('webpack')
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',
  ssr: true,
  // target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  debug: false,
  head: {
    titleTemplate: '%s - HyperJet',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/main.css'
  ],
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  loading: {
    color: '#8629FD',
    height: '4px'
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/repositories.js', '~/plugins/notifier.js', '~/plugins/axios.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
    // '@aceforth/nuxt-optimized-images'
  ],
  // optimizedImages: {
  //   optimizeImages: true
  // },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/localforage',
    '@nuxtjs/universal-storage',
    'nuxt-user-agent',
    'nuxt-leaflet',

    // With options
    // 'cookie-universal-nuxt'
  ],
  router: {
    middleware: ['ssr-cookie']
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: process.env.API_BASE_URL || 'http://localhost:8090/'
    baseURL: process.env.API_BASE_URL || 'https://api.hjet.ir/'
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#8629FD',
          accent: '#0BCE83',
          secondary: '#808080',
          info: '#F9AA33',
          warning: '#FF4C6A',
          error: '#FF4C6A',
          success: '#0BCE83',
          caution: '#FECD55'
        }
      }
    }
  },
  pwa: {
    manifest: {
      name: 'Hyper Jet',
      short_name: 'Hyper Jet',
      lang: 'en',
      description: 'Hyper Jet online shopping',
      background_color: '#FFFFFF',
      ogImage: 'icon.png',
      ogUrl: 'icon.png',
      start_url: '/',
      display: 'fullscreen',
      orientation: 'portrait'
    },
    icon: {
      source: "icon.png",
      purpose: 'maskable'
    },
    meta: [
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ],
    workbox: {
      dev: false,
      enabled: false,

      // Config
      skipWaiting: true,
      // offlineAnalytics: false,

      // Precache
      // preCaching: [],
      cacheOptions: {
        cacheId: "ir.hyperjet",
        directoryIndex: '/',
        revision: 1.001
      },
      cleanupOutdatedCaches: true,

      // Offline
      offline: false,

      // Runtime Caching
      runtimeCaching: [{
        urlPattern: 'https://api.hjet.ir/files/.*',
        handler: 'CacheFirst',
        method: 'GET',
        strategyOptions: {
          cacheableResponse: {statuses: [0, 200]},
          cacheName: 'hyperjet-image-cash'
        },
        strategyPlugins: [{
          use: 'Expiration',
          config: {
            maxEntries: 1000,
            maxAgeSeconds: 90*24*60*60,
          }
        }]
      }],
      cacheAssets: false,
    }

  },


  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ]
  }
}
