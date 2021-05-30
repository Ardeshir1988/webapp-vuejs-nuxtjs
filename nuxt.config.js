const webpack = require('webpack')
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',
  mode: 'universal', // or 'spa'
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
    ],
    // link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    // ],

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/main.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/repositories.js', '~/plugins/notifier.js', '~/plugins/axios.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
  ],
  optimizedImages: {
    optimizeImages: true
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
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
      short_name: 'HyperJet',
      lang: 'en',
      description: 'Hyper Jet online shopping',
      background_color: '#FFFFFF',
      ogImage: 'hyperjet-icon.png',
      start_url: "/",
      icons: [
        {
          src: "/icons/ic_hjet_64.png",
          sizes: "64x64",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_120.png",
          sizes: "120x120",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_152.png",
          sizes: "152x152",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/icons/ic_hjet_512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],

      display: "fullscreen",
      orientation: "portrait"
    },
    workbox: {
      debug: false,
      dev: false,
      cacheId: 'ir.hyperjet',
      directoryIndex: '/',
      revision: 1.1002,
      runtimeCaching: [

        {
          urlPattern: 'https://api.hjet.ir/files/.*',
        handler: 'CacheFirst',
         method: 'GET',
          strategyOptions: {
            cacheName: 'our-image-cash',
          },
          strategyPlugins: [{
            use: 'Expiration',
            config: {
              maxEntries: 100000000,
              maxAgeSeconds: 300000000000
            }
          }]
        }
      ],
      cacheAssets: true, // for /*
      // offline: true // for /_nuxt/*
    }
  },
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' }
  ],
  link: [
    // { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
    // apple

    { rel:'apple-touch-icon', sizes:'180x180', href:'apple-icon-180.png' },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2048-2732.jpg',
    //   media:'(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2732-2048.jpg',
    //   media:'(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1668-2388.jpg',
    //   media:'(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1536-2048.jpg',
    //   media:'(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2048-1536.jpg',
    //   media:'(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1668-2224.jpg',
    //   media:'(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2224-1668.jpg',
    //   media:'(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1620-2160.jpg',
    //   media:'(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2160-1620.jpg',
    //   media:'(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1284-2778.jpg',
    //   media:'(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2778-1284.jpg',
    //   media:'(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1170-2532.jpg',
    //   media:'(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2532-1170.jpg',
    //   media:'(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1125-2436.jpg',
    //   media:'(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2436-1125.jpg',
    //   media:'(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2688-1242.jpg',
    //   media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1242-2688.jpg',
    //   media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-828-1792.jpg',
    //   media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1792-828.jpg',
    //   media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1242-2208.jpg',
    //   media:'(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-2208-1242.jpg',
    //   media:'(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
    // },
    //
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-750-1334.jpg',
    //   media:'(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1334-750.jpg',
    //   media:'(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-640-1136.jpg',
    //   media:'(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
    // },
    //
    // {
    //   rel:'apple-touch-startup-image', href:'/static/apple-splash-1136-640.jpg',
    //   media:'(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
    // },
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl'
      })
    ],
  }
}
