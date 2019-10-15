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
        test: /\.(ts|tsx)$/,
        include: [SRC_PATH, STORIES_PATH],
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    configFileName: './.storybook/tsconfig.json',
                    "ignoreDiagnostics": [7005]
                }
            }
        ]
    });
    config.module.rules.push({
        test: /\.stories\.tsx?$/,
        loaders: [{
            loader: require.resolve('@storybook/source-loader'),
            options: { 
                parser: 'typescript',
            },
        }],
        enforce: 'pre',
    });
    config.resolve.extensions.push('.ts', '.tsx', '.scss', '.css', '.js');
    return config;
};