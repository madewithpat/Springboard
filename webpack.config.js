module.exports = {
    entry: "./src/js/App.js",
    output: {
        path: __dirname + "/dist",
        filename: "App.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}