module.exports = {
    entry: "./app/js/App.js",
    output: {
        path: "./app/build/js",
        filename: "App.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}