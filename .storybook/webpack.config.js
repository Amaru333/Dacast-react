const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../src/stories');
//dont need stories path if you have your stories inside your //components folder
module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    });
    config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'babel-loader',
        include: [SRC_PATH, STORIES_PATH],
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
    });
    config.module.rules.push({
        test: /\.stories\.tsx?$/,
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
    });
    config.module.rules.push({
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
    },);
    
    config.resolve.extensions.push('.ts', '.tsx', '.scss', '.css', '.js');
    return config;
};