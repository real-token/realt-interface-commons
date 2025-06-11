# 📝 Exemples d'usage

Collection d'exemples pratiques pour utiliser RealT Interface Commons dans différents scénarios.

## 🚀 Application basique

### Page d'accueil simple

```typescript
import React from "react";
import { Layout } from "@realtoken/realt-commons";
import { useTranslation } from "react-i18next";
import { Container, Title, Text, Button, Group } from "@mantine/core";

function HomePage() {
  const { t } = useTranslation();

  return (
    <Container size="md" py="xl">
      <Title order={1} ta="center" mb="md">
        {t("home.welcome")}
      </Title>

      <Text size="lg" ta="center" mb="xl">
        {t("home.description")}
      </Text>

      <Group justify="center">
        <Button size="lg" variant="gradient">
          {t("home.getStarted")}
        </Button>
        <Button size="lg" variant="outline">
          {t("home.learnMore")}
        </Button>
      </Group>
    </Container>
  );
}

export default HomePage;
```

## 💼 Dashboard avec wallet

### Tableau de bord utilisateur

```typescript
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import {
  useActiveChain,
  shortenString,
  modals,
} from "@realtoken/realt-commons";
import {
  Container,
  Grid,
  Card,
  Text,
  Button,
  Badge,
  Group,
  Stack,
} from "@mantine/core";
import { modals as mantineModals } from "@mantine/modals";

function Dashboard() {
  const { t } = useTranslation();
  const { account, isActive, chainId } = useWeb3React();
  const activeChain = useActiveChain(customChains);

  const openWalletModal = () => {
    mantineModals.open({
      modalId: "wallet",
      children: <modals.wallet />,
      withCloseButton: false,
      centered: true,
    });
  };

  if (!isActive) {
    return (
      <Container size="sm" py="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack align="center">
            <Text size="lg">{t("dashboard.connectWallet")}</Text>
            <Button onClick={openWalletModal}>{t("wallet.connect")}</Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Text size="xl" fw={600}>
          {t("dashboard.title")}
        </Text>
        <Badge color="green" size="lg">
          {t("wallet.connected")}
        </Badge>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" fw={500} mb="md">
              {t("dashboard.walletInfo")}
            </Text>
            <Stack gap="sm">
              <Group justify="space-between">
                <Text>{t("wallet.address")}:</Text>
                <Text ff="monospace">{shortenString(account!, 6, 4)}</Text>
              </Group>
              <Group justify="space-between">
                <Text>{t("wallet.network")}:</Text>
                <Text>{activeChain?.name}</Text>
              </Group>
              <Group justify="space-between">
                <Text>{t("wallet.chainId")}:</Text>
                <Text>{chainId}</Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" fw={500} mb="md">
              {t("dashboard.balance")}
            </Text>
            <Text size="xl" fw={700} c="blue">
              -- ETH
            </Text>
            <Text size="sm" c="dimmed">
              {t("dashboard.loadingBalance")}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Dashboard;
```

## 🔄 Sélecteur de réseau personnalisé

### Composant pour changer de réseau

```typescript
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { ChainSelect, useActiveChain } from "@realtoken/realt-commons";
import { Card, Text, Alert, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface NetworkSelectorProps {
  chains: ChainSelectConfig<any>;
}

function NetworkSelector({ chains }: NetworkSelectorProps) {
  const { t } = useTranslation();
  const { isActive, chainId } = useWeb3React();
  const activeChain = useActiveChain(chains);

  const isWrongNetwork = isActive && !chains.allowedChains.includes(chainId!);

  const handleChainChange = async (newChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${newChainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chaîne non ajoutée, l'ajouter
        const chainConfig = chains.chainsConfig[newChainId];
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${newChainId.toString(16)}`,
              chainName: chainConfig.name,
              nativeCurrency: chainConfig.nativeCurrency,
              rpcUrls: chainConfig.rpcUrls,
              blockExplorerUrls: chainConfig.blockExplorerUrls,
            },
          ],
        });
      }
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Text size="lg" fw={500}>
          {t("network.selector")}
        </Text>

        {isWrongNetwork && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title={t("network.wrongNetwork")}
            color="yellow"
          >
            {t("network.switchToSupported")}
          </Alert>
        )}

        <ChainSelect chains={chains} onChainChange={handleChainChange} />

        {activeChain && (
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              {t("network.current")}: {activeChain.name}
            </Text>
            <Text size="sm" c="dimmed">
              {t("network.chainId")}: {activeChain.chainId}
            </Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

export default NetworkSelector;
```

## 🌐 Sélecteur de langue

### Composant pour changer de langue

```typescript
import React from "react";
import { useTranslation } from "react-i18next";
import { Select, Group, Text } from "@mantine/core";

const LANGUAGES = [
  {
    value: "fr",
    label: "Français",
    flag: "🇫🇷",
  },
  {
    value: "en",
    label: "English",
    flag: "🇺🇸",
  },
  {
    value: "es",
    label: "Español",
    flag: "🇪🇸",
  },
];

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (value: string | null) => {
    if (value && value !== i18n.language) {
      i18n.changeLanguage(value);
      localStorage.setItem("realt-language", value);
    }
  };

  const renderSelectOption = ({ option }: any) => (
    <Group flex="1" gap="xs">
      <Text span>{option.flag}</Text>
      <Text span>{option.label}</Text>
    </Group>
  );

  const currentLanguage = LANGUAGES.find(
    (lang) => lang.value === i18n.language
  );

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      data={LANGUAGES}
      renderOption={renderSelectOption}
      leftSection={<Text>{currentLanguage?.flag}</Text>}
      placeholder={t("language.select")}
      style={{ minWidth: 140 }}
    />
  );
}

export default LanguageSelector;
```

## 📊 Liste avec filtrage

### Composant de liste filtrable

```typescript
import React, { useState } from "react";
import { useFilter, shortenString } from "@realtoken/realt-commons";
import { useTranslation } from "react-i18next";
import {
  Container,
  TextInput,
  Select,
  Group,
  Stack,
  Card,
  Text,
  Badge,
  Button,
  Pagination,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface Transaction {
  id: string;
  hash: string;
  type: "send" | "receive";
  amount: string;
  currency: string;
  date: Date;
  status: "pending" | "confirmed" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    hash: "0x1234567890abcdef1234567890abcdef12345678",
    type: "send",
    amount: "1.5",
    currency: "ETH",
    date: new Date("2024-01-15"),
    status: "confirmed",
  },
  // ... plus de transactions
];

function TransactionList() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { filters, setFilter, clearAllFilters, filteredData } = useFilter(
    mockTransactions,
    {
      search: "",
      type: "",
      status: "",
    }
  );

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "yellow";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={600}>
            {t("transactions.title")}
          </Text>
          <Badge size="lg">
            {filteredData.length} {t("transactions.total")}
          </Badge>
        </Group>

        {/* Filtres */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Group grow>
              <TextInput
                placeholder={t("transactions.search")}
                leftSection={<IconSearch size="1rem" />}
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
              />

              <Select
                placeholder={t("transactions.filterType")}
                clearable
                data={[
                  { value: "send", label: t("transactions.send") },
                  { value: "receive", label: t("transactions.receive") },
                ]}
                value={filters.type}
                onChange={(value) => setFilter("type", value || "")}
              />

              <Select
                placeholder={t("transactions.filterStatus")}
                clearable
                data={[
                  { value: "confirmed", label: t("transactions.confirmed") },
                  { value: "pending", label: t("transactions.pending") },
                  { value: "failed", label: t("transactions.failed") },
                ]}
                value={filters.status}
                onChange={(value) => setFilter("status", value || "")}
              />
            </Group>

            <Group>
              <Button variant="light" onClick={clearAllFilters}>
                {t("common.clearFilters")}
              </Button>
            </Group>
          </Stack>
        </Card>

        {/* Liste des transactions */}
        <Stack>
          {paginatedData.map((tx) => (
            <Card key={tx.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <Stack gap="xs" style={{ flex: 1 }}>
                  <Group gap="sm">
                    <Text ff="monospace" size="sm">
                      {shortenString(tx.hash, 8, 8)}
                    </Text>
                    <Badge
                      size="sm"
                      color={tx.type === "send" ? "red" : "green"}
                    >
                      {t(`transactions.${tx.type}`)}
                    </Badge>
                    <Badge size="sm" color={getStatusColor(tx.status)}>
                      {t(`transactions.${tx.status}`)}
                    </Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    {tx.date.toLocaleDateString()}
                  </Text>
                </Stack>

                <Text size="lg" fw={600}>
                  {tx.type === "send" ? "-" : "+"}
                  {tx.amount} {tx.currency}
                </Text>
              </Group>
            </Card>
          ))}
        </Stack>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center">
            <Pagination
              value={page}
              onChange={setPage}
              total={totalPages}
              boundaries={1}
              siblings={1}
            />
          </Group>
        )}
      </Stack>
    </Container>
  );
}

export default TransactionList;
```

## 🎨 Thème personnalisé avancé

### Application avec thème adaptatif

```typescript
import React from "react";
import {
  MantineProvider,
  createTheme,
  mergeMantineTheme,
  useMantineColorScheme,
  Container,
  Stack,
  Title,
  Button,
  Group,
  Card,
  Text,
} from "@mantine/core";
import {
  theme as realtTheme,
  ColorSchemeManager,
} from "@realtoken/realt-commons";

// Thème personnalisé
const customTheme = createTheme({
  colors: {
    brand: [
      "#e3f2fd",
      "#bbdefb",
      "#90caf9",
      "#64b5f6",
      "#42a5f5",
      "#2196f3", // Couleur principale
      "#1e88e5",
      "#1976d2",
      "#1565c0",
      "#0d47a1",
    ],
    success: [
      "#e8f5e8",
      "#c8e6c9",
      "#a5d6a7",
      "#81c784",
      "#66bb6a",
      "#4caf50", // Vert principal
      "#43a047",
      "#388e3c",
      "#2e7d32",
      "#1b5e20",
    ],
  },
  primaryColor: "brand",
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  headings: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: "600",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Card: {
      defaultProps: {
        shadow: "sm",
        radius: "md",
      },
    },
  },
});

const mergedTheme = mergeMantineTheme(realtTheme, customTheme);

// Composant avec gestion du thème
function ThemedButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Button
      onClick={() => toggleColorScheme()}
      variant={colorScheme === "dark" ? "light" : "filled"}
    >
      {colorScheme === "dark" ? "Mode clair" : "Mode sombre"}
    </Button>
  );
}

function App() {
  return (
    <MantineProvider theme={mergedTheme}>
      <ColorSchemeManager />
      <Container py="xl">
        <Stack align="center">
          <Title order={1}>Application avec thème personnalisé</Title>
          <ThemedButton />

          <Group>
            <Button color="brand">Bouton principal</Button>
            <Button color="success">Bouton succès</Button>
            <Button variant="outline">Bouton outline</Button>
          </Group>

          <Card withBorder style={{ width: 300 }}>
            <Text>Carte avec style personnalisé</Text>
            <Text size="sm" c="dimmed">
              Cette carte utilise les styles par défaut du thème.
            </Text>
          </Card>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
```

## 💡 Conseils d'optimisation

### Mémoization et optimisation

```typescript
import React, { memo, useMemo, useCallback, Suspense } from "react";
import { useTranslation } from "react-i18next";

// Composant mémorisé
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const { t } = useTranslation();

  // Calculs coûteux mémorisés
  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      processed: expensiveCalculation(item),
    }));
  }, [data]);

  // Callbacks mémorisés
  const handleClick = useCallback(
    (id: string) => {
      onUpdate(id);
    },
    [onUpdate]
  );

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Lazy loading des composants
const LazyDashboard = React.lazy(() => import("./Dashboard"));
const LazyTransactionList = React.lazy(() => import("./TransactionList"));

function App() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Routes>
        <Route path="/dashboard" element={<LazyDashboard />} />
        <Route path="/transactions" element={<LazyTransactionList />} />
      </Routes>
    </Suspense>
  );
}
```

Ces exemples montrent comment utiliser efficacement RealT Interface Commons dans différents contextes ! 🚀
