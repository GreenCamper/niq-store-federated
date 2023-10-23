
const webpack = require('webpack')dependencies
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const buildDate = new Date().toLocaleString()

module.exports = (env, argv) => {
  return {
    entry: './src/index.ts',
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
    ],
  }
}
