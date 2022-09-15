const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

// This line load .env.development into running process
require('dotenv').config({ path: __dirname + '/.env.development' })

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      src: path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic'
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less|\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  theme: 'his'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|jpg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader',
        options: {
          limit: imageInlineSizeLimit,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: [
          {
            loader: 'source-map-loader',
            options: {
              filterSourceMappingUrl: (url, resourcePath) => {
                if (/.*\/node_modules\/.*/.test(resourcePath)) {
                  return false
                }
                return true
              }
            }
          }
        ]
      }
      // // "file" loader makes sure those assets get served by WebpackDevServer.
      // // When you `import` an asset, you get its (virtual) filename.
      // // In production, they would get copied to the `build` folder.
      // // This loader doesn't use a "test" so it will catch all modules
      // // that fall through the other loaders.
      // {
      //   loader: require.resolve('file-loader'),
      //   // Exclude `js` files to keep "css" loader working as it injects
      //   // its runtime that would otherwise be processed through "file" loader.
      //   // Also exclude `html` and `json` extensions so they get processed
      //   // by webpacks internal loaders.
      //   exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
      //   options: {
      //     name: 'static/media/[name].[hash:8].[ext]',
      //   },
      // },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public', 'index.html'),
      paths: {
        publicURL: ''
      }
    }),
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new Dotenv({
      path: path.resolve(__dirname, '.env.development'),
      safe: path.resolve(__dirname, '.env.development.example'),
      defaults: path.resolve(__dirname, '.env.development.defaults'),
      systemvars: true
    }),
    new webpack.DefinePlugin({
      'process.env.UI3_THEME':
        JSON.stringify(process.env.UI3_THEME) || JSON.stringify('his')
    })
  ],
  devServer: {
    historyApiFallback: true,
    // clientLogLevel: 'silent',
    host: '0.0.0.0',
    stats: 'minimal',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 8080,
    contentBase: path.join(__dirname, '/public'),
    disableHostCheck: true
  }
}
