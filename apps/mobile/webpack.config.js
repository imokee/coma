
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode : "development",
  module: {
    rules: [        
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                }
            },
            exclude: /node_modules/
        },{ test: /\.css$/, use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: false
              }
            }
        ]},
        { test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {}
                }
            ]
        },
        { test: /\.(png|jpg|jpeg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {}
                }
            ]
        }
    ]
  }


};