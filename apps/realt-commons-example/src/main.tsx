import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initLanguage } from "realt-commons";
import { Web3Providers, MantineProviders, Layout, LanguageInit } from "realt-commons";
import { ModalsProvider } from "@mantine/modals";

const i18n = initLanguage();

console.log("i18n: ", i18n)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ModalsProvider>
        <Web3Providers>
          <MantineProviders>
              <LanguageInit i={i18n}/>
              <Layout>
                <App />
              </Layout>
          </MantineProviders>
        </Web3Providers>
      </ModalsProvider>
  </React.StrictMode>,
)