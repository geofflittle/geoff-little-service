const path = require("path");

module.exports = {
    mode: "production",
    // devtool: "source-map",
    entry: {
        connect: path.resolve(__dirname, "src", "connect.ts"),
        disconnect: path.resolve(__dirname, "src", "disconnect.ts"),
        helloWorld: path.resolve(__dirname, "src", "helloWorld.ts"),
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "awesome-typescript-loader" }
        ]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [ ".ts", ".js", ".json" ]
    }
};
