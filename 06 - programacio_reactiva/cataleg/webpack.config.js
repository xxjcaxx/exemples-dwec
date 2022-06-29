const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // o production
 entry: './src/index.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist'),
 },
 devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
     
 
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'RxJS en Webpack',
       filename: 'index.html',
       template: 'src/index.html',
    }),
],

 
};


