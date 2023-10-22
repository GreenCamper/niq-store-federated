const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const deps = require('./package.json').dependencies
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
require('dotenv').config({ path: './.env' })
const buildDate = new Date().toLocaleString()

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    entry: './src/index.ts',
    mode: 'development',
    devServer: {
      port: 3003,
      open: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@mui/styled-engine': '@mui/styled-engine-sc',
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.paths.json',
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: 'ProductDetailsApp',
        filename: 'remoteEntry.js',
        exposes: {
          // exposes each component
          './ProductDetails': './src/components/ProductDetails',
        },
        shared: {
          ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-router-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  }
}
