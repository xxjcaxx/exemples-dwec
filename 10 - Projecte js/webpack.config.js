const path = require('path');

module.exports = {
  mode: 'development', // o production
 entry: './src/index.js',
 output: {
   filename: 'main.js',
   path: path.resolve(__dirname, 'dist'),
 },
 devServer: {
    static: './dist',
  },
 module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
      },
 
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
 
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          },
      
        ]
      }
    ]
  }
 
};
