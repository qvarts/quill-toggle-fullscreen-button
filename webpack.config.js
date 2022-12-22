const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';

const config = {
  entry: {
    'quill.toggleFullscreenButton': './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: isProduction,
    library: {
      name: 'QuillToggleFullscreenButton',
      type: 'umd',
      export: 'default',
    },
  },
  devtool: isProduction ? false : 'inline-source-map',
  devServer: {
    host: 'localhost',
    open: {
      app: {
        name: 'firefox',
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      scriptLoading: 'blocking',
      minify: false,
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    // Copy files to example directory
    config.plugins.push(new FileManagerPlugin({
      events: {
        onStart: {
          delete: [
            {
              source: path.resolve(__dirname, 'example'),
              options: {
                force: true,
              },
            }
          ]
        },
        onEnd: {
          move: [
            {
              source: path.resolve(__dirname, 'dist', 'index.html'),
              destination: path.resolve(__dirname, 'example', 'index.html'),
            }
          ],
          copy: [
            {
              source: './dist/**/*.js',
              destination: path.resolve(__dirname, 'example'),
            }
          ],
        },
      },
    }));
  } else {
    config.mode = 'development';
  }
  return config;
};
