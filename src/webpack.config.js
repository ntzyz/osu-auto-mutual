module.exports = {
    entry: './main.js',
    output: {
        path: `${__dirname}/../static/`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    }
};