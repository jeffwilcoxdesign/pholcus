module.exports = [
{
    entry: "./src/js/preloader/main.js",
    output: {
        path: './www/js',
        filename: "preloader.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
        ]
    }
},
{
    entry: "./src/js/content/main.js",
    output: {
        path: './www/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },

        ]
    }
}
];