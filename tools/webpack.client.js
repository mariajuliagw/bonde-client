const webpack = require('webpack')
const path = require('path')
// const DashboardPlugin = require('webpack-dashboard/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const sourcePath = path.join(__dirname, './../client/')
const staticsPath = path.join(__dirname, './../public/')

const nodeEnv = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development'
const isProd = nodeEnv === 'production'

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: nodeEnv,
    API_URL: JSON.stringify(process.env.API_URL),
    APP_DOMAIN: JSON.stringify(process.env.APP_DOMAIN),
    PAGARME_KEY: JSON.stringify(process.env.PAGARME_KEY),
    GOOGLE_FONTS_API_KEY: JSON.stringify(process.env.GOOGLE_FONTS_API_KEY),
    '__DEV__': true

  }),
  new webpack.NamedModulesPlugin(),
  new ExtractTextPlugin({filename: '[name].css', allChunks: true})
]

if (isProd) {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
     new AssetsPlugin({ filename: 'assets.json' })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
    // new DashboardPlugin()
    // new Visualizer({
    //     filename: clientName + '.stats.html'
    // })
  )
}

module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: sourcePath,
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  entry: {
    main: './index.js',
    vendor: [
      'react',
      'axios',
      'cpf_cnpj',
      'downloadjs',
      'draft-js',
      'jquery',
      'react-addons-test-utils',
      'react-addons-transition-group',
      'react-color',
      'react-colors-picker',
      'react-cookie',
      'react-document-meta',
      'react-dom',
      'react-ga',
      'react-grid-system',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-s3-uploader',
      'react-test-renderer',
      'redial',
      'redux',
      'redux-form',
      'redux-form-validation',
      'redux-logger',
      'redux-promise',
      'redux-thunk',
      'aphrodite',
      // 'font-awesome',
      // 'xlsx',
      'superagent'
    ]
  },
  output: {
    path: staticsPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/assets'
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
                { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader', query: { sourceMaps: true } }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0', 'react-optimize']
        },
        exclude: /(node_modules|server)/
      },
      {
        test: /\.otf|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
      }, // end otf, woff and woff2 test
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?limit=10000&name=assets/fonts/[name].[ext]'
      }, // end ttf , eot and svg test
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 10000 } // Convert images < 10k to base64 strings
        }]
      }
    ]
  },

  plugins,

  performance: isProd && {
    maxAssetSize: 100,
    maxEntrypointSize: 300,
    hints: 'warning'
  },

  stats: {
    colors: {
      green: '\u001b[32m'
    }
  },

  devServer: {
    contentBase: './client',
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      errorDetails: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
}
