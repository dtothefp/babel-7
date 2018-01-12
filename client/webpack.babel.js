import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const base = path.resolve.bind(path, __dirname);

const styleLoader = {
  loader: 'style-loader'
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ])
  }
};

const cssLoader = ({local} = {}) => {
  const options = local ?
    {
      sourceMap: true,
      importLoaders: 1,
      modules: true,
      camelCase: true,
      localIdentName: '[name]_[local]_[hash:base64:5]',
      minimize: false
    } :
    {
      sourceMap: true,
      importLoaders: 1,
      minimize: false
    };

  return {
    loader: 'css-loader',
    options
  };
};

export default {
  entry: ['./src/js/app.js'],
  output: {
    path: base('dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: 66
                }
              }],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: base('src', 'js'),
        use: [
          styleLoader,
          cssLoader({local: true}),
          postCssLoader
        ]
      },
      {
        test: /\.css$/,
        include: base('src', 'css'),
        use: [
          styleLoader,
          cssLoader(),
          postCssLoader
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/templates/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0'
  }
};
