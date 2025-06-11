# 🎣 Hooks et utilitaires

RealT Commons fournit une collection de hooks personnalisés et d'utilitaires pour simplifier le développement d'applications Web3.

## 🔗 Hooks Blockchain

### useActiveChain

Hook pour récupérer les informations de la chaîne blockchain active.

```typescript
import { useActiveChain } from "@realtoken/realt-commons";

function ChainInfo() {
  const activeChain = useActiveChain(customChains);

  if (!activeChain) {
    return <div>Aucune chaîne active</div>;
  }

  return (
    <div>
      <h3>Chaîne active</h3>
      <p>Nom : {activeChain.name}</p>
      <p>ID : {activeChain.chainId}</p>
      <p>Symbole : {activeChain.nativeCurrency.symbol}</p>
      <p>Explorateur : {activeChain.blockExplorerUrls?.[0]}</p>
    </div>
  );
}
```

**Paramètres :**

- `chainConfig` : Configuration des chaînes supportées

**Retour :**

- `Chain | undefined` : Informations de la chaîne active ou undefined

### useContract

Hook pour interagir avec les smart contracts.

```typescript
import { useContract } from "@realtoken/realt-commons";
import { useWeb3React } from "@web3-react/core";

function ContractInteraction() {
  const { provider } = useWeb3React();

  const contract = useContract(
    "0x1234567890123456789012345678901234567890", // Adresse du contrat
    contractABI, // ABI du contrat
    provider
  );

  const handleContractCall = async () => {
    if (!contract) return;

    try {
      const result = await contract.myMethod();
      console.log("Résultat:", result);
    } catch (error) {
      console.error("Erreur contrat:", error);
    }
  };

  return (
    <button onClick={handleContractCall} disabled={!contract}>
      Appeler le contrat
    </button>
  );
}
```

**Paramètres :**

- `address` : Adresse du smart contract
- `abi` : ABI (Application Binary Interface) du contrat
- `provider` : Provider Web3 (optionnel)

**Retour :**

- `Contract | null` : Instance du contrat ou null

## 🔍 Hooks de filtrage

### useFilter

Hook pour implémenter des systèmes de filtrage avec état persistant.

```typescript
import { useFilter } from "@realtoken/realt-commons";

function ProductList() {
  const { filters, setFilter, clearFilter, clearAllFilters, filteredData } =
    useFilter(productData, {
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
    });

  return (
    <div>
      {/* Contrôles de filtrage */}
      <div>
        <select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
        >
          <option value="">Toutes catégories</option>
          <option value="electronics">Électronique</option>
          <option value="books">Livres</option>
        </select>

        <input
          type="number"
          placeholder="Prix min"
          value={filters.minPrice}
          onChange={(e) => setFilter("minPrice", Number(e.target.value))}
        />

        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => setFilter("inStock", e.target.checked)}
        />

        <button onClick={() => clearFilter("category")}>
          Effacer catégorie
        </button>

        <button onClick={clearAllFilters}>Effacer tout</button>
      </div>

      {/* Liste filtrée */}
      <div>
        {filteredData.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Prix : {product.price}€</p>
            <p>Catégorie : {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Paramètres :**

- `data` : Données à filtrer
- `initialFilters` : Filtres initiaux
- `filterFunction` : Fonction de filtrage personnalisée (optionnel)

**Retour :**

- `filters` : État actuel des filtres
- `setFilter` : Fonction pour définir un filtre
- `clearFilter` : Fonction pour effacer un filtre
- `clearAllFilters` : Fonction pour effacer tous les filtres
- `filteredData` : Données après application des filtres

## 🛠️ Utilitaires

### shortenString

Utilitaire pour raccourcir les chaînes longues (adresses, hashes, etc.).

```typescript
import { shortenString } from "@realtoken/realt-commons";

function AddressDisplay({ address }: { address: string }) {
  const shortAddress = shortenString(address, 6, 4);

  return (
    <div>
      <p>Adresse complète : {address}</p>
      <p>Adresse courte : {shortAddress}</p>
      {/* Résultat : 0x1234...abcd */}
    </div>
  );
}

// Exemples d'usage
const address = "0x1234567890123456789012345678901234567890";

shortenString(address); // "0x1234...7890" (défaut: 4 début, 4 fin)
shortenString(address, 6, 4); // "0x123456...7890"
shortenString(address, 8, 0); // "0x12345678..."
shortenString("", 4, 4); // "" (gestion des chaînes vides)
```

**Paramètres :**

- `str` : Chaîne à raccourcir
- `startLength` : Nombre de caractères au début (défaut: 4)
- `endLength` : Nombre de caractères à la fin (défaut: 4)

**Retour :**

- `string` : Chaîne raccourcie avec "..." au milieu

### asConst

Utilitaire TypeScript pour la constance des types.

```typescript
import { asConst } from "@realtoken/realt-commons";

// Définition de constantes typées
const CHAIN_IDS = asConst({
  ETHEREUM: 1,
  GNOSIS: 100,
  POLYGON: 137,
});

// Type automatiquement inféré comme:
// { readonly ETHEREUM: 1; readonly GNOSIS: 100; readonly POLYGON: 137; }

function handleChain(chainId: (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS]) {
  switch (chainId) {
    case CHAIN_IDS.ETHEREUM:
      return "Ethereum Mainnet";
    case CHAIN_IDS.GNOSIS:
      return "Gnosis Chain";
    case CHAIN_IDS.POLYGON:
      return "Polygon";
    default:
      return "Chaîne inconnue";
  }
}
```

### Window utilities

Utilitaires pour la gestion de la fenêtre et du navigateur.

```typescript
import { isClient, isSSR } from "@realtoken/realt-commons";

function ClientOnlyComponent() {
  if (isSSR()) {
    return <div>Chargement...</div>;
  }

  return (
    <div>{isClient() && <p>Largeur fenêtre : {window.innerWidth}px</p>}</div>
  );
}

// Vérifications d'environnement
const canUseDOM = isClient();
const isServerSide = isSSR();
```

**Fonctions disponibles :**

- `isClient()` : Retourne true si exécuté côté client
- `isSSR()` : Retourne true si exécuté côté serveur (SSR)

### Contract utilities

Utilitaires pour la manipulation de smart contracts.

```typescript
import {
  isValidAddress,
  formatContractError,
  parseContractEvent,
} from "@realtoken/realt-commons";

function ContractManager() {
  const handleAddressInput = (address: string) => {
    if (!isValidAddress(address)) {
      alert("Adresse invalide");
      return;
    }
    // Traitement de l'adresse valide...
  };

  const handleContractError = (error: any) => {
    const formattedError = formatContractError(error);
    console.error("Erreur contrat:", formattedError);
  };

  return (
    <div>
      <input
        placeholder="0x..."
        onChange={(e) => handleAddressInput(e.target.value)}
      />
    </div>
  );
}
```

## 🔄 Hooks d'état global

### useRootStore

Hook pour accéder au store global Zustand.

```typescript
import { useRootStore } from "@realtoken/realt-commons";

function GlobalStateManager() {
  const [env, showAllNetworks, connectors, setShowAllNetworks, setConnectors] =
    useRootStore((state) => [
      state.env,
      state.showAllNetworks,
      state.connectors,
      state.setShowAllNetworks,
      state.setConnectors,
    ]);

  return (
    <div>
      <p>Environnement : {env}</p>
      <p>Tous réseaux : {showAllNetworks ? "Oui" : "Non"}</p>

      <button onClick={() => setShowAllNetworks(!showAllNetworks)}>
        Basculer réseaux
      </button>
    </div>
  );
}
```

**État disponible :**

- `env` : Environnement actuel (production/development)
- `showAllNetworks` : Affichage de tous les réseaux
- `connectors` : Connecteurs Web3 disponibles
- `storeLoaded` : État de chargement du store

## ⚡ Hooks Jotai

### providerAtom

Atom pour gérer le dernier provider utilisé.

```typescript
import { useAtom } from "jotai";
import { providerAtom } from "@realtoken/realt-commons";

function ProviderTracker() {
  const [lastProvider, setLastProvider] = useAtom(providerAtom);

  const handleProviderChange = (provider: string) => {
    setLastProvider(provider);
    localStorage.setItem("lastProvider", provider);
  };

  return (
    <div>
      <p>Dernier provider : {lastProvider || "Aucun"}</p>

      <button onClick={() => handleProviderChange("metamask")}>
        Utiliser MetaMask
      </button>

      <button onClick={() => handleProviderChange("walletconnect")}>
        Utiliser WalletConnect
      </button>
    </div>
  );
}
```

## 🎛️ Hooks personnalisés avancés

### useDebounce

Hook pour débouncer les valeurs et éviter les appels excessifs.

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage dans un composant de recherche
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Appel API seulement après 300ms de pause
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Rechercher..."
    />
  );
}
```

## 📊 Patterns d'usage courants

### Combinaison de hooks

```typescript
function Web3Dashboard() {
  const { account, chainId, isActive } = useWeb3React();
  const activeChain = useActiveChain(customChains);
  const [lastProvider] = useAtom(providerAtom);
  const [showAllNetworks] = useRootStore((state) => [state.showAllNetworks]);

  // Hook de filtrage pour les transactions
  const { filters, setFilter, filteredData } = useFilter(transactions, {
    type: "",
    minAmount: 0,
    dateRange: null,
  });

  return (
    <div>
      <h2>Dashboard Web3</h2>

      {/* Informations de connexion */}
      <div>
        <p>Compte : {shortenString(account || "", 6, 4)}</p>
        <p>Réseau : {activeChain?.name}</p>
        <p>Provider : {lastProvider}</p>
      </div>

      {/* Filtres de transactions */}
      <div>
        <select
          value={filters.type}
          onChange={(e) => setFilter("type", e.target.value)}
        >
          <option value="">Tous types</option>
          <option value="send">Envoi</option>
          <option value="receive">Réception</option>
        </select>
      </div>

      {/* Liste des transactions filtrées */}
      <div>
        {filteredData.map((tx) => (
          <div key={tx.hash}>
            <p>Hash : {shortenString(tx.hash, 8, 8)}</p>
            <p>Montant : {tx.amount} ETH</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 💡 Bonnes pratiques

✅ **Utiliser** useCallback et useMemo pour optimiser les performances
✅ **Combiner** plusieurs hooks pour des fonctionnalités complexes
✅ **Gérer** les états de chargement et d'erreur
✅ **Débouncer** les inputs utilisateur pour éviter les appels excessifs
✅ **Typer** correctement les hooks avec TypeScript
❌ **Éviter** les re-renders inutiles
❌ **Ne pas** oublier les dépendances dans useEffect
❌ **Ne pas** abuser des hooks dans les boucles
