module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + "/src/temp",
        filename: "app.js"
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