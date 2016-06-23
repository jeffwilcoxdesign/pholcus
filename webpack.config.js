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
    entry: "./src/js/main/container.js",
    output: {
        path: './www/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
        ]
    }  
}
];