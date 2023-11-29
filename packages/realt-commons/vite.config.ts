import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'pathe';
import svgr from '@svgr/rollup' ;
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        dts({
            insertTypesEntry: true,
        }),
        cssInjectedByJsPlugin()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'realt-commons',
            formats: ['es', 'umd'],
            fileName: 'realt-commons'
        },
        rollupOptions: {
            external: [
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
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'styled-components': 'styled',
                    '@mantine/core': 'mantineCore', 
                    '@mantine/form': 'mantineForm', 
                    '@mantine/hooks': 'mantineHooks', 
                    '@mantine/modals': 'mantineModals', 
                    '@mantine/notifications': 'mantineNotifications',
                    "@web3-react/coinbase-wallet": "web3ReactCoinbaseWallet",
                    "@web3-react/core": "web3ReactCore",
                    "@web3-react/gnosis-safe": "web3ReactGnosisSafe",
                    "@web3-react/metamask": "web3ReactMetamask",
                    "@web3-react/network": "web3ReactNetwork",
                    "@web3-react/types": "web3ReactTypes",
                    "@web3-react/walletconnect": "web3ReactWalletConnect",
                    "@web3-react/walletconnect-v2": "web3ReactWalletConnectV2",
                    "i18next": "i18next",
                    "react-i18next": "reactI18next"
                },
            },
        },
    },
})
