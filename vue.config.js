// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 9555 // TODO: get this variable from setting.ts
const mockServerPort = 9555 // TODO: get this variable from setting.ts
const name = '智慧医院云HIS' // TODO: get this variable from setting.ts
//添加时间戳
const TimeServestamp = new Date().getTime()

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/his/' : '/',
  // publicPath: '/master',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  //解决打包缓存问题
  configureWebpack: {
    output: {
      filename: `js/[name].${TimeServestamp}.js`,
      chunkFilename: `js/[name].${TimeServestamp}.js`,
    },
  },
  devServer: {
    hot: true,
    disableHostCheck: true,
    port: devServerPort,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/hisapi': {
        target: 'http://192.168.102.252/hisapi',
        // target: `${webUrl}/hisapi`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/hisapi': '',
        },
      },
      '/op-service': {
        target: 'http://220.196.249.90:86/op-service',
        // target: 'http://192.168.169.63:8501/op-service', // wy
        // target: 'http://192.168.169.58:8501/op-service',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/op-service': '',
        },
      },
      '/system-service': {
        target: 'http://220.196.249.90:86/system-service',
        // target: 'http://192.168.169.63:8501/op-service', // wy
        // target: 'http://192.168.169.58:8501/op-service',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/system-service': '',
        },
      },
      '/drug-service': {
        target: 'http://220.196.249.90:86/drug-service',
        // target: 'http://192.168.169.59:8491', // 方舟
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/drug-service': '',
        },
      },
      '/im-service': {
        target: 'http://220.196.249.90:86/im-service',
        // target: 'http://192.168.169.59:8491/im-service', // 方舟
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/im-service': '',
        },
      },
      '/mtdms-service': {
        target: 'http://220.196.249.90:86/mtdms-service',
        // target: 'http://192.168.169.63:8471/mtdms-service', // wangyang
        // target: 'http://192.168.0.158:8471', // zz
        // target: 'http://localhost:8586/op-service', // zz
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/mtdms-service': '',
        },
      },
      '/mrms-service': {
        target: 'http://220.196.249.90:86/mrms-service',
        // target: 'http://192.168.169.54:8541/mrms-service', // weijing
        // target: 'http://192.168.0.71:8586', // zz
        // target: 'http://localhost:8586/hisapi', // zz
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/mrms-service': '',
        },
      },
      '/ybapi-service': {
        target: 'http://220.196.249.90:86/ybapi-service',
        // target: 'http://192.168.1.137:8586', // wangyang
        // target: 'http://192.168.0.71:8586', // zz
        // target: 'http://localhost:8586/hisapi', // zz
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/ybapi-service': '',
        },
      },
      '/mms-service': {
        target: 'http://220.196.249.90:86/mms-service',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/mms-service': '',
        },
      },
      '/prereview-service': {
        target: 'http://220.196.249.90:86/prereview-service',
        // target: 'http://192.168.169.59:8491', // 方舟
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/prereview-service': '',
        },
      },
      '/dic': {
        target: 'http://192.168.102.252/dic',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/dic': '',
        },
      },
      '/design': {
        target: 'http://192.168.102.252/design',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/design': '',
        },
      },
      '/nurseapi': {
        target: 'http://192.168.102.252/nurseapi',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/nurseapi': '',
        },
      },
      '/im-service': {
        target: 'http://220.196.249.90:86/im-service',
        // target: 'http://192.168.169.59:8491/im-service', // 方舟
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          '^/im-service': '',
        },
      },
    },
  },
  pwa: {
    name: name,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js'),
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/styles/_variables.scss'), path.resolve(__dirname, 'src/styles/_mixins.scss')],
    },
  },
  chainWebpack(config) {

    config.module
      .rule('image')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-eval-source-map'))

    // remove vue-cli-service's progress output
    config.plugins.delete('progress')
    // replace with another progress output plugin to solve the this bug:
    // https://github.com/vuejs/vue-cli/issues/4557
    config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
      {
        format: 'compact',
      },
    ])

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
}
