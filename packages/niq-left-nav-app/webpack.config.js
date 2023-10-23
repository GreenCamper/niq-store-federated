const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const deps = require('./package.json').dependencies
require('dotenv').config({ path: './.env' })
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const buildDate = new Date().toLocaleString()

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    entry: './src/index.ts',
    mode: process.env.NODE_ENV || 'development',
    devServer: {
      port: 3001,
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
        name: 'LeftNavApp',
        filename: 'remoteEntry.js',
        exposes: {
          // exposes each component
          './LeftNav': './src/components/LeftNav.tsx',
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
          'niq-store-shared-lib': {
            import: 'niq-store-shared-lib',
            requiredVersion: require('../niq-store-shared-lib/package.json')
              .version,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  }
}
