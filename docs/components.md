# 🧩 Composants disponibles

RealT Commons propose une collection complète de composants React prêts à l'emploi pour créer des interfaces Web3.

## 🏗️ Composants de layout

### Layout

Composant principal qui structure votre application avec header, footer et zone de contenu.

```typescript
import { Layout } from "@realtoken/realt-commons";

function App() {
  return (
    <Layout
      newWebsite={newWebsite}
      chains={customChains}
      headerNav={<NavMenu />}
      footerCustomLinks={<CustomLinks />}
      headerBanner={<Banner />}
      disabledWrongNetworkBanner={false}
    >
      {/* Contenu de votre application */}
    </Layout>
  );
}
```

**Props :**

- `children` : Contenu principal de l'application
- `newWebsite` : Configuration du site actuel
- `chains` : Configuration des chaînes blockchain
- `headerNav` : Navigation personnalisée pour le header
- `footerCustomLinks` : Liens personnalisés pour le footer
- `headerBanner` : Bannière à afficher en haut
- `headerButtons` : Boutons personnalisés pour le header
- `disabledWrongNetworkBanner` : Désactiver l'alerte de réseau incorrect

### Header

Composant d'en-tête avec navigation, sélecteur de site et boutons d'action.

```typescript
import { Header } from "@realtoken/realt-commons";

function CustomHeader() {
  return (
    <Header
      newWebsite={website}
      chains={chains}
      headerNav={<Navigation />}
      headerButtons={<CustomButtons />}
      banner={<PromoBanner />}
    />
  );
}
```

**Fonctionnalités :**

- 🌐 Sélecteur de site web (WebsiteSelector)
- 🔗 Sélecteur de réseau avec alerte
- 📱 Version mobile responsive
- 🎛️ Boutons d'action personnalisables

### Footer

Pied de page avec liens et informations.

```typescript
import { Footer } from "@realtoken/realt-commons";

function CustomFooter() {
  return <Footer param={footerConfig} customLinks={<SocialLinks />} />;
}
```

## 🔗 Composants Web3

### ChainSelect

Sélecteur de réseau blockchain avec interface utilisateur intuitive.

```typescript
import { ChainSelect } from "@realtoken/realt-commons";

function NetworkSelector() {
  const handleChainChange = (chainId: number) => {
    console.log("Changement vers la chaîne:", chainId);
  };

  return (
    <ChainSelect chains={customChains} onChainChange={handleChainChange} />
  );
}
```

**Fonctionnalités :**

- 🎯 Sélection visuelle du réseau
- ⚠️ Messages d'alerte pour réseaux non supportés
- 🔄 Changement automatique de réseau
- 📱 Interface responsive

### WalletModal

Modale de connexion de wallet avec support multi-connecteurs.

```typescript
import { modals } from "@realtoken/realt-commons";
import { modals as mantineModals } from "@mantine/modals";

function openWalletModal() {
  mantineModals.open({
    modalId: "wallet",
    children: <modals.wallet />,
    withCloseButton: false,
    centered: true,
  });
}
```

**Connecteurs supportés :**

- 🦊 MetaMask
- 🔒 Gnosis Safe
- 🌉 WalletConnect V2
- 📖 Mode lecture seule

## 🎨 Composants UI

### ColorSchemeManager

Gestionnaire automatique du thème clair/sombre.

```typescript
import { ColorSchemeManager } from "@realtoken/realt-commons";

function App() {
  return (
    <>
      <ColorSchemeManager />
      {/* Votre application */}
    </>
  );
}
```

**Fonctionnalités :**

- 🎨 Basculement automatique clair/sombre
- ⌨️ Raccourci clavier Ctrl/Cmd + J
- 🍪 Sauvegarde dans les cookies
- 🔄 Récupération au chargement

### Divider

Séparateur visuel pour structurer l'interface.

```typescript
import { Divider } from "@realtoken/realt-commons";

function Section() {
  return (
    <div>
      <h2>Section 1</h2>
      <Divider />
      <h2>Section 2</h2>
    </div>
  );
}
```

### Link

Composant de lien avec styling cohérent.

```typescript
import { Link } from "@realtoken/realt-commons";

function Navigation() {
  return (
    <Link href="/dashboard" external={false} variant="primary">
      Tableau de bord
    </Link>
  );
}
```

**Props :**

- `href` : URL de destination
- `external` : Lien externe (ouvre dans nouvel onglet)
- `variant` : Style du lien (primary, secondary, etc.)

## 🎛️ Composants Header

### WebsiteSelector

Sélecteur permettant de naviguer entre différents sites RealT.

```typescript
import { WebsiteSelector } from "@realtoken/realt-commons";

const currentWebsite = Websites.REALT_TOKEN;
const newWebsite = {
  name: "Mon App",
  url: "https://monapp.com",
  logo: MonLogo,
  comingSoon: false,
};

function SiteSelector() {
  return (
    <WebsiteSelector
      current={currentWebsite}
      newWebsite={newWebsite}
      isDisabled={false}
    />
  );
}
```

### HeaderButtons

Boutons d'action dans le header (wallet, thème, etc.).

```typescript
import { HeaderButtons } from "@realtoken/realt-commons";

function CustomHeaderButtons() {
  return (
    <HeaderButtons
      chains={customChains}
      // Boutons par défaut : wallet, thème, langue
    />
  );
}
```

### MobileHeaderWrapper

Wrapper responsive pour la navigation mobile.

```typescript
import { MobileHeaderWrapper } from "@realtoken/realt-commons";

function MobileHeader() {
  return (
    <MobileHeaderWrapper
      selector={<WebsiteSelector />}
      nav={<MobileNavigation />}
      buttons={<HeaderButtons />}
    />
  );
}
```

## 🎯 Composants Head

### Head

Gestion des métadonnées et titre de page.

```typescript
import { Head } from "@realtoken/realt-commons";

function PageHead() {
  return (
    <Head
      title="Ma Page - RealT"
      description="Description de ma page"
      favicon="/favicon.ico"
    />
  );
}
```

## 🍽️ Composants Menu

### Menu components

Collection de composants pour créer des menus de navigation.

```typescript
import { MenuDropdown, MenuItem } from "@realtoken/realt-commons";

function NavigationMenu() {
  return (
    <MenuDropdown label="Navigation">
      <MenuItem href="/dashboard">Tableau de bord</MenuItem>
      <MenuItem href="/portfolio">Portfolio</MenuItem>
      <MenuItem href="/transactions">Transactions</MenuItem>
    </MenuDropdown>
  );
}
```

## 🎨 Styling et thématisation

### Utilisation des classes CSS

Les composants utilisent CSS Modules pour l'isolation des styles :

```typescript
// Les classes sont automatiquement appliquées
import { Layout } from "@realtoken/realt-commons";

// Le composant utilise ses propres classes internes
<Layout>Content</Layout>;
```

### Personnalisation avec Mantine

```typescript
import { Box } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

function CustomComponent() {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        backgroundColor: theme.colors.brand[1],
        padding: theme.spacing.md,
      }}
    >
      Contenu personnalisé
    </Box>
  );
}
```

## 📱 Responsive Design

Tous les composants sont responsive et s'adaptent automatiquement :

- **Mobile (< 768px)** : Interface simplifiée, navigation mobile
- **Tablette (768-1024px)** : Interface adaptée
- **Desktop (> 1024px)** : Interface complète

## 🔧 Configuration avancée

### Props communes

La plupart des composants acceptent ces props standard :

- `className` : Classes CSS additionnelles
- `style` : Styles inline
- `children` : Contenu enfant
- `id` : Identifiant unique

### Événements

```typescript
// Exemple avec gestion d'événements
function InteractiveComponent() {
  const handleClick = (event) => {
    console.log("Clic détecté:", event);
  };

  return (
    <CustomButton
      onClick={handleClick}
      onMouseEnter={() => console.log("Hover")}
    >
      Bouton interactif
    </CustomButton>
  );
}
```

## 💡 Bonnes pratiques

✅ **Utiliser** les composants fournis plutôt que recréer
✅ **Respecter** la hiérarchie des composants (Layout > Header > components)
✅ **Tester** l'affichage sur différentes tailles d'écran
✅ **Personnaliser** via les props plutôt que le CSS direct
❌ **Éviter** de modifier les styles internes des composants
❌ **Ne pas** imbriquer incorrectement les composants de layout
