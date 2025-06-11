# 🌐 Intégration Web3 et Wallets

RealT Commons fournit une intégration Web3 complète avec support de multiples wallets et réseaux blockchain.

## 🔗 Connecteurs supportés

### Wallets disponibles

- 🦊 **MetaMask** : Wallet le plus populaire
- 🔒 **Gnosis Safe** : Wallet multi-signature
- 🌉 **WalletConnect V2** : Connexion via QR code
- 📖 **Read-Only** : Mode lecture seule

## ⚙️ Configuration Web3

### Setup de base

```typescript
import {
  getConnectors,
  metaMask,
  metaMaskHooks,
  gnosisSafe,
  gnosisHooks,
  getWalletConnectV2,
  getReadOnlyConnector,
} from "@realtoken/realt-commons";

// Configuration des chaînes
const customChains: ChainSelectConfig<CustomChain> = {
  allowedChains: parseAllowedChain(ChainsID),
  chainsConfig: CUSTOM_ALLOWED_CHAINS,
  defaultChainId: ChainsID.Gnosis,
};

// Setup WalletConnect V2
const [walletConnectV2, walletConnectV2Hooks] = getWalletConnectV2(
  customChains,
  "production", // ou 'development'
  "votre-project-id", // Project ID WalletConnect
  true // showAllNetworks
);

// Setup Read-Only
const [readOnly, readOnlyHooks] = getReadOnlyConnector(customChains);

// Création des connecteurs
const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks],
});
```

## 🔧 Web3Providers

### Provider principal

Le `Web3Providers` encapsule votre application avec la logique Web3 :

```typescript
import { Web3Providers } from "@realtoken/realt-commons";

function App() {
  return (
    <Web3Providers libraryConnectors={libraryConnectors}>
      {/* Votre application */}
    </Web3Providers>
  );
}
```

### Code du Web3Provider

```typescript
import { FC, ReactNode, useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { useAtomValue } from "jotai";
import { providerAtom } from "../states";

// Reconnexion automatique
const tryEagerlyConnect = (
  connectors: ConnectorsMap,
  lastUsedProvider: string
) => {
  try {
    const availableConnector =
      AvailableConnectors[lastUsedProvider as keyof typeof AvailableConnectors];
    const connectorData = ConnectorsDatas.get(availableConnector);
    if (!connectorData) return;

    const connector = connectors.get(connectorData.connectorEnum)?.connector;
    if (!connector) return;

    if (connector.connectEagerly) connector.connectEagerly();
  } catch (err) {
    console.log(err);
  }
};

export function Web3Providers({ children, libraryConnectors }) {
  const { connectors, connectorsMap } = libraryConnectors;

  return (
    <Web3ReactProvider connectors={connectors}>
      <ConnectEagerly connectors={connectorsMap} />
      {children}
    </Web3ReactProvider>
  );
}
```

## 🎣 Hooks Web3

### useActiveChain

Hook pour récupérer la chaîne active :

```typescript
import { useActiveChain } from "@realtoken/realt-commons";

function MyComponent() {
  const activeChain = useActiveChain();

  return (
    <div>
      Chaîne active : {activeChain?.name}
      ID : {activeChain?.chainId}
    </div>
  );
}
```

### useWeb3React (de @web3-react/core)

```typescript
import { useWeb3React } from "@web3-react/core";

function WalletInfo() {
  const { account, chainId, isActive, provider } = useWeb3React();

  if (!isActive) {
    return <div>Wallet non connecté</div>;
  }

  return (
    <div>
      <p>Adresse : {account}</p>
      <p>Chaîne : {chainId}</p>
      <p>Connecté : {isActive ? "✅" : "❌"}</p>
    </div>
  );
}
```

## 🪙 Modale de wallet

### WalletModal

Modale prête à l'emploi pour connecter les wallets :

```typescript
import { modals } from "@realtoken/realt-commons";
import { modals as mantineModals } from "@mantine/modals";

// Ouvrir la modale de wallet
function openWalletModal() {
  mantineModals.open({
    modalId: "wallet",
    children: <modals.wallet />,
    withCloseButton: false,
    centered: true,
  });
}

// Dans votre composant
function ConnectButton() {
  const { isActive } = useWeb3React();

  return (
    <Button onClick={openWalletModal}>
      {isActive ? "Connecté" : "Connecter Wallet"}
    </Button>
  );
}
```

## 🔗 Sélecteur de chaîne

### ChainSelect

Composant pour changer de réseau :

```typescript
import { ChainSelect } from "@realtoken/realt-commons";

function NetworkSelector() {
  return (
    <ChainSelect
      chains={customChains}
      onChainChange={(chainId) => {
        console.log("Changement vers:", chainId);
      }}
    />
  );
}
```

## 📡 Configuration des chaînes

### Définition des chaînes

```typescript
// Configuration des chaînes supportées
export const CUSTOM_ALLOWED_CHAINS: Record<ChainsID, CustomChain> = {
  [ChainsID.Ethereum]: {
    chainId: 1,
    name: "Ethereum",
    shortName: "ETH",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/..."],
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
};
```

### parseAllowedChain utility

```typescript
import { parseAllowedChain } from "@realtoken/realt-commons";

// Convertit les IDs en configuration utilisable
const allowedChains = parseAllowedChain(ChainsID);
```

## 🔐 Gestion des états

### providerAtom (Jotai)

```typescript
import { useAtom } from "jotai";
import { providerAtom } from "@realtoken/realt-commons";

function ProviderManager() {
  const [lastProvider, setLastProvider] = useAtom(providerAtom);

  return <div>Dernier provider utilisé : {lastProvider}</div>;
}
```

### RealtProvider store

```typescript
import { useRootStore } from "@realtoken/realt-commons";

function Web3Manager() {
  const [connectors, setConnectors] = useRootStore((state) => [
    state.connectors,
    state.setConnectors,
  ]);

  // Utilisation des connecteurs...
}
```

## 🚀 Exemple d'intégration complète

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import {
  RealtProvider,
  Web3Providers,
  MantineProviders,
  getConnectors,
  metaMask,
  metaMaskHooks,
  // ... autres imports
} from "@realtoken/realt-commons";

// Configuration des connecteurs
const libraryConnectors = getConnectors({
  metamask: [metaMask, metaMaskHooks],
  gnosisSafe: [gnosisSafe, gnosisHooks],
  walletConnectV2: [walletConnectV2, walletConnectV2Hooks],
  readOnly: [readOnly, readOnlyHooks],
});

// Configuration de l'environnement
const realtProviderValue = {
  env: "production",
  showAllNetworks: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RealtProvider value={realtProviderValue}>
      <Web3Providers libraryConnectors={libraryConnectors}>
        <MantineProviders>
          <App />
        </MantineProviders>
      </Web3Providers>
    </RealtProvider>
  </React.StrictMode>
);
```

## 🔧 Configuration avancée

### WalletConnect Project ID

1. Créer un compte sur [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Créer un nouveau projet
3. Copier le Project ID
4. L'utiliser dans `getWalletConnectV2()`

### Variables d'environnement

```bash
# .env
VITE_WALLETCONNECT_PROJECT_ID=votre_project_id
VITE_ENV=production
```

## 🛡️ Sécurité

### Bonnes pratiques

✅ **Valider** les adresses et chaînes
✅ **Gérer** les erreurs de connexion
✅ **Limiter** les chaînes autorisées
✅ **Vérifier** les signatures
❌ **Ne jamais** stocker de clés privées
❌ **Ne pas** faire confiance aveuglément aux inputs

### Gestion d'erreurs

```typescript
import { useWeb3React } from "@web3-react/core";

function SafeWeb3Component() {
  const { account, chainId, isActive, error } = useWeb3React();

  if (error) {
    return <div>Erreur Web3: {error.message}</div>;
  }

  if (!isActive) {
    return <div>Veuillez connecter votre wallet</div>;
  }

  // Composant sécurisé...
}
```

## 📱 Support mobile

Les connecteurs s'adaptent automatiquement :

- **Desktop** : MetaMask extension, WalletConnect
- **Mobile** : WalletConnect, in-app browsers
- **Gnosis Safe** : Interface spécialisée
