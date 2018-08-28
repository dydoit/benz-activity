import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as utils from './utils'

const resolve = dir => path.resolve(__dirname, '..', dir)

const webpackConfig = merge(baseWebpackConfig, {
  output: {
    publicPath: '/game/'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                minimize: process.env.NODE_ENV === 'production',
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new HtmlWebpackPlugin({
      // title: 'Benz',
      template: 'html-withimg-loader!' + './src/index.html'
    }),
    new CleanWebpackPlugin([resolve('dist')], {
      root: resolve('')
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].bundle.css'
    })
  ]
})

export default webpackConfig
