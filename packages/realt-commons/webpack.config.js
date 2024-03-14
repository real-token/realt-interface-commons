/* eslint-disable @typescript-eslint/no-var-requires */
exports.baseConfig = {
    output: {
        publicPath: "",
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
                options: {
                  modules: true,
                },
            },
        ]
    },
    externals: [
        /^@ethersproject\/.*/
    ],
    resolve: {
        fallback: { 
            "querystring": require.resolve("querystring-es3"),
            net: false,
            tls: false,
            fs: false
        }
    },
}
