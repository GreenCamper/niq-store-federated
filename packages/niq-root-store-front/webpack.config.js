const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
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
      port: 3000,
      open: true,
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
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              'react-hot-loader/babel',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              [
                '@babel/plugin-proposal-private-property-in-object',
                { loose: true },
              ],
              ['@babel/plugin-proposal-private-methods', { loose: true }],
            ],
          },
        },
      ],
    },

    plugins: [
      new webpack.EnvironmentPlugin({ BUILD_DATE: buildDate }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: 'niq-root-store-front-app',
        remotes: {
          LeftNavApp: isProduction
            ? process.env.PROD_LEF_NAV_APP
            : process.env.DEV_LEF_NAV_APP,
          CategoryRendererApp: isProduction
            ? process.env.PROD_CATEGORY_RENDERER_APP
            : process.env.DEV_CATEGORY_RENDERER_APP,
          ProductDetailsApp: isProduction
            ? process.env.PROD_PRODUCT_DETAILS_APP
            : process.env.DEV_PRODUCT_DETAILS_APP,
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
      new ForkTsCheckerWebpackPlugin(),
    ],
  }
}
