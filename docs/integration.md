# 📋 Guide d'intégration

Guide complet pour intégrer RealT Interface Commons dans votre projet React.

## 🚀 Installation rapide

### 1. Installation du package

```bash
# Avec npm
npm install @realtoken/realt-commons

# Avec yarn
yarn add @realtoken/realt-commons

# Avec pnpm
pnpm add @realtoken/realt-commons
```

### 2. Installation des peer dependencies

```bash
npm install @mantine/core @mantine/form @mantine/hooks @mantine/modals @mantine/notifications i18next react react-dom react-i18next
```

### 3. Import des styles CSS

```typescript
// Dans votre fichier principal (main.tsx ou index.tsx)
import "@mantine/core/styles.css";
```

## 🏗️ Configuration de base

### Structure minimale

```typescript
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RealtProvider,
  Web3Providers,
  MantineProviders,
  LanguageInit,
  ColorSchemeManager,
  initLanguage,
  getConnectors,
  metaMask,
  metaMaskHooks,
} from "@realtoken/realt-commons";
import "@mantine/core/styles.css";
import App from "./App";

// Configuration i18n
const resources = {
  fr: {
    common: {
      loading: "Chargement...",
      error: "Erreur",
    },
  },
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
    },
  },
};

const i18n = initLanguage(resources);

// Configuration Web3
const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
});

// Configuration RealT
const realtConfig = {
  env: "production",
  showAllNetworks: false,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RealtProvider value={realtConfig}>
      <Web3Providers libraryConnectors={libraryConnectors}>
        <MantineProviders>
          <LanguageInit i={i18n} />
          <ColorSchemeManager />
          <App />
        </MantineProviders>
      </Web3Providers>
    </RealtProvider>
  </React.StrictMode>
);
```

### Composant App basique

```typescript
// App.tsx
import { Layout, ChainSelectConfig } from "@realtoken/realt-commons";

const customChains: ChainSelectConfig<any> = {
  allowedChains: [1, 100], // Ethereum et Gnosis
  chainsConfig: {
    1: {
      chainId: 1,
      name: "Ethereum",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.infura.io/v3/YOUR_PROJECT_ID"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
    100: {
      chainId: 100,
      name: "Gnosis Chain",
      nativeCurrency: { name: "xDAI", symbol: "XDAI", decimals: 18 },
      rpcUrls: ["https://rpc.gnosischain.com"],
      blockExplorerUrls: ["https://gnosisscan.io"],
    },
  },
  defaultChainId: 100,
};

const website = {
  name: "Mon App RealT",
  url: "https://monapp.com",
  comingSoon: false,
};

function App() {
  return (
    <Layout newWebsite={website} chains={customChains}>
      <div style={{ padding: "2rem" }}>
        <h1>Bienvenue dans votre app RealT !</h1>
        <p>Votre application est maintenant prête.</p>
      </div>
    </Layout>
  );
}

export default App;
```

## ⚙️ Configuration avancée

### Configuration complète avec tous les connecteurs

```typescript
// config/web3.ts
import {
  getConnectors,
  metaMask,
  metaMaskHooks,
  gnosisSafe,
  gnosisHooks,
  getWalletConnectV2,
  getReadOnlyConnector,
  parseAllowedChain,
} from "@realtoken/realt-commons";

export enum ChainsID {
  Ethereum = 1,
  Gnosis = 100,
  Polygon = 137,
}

export const CHAIN_CONFIG = {
  [ChainsID.Ethereum]: {
    chainId: 1,
    name: "Ethereum",
    shortName: "ETH",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
      `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
    ],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  [ChainsID.Gnosis]: {
    chainId: 100,
    name: "Gnosis Chain",
    shortName: "GNO",
    nativeCurrency: {
      name: "xDAI",
      symbol: "XDAI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.gnosischain.com"],
    blockExplorerUrls: ["https://gnosisscan.io"],
  },
  [ChainsID.Polygon]: {
    chainId: 137,
    name: "Polygon",
    shortName: "MATIC",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
};

export const customChains = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CHAIN_CONFIG,
  defaultChainId: ChainsID.Gnosis,
};

// Setup des connecteurs
export function setupConnectors() {
  const env = process.env.NODE_ENV;
  const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!;
  const showAllNetworks = process.env.REACT_APP_SHOW_ALL_NETWORKS === "true";

  const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(
    customChains,
    env,
    projectId,
    showAllNetworks
  );

  const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

  return getConnectors({
    metamask: [metaMask, metaMaskHooks],
    gnosisSafe: [gnosisSafe, gnosisHooks],
    walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
    readOnly: [readOnly, readOnlyHooks],
  });
}
```

### Configuration i18n complète

```typescript
// config/i18n.ts
import { initLanguage } from "@realtoken/realt-commons";

export const resources = {
  fr: {
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
    navigation: {
      home: "Accueil",
      dashboard: "Tableau de bord",
      portfolio: "Portfolio",
    },
    wallet: {
      connect: "Connecter le portefeuille",
      disconnect: "Déconnecter",
      connecting: "Connexion en cours...",
    },
  },
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    navigation: {
      home: "Home",
      dashboard: "Dashboard",
      portfolio: "Portfolio",
    },
    wallet: {
      connect: "Connect Wallet",
      disconnect: "Disconnect",
      connecting: "Connecting...",
    },
  },
  es: {
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      confirm: "Confirmar",
      cancel: "Cancelar",
    },
    navigation: {
      home: "Inicio",
      dashboard: "Panel",
      portfolio: "Cartera",
    },
    wallet: {
      connect: "Conectar Wallet",
      disconnect: "Desconectar",
      connecting: "Conectando...",
    },
  },
};

export const i18n = initLanguage(resources, {
  fallbackLng: "fr",
  debug: process.env.NODE_ENV === "development",
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    lookupLocalStorage: "realt-language",
    caches: ["localStorage"],
  },
});
```

## 🔧 Variables d'environnement

### Fichier .env

```bash
# .env
REACT_APP_ENV=production
REACT_APP_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
REACT_APP_SHOW_ALL_NETWORKS=false

# Development
# REACT_APP_ENV=development
# REACT_APP_SHOW_ALL_NETWORKS=true
```

### Validation des variables

```typescript
// utils/env.ts
function validateEnvironment() {
  const requiredVars = [
    "REACT_APP_WALLETCONNECT_PROJECT_ID",
    "REACT_APP_INFURA_PROJECT_ID",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missing.join(", ")}`
    );
  }
}

// Appeler au démarrage
validateEnvironment();
```

## 📱 Configuration responsive

### Layout adaptatif

```typescript
import { useMediaQuery } from "@mantine/hooks";
import { Layout } from "@realtoken/realt-commons";

function ResponsiveApp() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Layout
      newWebsite={website}
      chains={customChains}
      disabledWrongNetworkBanner={isMobile} // Masquer sur mobile
      headerNav={isMobile ? <MobileNav /> : <DesktopNav />}
    >
      <AppContent />
    </Layout>
  );
}
```

## 🎨 Personnalisation du thème

### Thème personnalisé

```typescript
// theme/custom.ts
import { createTheme, mergeMantineTheme } from "@mantine/core";
import { theme as realtTheme } from "@realtoken/realt-commons";

const customTheme = createTheme({
  colors: {
    brand: [
      "#fff3e0",
      "#ffe0b2",
      "#ffcc02",
      "#ffb300",
      "#ff9800", // Couleur principale
      "#f57c00",
      "#ef6c00",
      "#e65100",
      "#d84315",
      "#bf360c",
    ],
  },
  primaryColor: "brand",
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
  },
});

export const mergedTheme = mergeMantineTheme(realtTheme, customTheme);
```

### Application du thème personnalisé

```typescript
import { MantineProvider } from "@mantine/core";
import { mergedTheme } from "./theme/custom";

function AppWithCustomTheme() {
  return (
    <MantineProvider theme={mergedTheme}>
      {/* Remplace MantineProviders */}
      <YourApp />
    </MantineProvider>
  );
}
```

## 🧪 Configuration de tests

### Setup Jest

```typescript
// setupTests.ts
import "@testing-library/jest-dom";

// Mock Web3
global.ethereum = {
  isMetaMask: true,
  request: jest.fn(),
};

// Mock i18n
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "fr", changeLanguage: jest.fn() },
  }),
}));
```

### Test d'intégration

```typescript
// App.test.tsx
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MantineProvider } from "@mantine/core";
import { theme } from "@realtoken/realt-commons";
import { i18n } from "./config/i18n";
import App from "./App";

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </I18nextProvider>
  );
}

test("renders app correctly", () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );

  expect(screen.getByText(/bienvenue/i)).toBeInTheDocument();
});
```

## 🔄 Migration d'un projet existant

### Étapes de migration

1. **Installer RealT Commons**

```bash
npm install @realtoken/realt-commons
```

2. **Remplacer les composants existants**

```typescript
// Avant
import { Button } from "./components/Button";

// Après
import { Button } from "@mantine/core";
```

3. **Migrer les styles**

```typescript
// Supprimer les anciens styles
// Importer les styles Mantine
import "@mantine/core/styles.css";
```

4. **Adapter la configuration Web3**

```typescript
// Remplacer votre provider Web3 existant
import { Web3Providers } from "@realtoken/realt-commons";
```

### Script de migration

```bash
#!/bin/bash
# migrate.sh

echo "Migration vers RealT Commons..."

# Sauvegarder les composants existants
mkdir -p backup/components
cp -r src/components/* backup/components/

# Installer les dépendances
npm install @realtoken/realt-commons @mantine/core @mantine/hooks

# Supprimer les anciens styles
rm -rf src/styles/components

echo "Migration terminée. Vérifiez backup/ pour vos anciens composants."
```

## 📦 Build et déploiement

### Configuration Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["@realtoken/realt-commons"],
  },
});
```

### Build optimisé

```bash
# Build pour production
npm run build

# Analyse du bundle
npm install --save-dev rollup-plugin-visualizer
```

## 🚀 Déploiement

### Variables d'environnement de production

```bash
# Production
REACT_APP_ENV=production
REACT_APP_WALLETCONNECT_PROJECT_ID=prod_project_id
REACT_APP_INFURA_PROJECT_ID=prod_infura_id
REACT_APP_SHOW_ALL_NETWORKS=false
```

### Checklist pré-déploiement

- ✅ Variables d'environnement configurées
- ✅ Thème personnalisé appliqué
- ✅ Traductions complètes
- ✅ Tests passent
- ✅ Bundle optimisé
- ✅ Métadonnées SEO configurées

## 🐛 Troubleshooting

### Erreurs courantes

**1. Erreur de peer dependencies**

```bash
npm install --legacy-peer-deps
```

**2. Conflit de styles CSS**

```typescript
// Importer dans le bon ordre
import "@mantine/core/styles.css";
import "./your-custom-styles.css";
```

**3. Erreur Web3**

```typescript
// Vérifier les variables d'environnement
console.log(
  "WalletConnect ID:",
  process.env.REACT_APP_WALLETCONNECT_PROJECT_ID
);
```

**4. Erreur de traduction**

```typescript
// Vérifier la structure des ressources
console.log("Resources:", resources);
```

### Debug mode

```typescript
// Activer le debug en développement
const realtConfig = {
  env: "development",
  showAllNetworks: true,
  debugMode: process.env.NODE_ENV === "development",
};
```

## 📚 Ressources supplémentaires

- [Documentation Mantine](https://mantine.dev/)
- [Web3-React Guide](https://github.com/NoahZinsmeister/web3-react)
- [i18next Documentation](https://www.i18next.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 💡 Conseils de performance

✅ **Lazy loading** des composants lourds
✅ **Memoization** des calculs coûteux  
✅ **Bundle splitting** pour optimiser le chargement
✅ **Tree shaking** pour réduire la taille
❌ **Éviter** les re-renders inutiles
❌ **Ne pas** charger toutes les traductions en une fois
