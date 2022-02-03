// const data =  require('./src/MainAppData');
// const  data = fetch('https://micro-frontends-api.vercel.app/api/main-app-api').then(response => response.json());
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  cache: false,
  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'MainApp',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/RemoteWrapper',
      },
      // remotes: {
      //   App1: new Promise(resolve => resolve(fetch('https://micro-frontends-api.vercel.app/api/main-app-api').then(response => console.log(response.json()).remotes.App1))),
      //   App2: 'App2@http://localhost:3002/remoteEntry.js',
      // },
      
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
