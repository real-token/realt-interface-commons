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
        /^@ethersproject\/.*/,
        'react', 
        'react-dom', 
        '@mantine/core', 
        '@mantine/form', 
        '@mantine/hooks', 
        '@mantine/modals', 
        '@mantine/notifications',
        "@web3-react/coinbase-wallet",
        "@web3-react/core",
        "@web3-react/gnosis-safe",
        "@web3-react/metamask",
        "@web3-react/network",
        "@web3-react/types",
        "@web3-react/walletconnect",
        "@web3-react/walletconnect-v2",
        "i18next",
        "react-i18next"
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
