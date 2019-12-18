import * as HtmlWebPackPlugin from 'html-webpack-plugin';
import * as DotEnv from 'dotenv';
import * as path from 'path';
import { DefinePlugin } from 'webpack';

/* HTML Plugin */
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/launch/index.html'
});

/* Environment Vars plugin */
const env = DotEnv.config().parsed;
const envKeys = Object.keys(env).reduce((prev: any, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});
const envPlugin = new DefinePlugin(envKeys)

/* Exports */
module.exports = {
    mode: 'development',
    entry: './src/launch/index.tsx',
    resolve: {
        /* Add '.ts' and '.tsx' as resolvable extensions. */
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            /**
             * All files with a '.ts' or '.tsx' extension will be
             * handled by 'awesome-typescript-loader'.
             */
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [htmlPlugin, envPlugin],
    devServer: {
        historyApiFallback: true
    }
};
