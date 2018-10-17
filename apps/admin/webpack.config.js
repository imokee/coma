
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode : "development",
  module: {
    rules: [        
        {
            test: /\.vue$/,
            use : [{
                loader: 'vue-loader',
                options: {}
            }, {
                loader: 'iview-loader',
                options: {
                    prefix: false
                }
            }]            
        },{
            test: /\.js$/,
            loader: 'babel-loader'
        },{ test: /\.css$/, use: [
            { loader: 'vue-style-loader' },
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
  },
  plugins: [new VueLoaderPlugin()]


};