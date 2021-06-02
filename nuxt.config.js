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
    height: '3px'
  },
  // loadingIndicator: false,
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/repositories.js', '~/plugins/notifier.js', '~/plugins/axios.js'],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [

    ['@nuxtjs/vuetify', {treeShake: true}],
    // '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
  ],
  optimizedImages: {
    optimizeImages: true
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/localforage',
    '@nuxtjs/universal-storage',
    'nuxt-user-agent',
    'nuxt-leaflet',
  ],
  // ,
  // defaultAssets: undefined,
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: process.env.API_BASE_URL || 'http://localhost:8090/'
    baseURL: process.env.API_BASE_URL || 'https://api.hjet.ir/'
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
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
    , defaultAssets: undefined
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
      orientation: 'portrait',
      icons: [
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          "purpose": "maskable"
        },
        {
          src: "/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          "purpose": "maskable"
        },
        {
          src: "/icons/apple-touch-icon-60x60.png",
          sizes: "60x60",
          type: "image/png"
        },
        {
          src: "/icons/apple-touch-icon-76x76.png",
          sizes: "76x76",
          type: "image/png"
        },
        {
          src: "/icons/apple-touch-icon-120x120.png",
          sizes: "120x120",
          type: "image/png"
        },
        {
          src: "/icons/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png"
        },
        {
          src: "/icons/apple-touch-icon-180x180.png",
          sizes: "180x180",
          type: "image/png"
        },
        {
          src: "/icons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png"
        },
        {
          src: "/icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png"
        },
        {
          src: "/icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          src: "/icons/msapplication-icon-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icons/mstile-150x150.png",
          sizes: "150x150",
          type: "image/png"
        }
      ]
    },
    icon: {
      source: "icon.png",
      purpose: ['maskable', 'apple-touch-icon']
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
      offlineAnalytics: false,

      // Precache
      // preCaching: [],
      cacheOptions: {
        cacheId: "ir.hyperjet",
        directoryIndex: '/',
        revision: 1.004
      },

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
      cacheAssets: true,
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // analyze:true,
    // extractCSS: {
    //   ignoreOrder: true
    // },

    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ],


  }
}
