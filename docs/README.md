# RealT Interface Commons 🧰

Une bibliothèque React complète et modulaire pour créer des interfaces Web3 avec des composants prêts à l'emploi pour les applications RealT.

## 🌟 Aperçu

RealT Interface Commons est un monorepo contenant :

- 📦 **realt-commons** : Package principal avec composants, hooks, utilitaires et configurations
- 🌐 **realt-commons-example** : Application d'exemple démontrant l'utilisation du package

## 🚀 Installation

```bash
# Avec npm
npm install @realtoken/realt-commons

# Avec yarn
yarn add @realtoken/realt-commons

# Avec pnpm
pnpm add @realtoken/realt-commons
```

## 📁 Structure du projet

```
realt-interface-commons/
├── packages/
│   └── realt-commons/          # Package principal
│       ├── src/
│       │   ├── components/     # Composants UI réutilisables
│       │   ├── hooks/          # Hooks personnalisés
│       │   ├── providers/      # Providers React
│       │   ├── theme/          # Configuration du thème
│       │   ├── web3/           # Intégration Web3
│       │   ├── i18next/        # Internationalisation
│       │   └── utils/          # Utilitaires
│       └── package.json
└── apps/
    └── realt-commons-example/  # Application d'exemple
```

## 🎯 Fonctionnalités principales

- 🎨 **Système de thème** : Thème personnalisable avec mode sombre/clair
- 🌐 **Web3** : Intégration complète avec connecteurs de wallet
- 🗣️ **i18n** : Support multi-langues (FR/EN/ES)
- 📱 **Responsive** : Interface adaptée mobile et desktop
- ⚡ **Mantine UI** : Basé sur Mantine Core v7
- 🔗 **Multi-chaînes** : Support de plusieurs réseaux blockchain

## 📖 Documentation détaillée

- [🎨 Guide du thème et ColorScheme](./theme.md)
- [🌐 Intégration Web3 et wallets](./web3.md)
- [🧩 Composants disponibles](./components.md)
- [🎣 Hooks et utilitaires](./hooks.md)
- [🔧 Configuration et providers](./providers.md)
- [🗣️ Internationalisation](./i18n.md)
- [📋 Guide d'intégration](./integration.md)
- [📝 Exemples d'usage](./examples.md)

## 🛠️ Technologies

- **React 18** : Framework frontend
- **TypeScript** : Typage statique
- **Mantine** : Composants UI
- **Web3-React** : Intégration Web3
- **Jotai** : Gestion d'état
- **i18next** : Internationalisation
- **Vite** : Build tool

## 🤝 Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines de contribution.

## 📄 Licence

MIT - Voir [LICENSE](../LICENSE) pour plus de détails.
