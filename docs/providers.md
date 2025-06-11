# 🔧 Configuration et Providers

RealT Commons utilise plusieurs providers pour orchestrer l'état global, la gestion des thèmes, l'internationalisation et les fonctionnalités Web3.

## 🏗️ Architecture des Providers

### Hiérarchie recommandée

```typescript
import {
  RealtProvider,
  Web3Providers,
  MantineProviders,
  LanguageInit,
  ColorSchemeManager,
} from "@realtoken/realt-commons";

function App() {
  return (
    <RealtProvider value={realtConfig}>
      <Web3Providers libraryConnectors={libraryConnectors}>
        <MantineProviders>
          <LanguageInit i={i18n} />
          <ColorSchemeManager />
          {/* Votre application */}
        </MantineProviders>
      </Web3Providers>
    </RealtProvider>
  );
}
```

## 🎯 RealtProvider

Provider principal pour la configuration globale de l'application.

### Configuration de base

```typescript
import { RealtProvider, useRootStore } from "@realtoken/realt-commons";

const realtConfig = {
  env: "production", // ou "development"
  showAllNetworks: true,
  disabledWrongNetworkBanner: false,
};

function App() {
  return (
    <RealtProvider value={realtConfig}>
      <MyApplication />
    </RealtProvider>
  );
}
```

### Store Zustand intégré

Le `RealtProvider` utilise Zustand pour la gestion d'état globale :

```typescript
// Définition du store (interne)
type RealtProviderStoreProps = {
  // État configurable
  env?: string;
  showAllNetworks?: boolean;
  disabledWrongNetworkBanner?: boolean;

  // État interne
  storeLoaded: boolean;
  connectors: ConnectorsMap | undefined;

  // Actions
  setShowAllNetworks: (state: boolean) => void;
  setStoreLoaded: (state: boolean) => void;
  setConnectors: (connectors: ConnectorsMap) => void;
  setValue: (value: RealtProviderSetableProps) => void;
};
```

### Utilisation du store

```typescript
import { useRootStore } from "@realtoken/realt-commons";

function ConfigDisplay() {
  const [env, showAllNetworks, setShowAllNetworks] = useRootStore((state) => [
    state.env,
    state.showAllNetworks,
    state.setShowAllNetworks,
  ]);

  return (
    <div>
      <p>Environnement : {env}</p>
      <label>
        <input
          type="checkbox"
          checked={showAllNetworks}
          onChange={(e) => setShowAllNetworks(e.target.checked)}
        />
        Afficher tous les réseaux
      </label>
    </div>
  );
}
```

## 🎨 MantineProviders

Provider pour la configuration de l'interface utilisateur avec Mantine.

### Configuration automatique

```typescript
import { MantineProviders } from "@realtoken/realt-commons";

function App() {
  return (
    <MantineProviders>
      {/* Le thème RealT est automatiquement appliqué */}
      {/* ModalsProvider et NotificationsProvider inclus */}
      <YourApp />
    </MantineProviders>
  );
}
```

### Contenu du MantineProviders

Le provider inclut automatiquement :

```typescript
// Équivalent interne
function MantineProviders({ children }) {
  return (
    <MantineProvider theme={realtTheme}>
      <ModalsProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
```

### Personnalisation du thème

```typescript
import { MantineProvider, mergeMantineTheme } from "@mantine/core";
import { theme as realtTheme } from "@realtoken/realt-commons";

const customTheme = mergeMantineTheme(realtTheme, {
  colors: {
    myBrand: [
      "#fff3e0",
      "#ffe0b2",
      "#ffcc02",
      // ... autres couleurs
    ],
  },
  primaryColor: "myBrand",
});

function AppWithCustomTheme() {
  return (
    <MantineProvider theme={customTheme}>
      <ModalsProvider>
        <NotificationsProvider>
          <YourApp />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
```

## 🌐 Web3Providers

Provider pour l'intégration blockchain et wallets.

### Configuration complète

```typescript
import {
  Web3Providers,
  getConnectors,
  metaMask,
  metaMaskHooks,
  gnosisSafe,
  gnosisHooks,
  getWalletConnectV2,
  getReadOnlyConnector,
} from "@realtoken/realt-commons";

// Configuration des connecteurs
const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(
  customChains,
  process.env.NODE_ENV,
  process.env.REACT_APP_WALLETCONNECT_PROJECT_ID!,
  true
);

const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks],
});

function App() {
  return (
    <Web3Providers libraryConnectors={libraryConnectors}>
      <YourWeb3App />
    </Web3Providers>
  );
}
```

### Reconnexion automatique

Le provider gère la reconnexion automatique :

```typescript
// Code interne du Web3Providers
const ConnectEagerly = ({ connectors }) => {
  const lastUsedProvider = useAtomValue(providerAtom);

  useEffect(() => {
    if (!lastUsedProvider) return;
    tryEagerlyConnect(connectors, lastUsedProvider);
  }, [lastUsedProvider]);

  return null;
};
```

## 🗣️ LanguageInit

Provider pour l'initialisation de l'internationalisation.

### Configuration i18next

```typescript
import { LanguageInit, initLanguage } from "@realtoken/realt-commons";
import { resources } from "./i18next/locales";

// Initialisation d'i18next
export const i18n = initLanguage(resources);

function App() {
  return (
    <LanguageInit i={i18n}>
      <YourApp />
    </LanguageInit>
  );
}
```

### Structure des ressources

```typescript
// ./i18next/locales/index.ts
export const resources = {
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      confirm: "Confirm",
      cancel: "Cancel",
    },
    header: {
      connect: "Connect Wallet",
      disconnect: "Disconnect",
    },
  },
  fr: {
    common: {
      loading: "Chargement...",
      error: "Erreur",
      confirm: "Confirmer",
      cancel: "Annuler",
    },
    header: {
      connect: "Connecter Wallet",
      disconnect: "Déconnecter",
    },
  },
  es: {
    common: {
      loading: "Cargando...",
      error: "Error",
      confirm: "Confirmar",
      cancel: "Cancelar",
    },
    header: {
      connect: "Conectar Wallet",
      disconnect: "Desconectar",
    },
  },
};
```

## ⚡ État global avec Jotai

### Atoms disponibles

```typescript
import { useAtom } from "jotai";
import { providerAtom } from "@realtoken/realt-commons";

function ProviderManager() {
  const [lastProvider, setLastProvider] = useAtom(providerAtom);

  const saveProvider = (providerName: string) => {
    setLastProvider(providerName);
    // Automatiquement sauvegardé pour la reconnexion
  };

  return (
    <div>
      <p>Dernier provider utilisé : {lastProvider || "Aucun"}</p>
      <button onClick={() => saveProvider("metamask")}>
        Sauvegarder MetaMask
      </button>
    </div>
  );
}
```

## 🔄 Gestion des environnements

### Variables d'environnement

```bash
# .env.production
REACT_APP_ENV=production
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id
REACT_APP_SHOW_ALL_NETWORKS=true

# .env.development
REACT_APP_ENV=development
REACT_APP_WALLETCONNECT_PROJECT_ID=your_project_id
REACT_APP_SHOW_ALL_NETWORKS=true
```

### Configuration conditionnelle

```typescript
const getEnvironmentConfig = () => {
  const env = process.env.REACT_APP_ENV || "development";
  const showAllNetworks = process.env.REACT_APP_SHOW_ALL_NETWORKS === "true";

  return {
    env,
    showAllNetworks,
    disabledWrongNetworkBanner: env === "development",
  };
};

function App() {
  const config = getEnvironmentConfig();

  return (
    <RealtProvider value={config}>
      <RestOfYourApp />
    </RealtProvider>
  );
}
```

## 🏗️ Configuration avancée

### Provider personnalisé

```typescript
import { createContext, useContext, ReactNode } from "react";

interface AppConfigContextType {
  apiUrl: string;
  debugMode: boolean;
  features: {
    staking: boolean;
    governance: boolean;
  };
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(
  undefined
);

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const config: AppConfigContextType = {
    apiUrl: process.env.REACT_APP_API_URL || "https://api.realt.community",
    debugMode: process.env.NODE_ENV === "development",
    features: {
      staking: process.env.REACT_APP_FEATURE_STAKING === "true",
      governance: process.env.REACT_APP_FEATURE_GOVERNANCE === "true",
    },
  };

  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
}

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error("useAppConfig must be used within AppConfigProvider");
  }
  return context;
};
```

### Composition complète avec provider personnalisé

```typescript
function App() {
  return (
    <RealtProvider value={realtConfig}>
      <AppConfigProvider>
        <Web3Providers libraryConnectors={libraryConnectors}>
          <MantineProviders>
            <LanguageInit i={i18n} />
            <ColorSchemeManager />
            <Layout {...layoutProps}>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </Router>
            </Layout>
          </MantineProviders>
        </Web3Providers>
      </AppConfigProvider>
    </RealtProvider>
  );
}
```

## 🔧 Configuration des chaînes

### Structure de configuration

```typescript
interface ChainSelectConfig<T> {
  allowedChains: number[];
  chainsConfig: Record<number, T>;
  defaultChainId: number;
}

const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: [1, 100, 137], // Ethereum, Gnosis, Polygon
  chainsConfig: {
    1: {
      chainId: 1,
      name: "Ethereum",
      shortName: "ETH",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/YOUR_PROJECT_ID"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
    100: {
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
  },
  defaultChainId: 100,
};
```

## 📱 Providers responsive

### Configuration mobile

```typescript
import { useMediaQuery } from "@mantine/hooks";

function ResponsiveProviders({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const mobileConfig = {
    ...baseConfig,
    disabledWrongNetworkBanner: isMobile, // Masquer sur mobile
  };

  return <RealtProvider value={mobileConfig}>{children}</RealtProvider>;
}
```

## 💡 Bonnes pratiques

✅ **Respecter** l'ordre des providers (RealtProvider en racine)
✅ **Configurer** les variables d'environnement appropriées
✅ **Utiliser** le store global pour l'état partagé
✅ **Gérer** les erreurs de connexion Web3
✅ **Tester** sur différents environnements
❌ **Éviter** la duplication de providers
❌ **Ne pas** imbriquer incorrectement les providers
❌ **Ne pas** oublier les variables d'environnement requises

## 🐛 Debugging

### Debug du store

```typescript
import { useRootStore } from "@realtoken/realt-commons";

function DebugPanel() {
  const store = useRootStore();

  if (process.env.NODE_ENV === "development") {
    console.log("Store state:", store);
  }

  return (
    <div>
      <h3>Debug Info</h3>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
}
```

### Validation de configuration

```typescript
function validateConfig(config: RealtProviderSetableProps) {
  if (!config.env) {
    console.warn("Environment not specified, defaulting to production");
  }

  if (config.env === "production" && config.showAllNetworks) {
    console.warn("Showing all networks in production may confuse users");
  }

  return config;
}
```
