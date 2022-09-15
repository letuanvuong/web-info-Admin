const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

// This line load .env.production into running process
require('dotenv').config({ path: __dirname + '/.env.production' })

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: `${process.env.APP_BASENAME_PATH}/`
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
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
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      src: path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          filter: async (resourcePath) => {
            if (resourcePath !== path.resolve('public/index.html')) return true
            return false
          }
          // to: './'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      paths: {
        publicURL: process.env.APP_BASENAME_PATH
      }
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   async: false
    // }),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx']
    // }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '.env.production'),
      safe: path.resolve(__dirname, '.env.production.example'),
      systemvars: true
    }),
    new webpack.DefinePlugin({
      'process.env.UI3_THEME':
        JSON.stringify(process.env.UI3_THEME) || JSON.stringify('his')
    })
  ]
}
