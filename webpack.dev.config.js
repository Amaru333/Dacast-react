const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC = path.resolve(__dirname, 'public/assets/');

var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const entries = {
    app: ['@babel/polyfill', './src/app/index.tsx'],
    admin: ['@babel/polyfill', './src/admin/index.tsx'],
    vendor: ['react', 'react-dom']
}

const plugins = {
    app: { 
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/app', 'index.html'),
        excludeAssets: [/admin.*/]
    },
    admin: { 
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/admin', 'admin.html'),
        excludeAssets: [/app.*/]
    }
}

const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

module.exports = {
    entry: entries[process.env.APP_ENV],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "browsers": ["last 2 versions", "ie >= 11"],
                                },
                            }
                        ],
                        "@babel/preset-react"
                    ]
                }
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ttf|eot|svg|otf|gif|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: SRC,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({...plugins[process.env.APP_ENV]}),
        new webpack.DefinePlugin(envKeys),
        new HtmlWebpackExcludeAssetsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: './public/iframe', to: './public/iframe' },
        ], { copyUnmodified: true }
        )
    ]
}