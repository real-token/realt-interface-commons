# 🎨 Système de thème et ColorScheme

Le package RealT Commons intègre un système complet de gestion de thème basé sur Mantine avec support du mode sombre/clair et personnalisation avancée.

## 🌈 Configuration du thème

### Thème principal

Le thème est configuré dans `packages/realt-commons/src/theme/theme.ts` :

```typescript
import { createTheme, ModalProps } from "@mantine/core";

export const theme = createTheme({
  colors: {
    brand: [
      "#F6CA79", // Couleur la plus claire
      "#F5BC51",
      "#F4B43E",
      "#F3AD2B",
      "#F2A91E", // Couleur principale
      "#E79B0D",
      "#D48E0C",
      "#C1810B",
      "#AE740A",
      "#9A6709", // Couleur la plus foncée
    ],
  },
  primaryColor: "brand",
  defaultGradient: { deg: 90, from: "#F6CA79", to: "#E79B0D" },
  defaultRadius: "md",
  cursorType: "pointer",
  components: {
    ActionIcon: { defaultProps: { variant: "filled" } },
  },
});
```

### Palette de couleurs brand

La palette **brand** utilise des tons dorés/orangés caractéristiques de RealT :

- Tons 0-4 : Versions claires, idéales pour les arrière-plans et hover
- Ton 4 (#F2A91E) : Couleur principale
- Tons 5-9 : Versions foncées pour contraste et états actifs

## 🔄 Gestionnaire ColorScheme

### ColorSchemeManager

Le composant `ColorSchemeManager` gère automatiquement le passage entre mode clair et sombre :

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

### Fonctionnalités

✨ **Raccourci clavier** : `Ctrl/Cmd + J` pour basculer
🍪 **Persistance** : Sauvegarde automatique dans les cookies
🔄 **Auto-détection** : Récupère le thème préféré au chargement

### Code du ColorSchemeManager

```typescript
import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookies } from "cookies-next";
import { useEffect } from "react";

export const ColorSchemeManager = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  // Récupération du thème sauvegardé
  useEffect(() => {
    const themeColor = (getCookie("mantine-color-scheme") ||
      "dark") as MantineColorScheme;
    setColorScheme(themeColor);
  }, []);

  // Fonction de basculement
  const toggleColorScheme = (
    nextColorScheme: MantineColorScheme = colorScheme === "dark"
      ? "light"
      : "dark"
  ) => {
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme);
  };

  // Raccourci clavier Cmd/Ctrl + J
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return <></>;
};
```

## 🎭 Styles de modales

### Configuration des modales

Le thème inclut des styles prédéfinis pour les modales :

```typescript
export const modalStyles: ModalProps["styles"] = {
  header: { justifyContent: "center" },
  body: {
    padding: "1rem",
    width: "auto",
    maxWidth: "700px",
    maxHeight: "calc(100vh - (3vh * 2))",
    overflowY: "scroll",
  },
  root: { zIndex: 10 },
  overlay: { zIndex: 10 },
  inner: { zIndex: 10 },
  content: {
    overflowY: "unset !important" as "unset",
    maxHeight: "calc(100vh - (3vh * 2)) !important",
  },
};
```

### Utilisation dans une modale

```typescript
import { Modal } from "@mantine/core";
import { modalStyles } from "@realtoken/realt-commons";

function MyModal({ opened, onClose }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      styles={modalStyles}
      title="Ma modale"
    >
      {/* Contenu de la modale */}
    </Modal>
  );
}
```

## 🎨 Personnalisation avancée

### Overrider le thème

```typescript
import { MantineProvider, createTheme, mergeMantineTheme } from '@mantine/core';
import { theme as realtTheme } from '@realtoken/realt-commons';

const customTheme = createTheme({
  colors: {
    // Vos couleurs personnalisées
    myBrand: ['#fff', '#eee', ...],
  },
  // Autres personnalisations
});

const mergedTheme = mergeMantineTheme(realtTheme, customTheme);

function App() {
  return (
    <MantineProvider theme={mergedTheme}>
      {/* Votre application */}
    </MantineProvider>
  );
}
```

### Utiliser les couleurs du thème

```typescript
import { useMantineTheme } from "@mantine/core";

function MyComponent() {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.brand[4],
        color: theme.colors.brand[0],
      }}
    >
      Contenu avec couleurs du thème
    </div>
  );
}
```

## 📱 Responsive et adaptatif

Le thème s'adapte automatiquement aux différentes tailles d'écran :

- **Desktop** : Toutes les fonctionnalités disponibles
- **Mobile** : Interface optimisée avec navigation adaptée
- **Tablette** : Mise en page intermédiaire

## 🔧 Configuration dans votre app

### Intégration complète

```typescript
import { MantineProviders, ColorSchemeManager } from "@realtoken/realt-commons";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProviders>
      <ColorSchemeManager />
      {/* Votre application */}
    </MantineProviders>
  );
}
```

Le `MantineProviders` inclut :

- Le thème RealT configuré
- La gestion des notifications
- La gestion des modales
- Les styles CSS de base

## 💡 Bonnes pratiques

✅ **Toujours utiliser** le `ColorSchemeManager` pour la cohérence
✅ **Tester** en mode sombre et clair
✅ **Utiliser** les couleurs du thème plutôt que des valeurs hardcodées
✅ **Respecter** les conventions de nommage Mantine
❌ **Éviter** de modifier directement les cookies de thème
