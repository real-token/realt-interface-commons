import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Web3Providers, MantineProviders, Layout } from "realt-commons";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ModalsProvider>
        <Web3Providers>
          <MantineProviders>
              {/* <LanguageInit/> */}
              <Layout>
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
  </React.StrictMode>,
)