const path = require("path");

module.exports = function(appdir,appname){
    return {
        mode : "development",
        entry: path.resolve(appdir, 'src/main.js'),  
        output: {
            path: path.resolve(appdir,`${appname}/dist`),
            publicPath : `/${appname}/dist`,
            filename: `${appname}.bundle.js`
        },
        module: {
            rules: [
                { test: /\.css$/, use: [
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
    }
}
