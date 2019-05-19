const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    // TODO: Make these dependent on template.yaml
    entry: {
        ['connect/connect']: path.resolve(__dirname, "src", "connect.ts"),
        ['disconnect/disconnect']: path.resolve(__dirname, "src", "disconnect.ts"),
        ['sendWord/sendWord']: path.resolve(__dirname, "src", "sendWord.ts"),
    },
    target: "node",
    module: {
        rules: [
            { test: /\.ts?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: "[name].js",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [ ".ts", ".js", ".json" ]
    }
};
