import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'pathe';
import svgr from '@svgr/rollup' ;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
        insertTypesEntry: true,
    })
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
            'react', 'react-dom', '@mantine/core', '@mantine/form', '@mantine/hooks', 
            '@mantine/modals', '@mantine/notifications'
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
                '@mantine/notifications': 'mantineNotifications'
            },
        },
    },
},
})
