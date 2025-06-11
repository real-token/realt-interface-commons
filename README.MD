# RealT Interface Commons 🧰🌐

[![npm version](https://badge.fury.io/js/@realtoken%2Frealt-commons.svg)](https://badge.fury.io/js/@realtoken%2Frealt-commons)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A comprehensive React component library and Web3 integration toolkit for building modern DeFi applications with **Mantine UI**, **Web3-React v8**, and **TypeScript**.

## ✨ Features

- 🎨 **Modern UI Components** - Pre-built layout, header, footer, and Web3 components
- 🌐 **Web3 Integration** - Support for MetaMask, WalletConnect V2, Gnosis Safe, and Read-Only mode
- 🎭 **Theme System** - Beautiful golden brand theme with dark/light mode support
- 🌍 **Internationalization** - Built-in i18n support (French, English, Spanish)
- ⚡ **Performance** - Optimized with Zustand, Jotai, and React best practices
- 📱 **Responsive Design** - Mobile-first approach with Mantine breakpoints
- 🔧 **Developer Experience** - Full TypeScript support with comprehensive documentation

## 📦 Packages

This monorepo contains two main packages:

### `@realtoken/realt-commons` 📚

**Location**: [`/packages/realt-commons`](./packages/realt-commons)

The core library containing all reusable components, hooks, utilities, and configurations for building Web3 applications.

**Key Features:**

- Layout and UI components (Header, Footer, Layout)
- Web3 providers and wallet connection management
- Blockchain hooks (useActiveChain, useContract)
- Theme system with brand colors and dark/light mode
- Internationalization setup and language management
- State management with Zustand and Jotai

### `realt-commons-example` 🎯

**Location**: [`/apps/realt-commons-example`](./apps/realt-commons-example)

A complete example application demonstrating how to use all features of the `realt-commons` package.

**Includes:**

- Full provider setup and configuration
- Web3 wallet integration examples
- Component usage demonstrations
- Theme customization examples
- Internationalization implementation

## 🚀 Quick Start

### Installation

```bash
# Install with npm
npm install @realtoken/realt-commons

# Install with yarn
yarn add @realtoken/realt-commons

# Install with pnpm
pnpm add @realtoken/realt-commons
```

### Required Peer Dependencies

```bash
npm install react react-dom @mantine/core @mantine/hooks @web3-react/core
```

### Basic Setup

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import {
  RealtProvider,
  MantineProviders,
  Web3Providers,
  LanguageInit,
  Layout,
} from "@realtoken/realt-commons";

// Import required CSS
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <Layout>
      <h1>Welcome to RealT Commons!</h1>
    </Layout>
  );
}

const root = createRoot(document.getElementById("root")!);

root.render(
  <RealtProvider env="dev">
    <MantineProviders>
      <Web3Providers>
        <LanguageInit>
          <App />
        </LanguageInit>
      </Web3Providers>
    </MantineProviders>
  </RealtProvider>
);
```

## 📖 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) directory:

- **[📋 Overview & Integration Guide](./docs/README.md)** - Complete project overview and setup
- **[🔧 Integration Guide](./docs/integration.md)** - Step-by-step integration instructions
- **[🧩 Components](./docs/components.md)** - All available UI and Web3 components
- **[🌐 Web3 Integration](./docs/web3.md)** - Blockchain connectivity and wallet management
- **[🎨 Theme System](./docs/theme.md)** - Styling, theming, and customization
- **[🔗 Hooks & Utilities](./docs/hooks.md)** - Custom hooks and helper functions
- **[⚙️ Providers](./docs/providers.md)** - Provider configuration and setup
- **[🌍 Internationalization](./docs/i18n.md)** - Multi-language support setup
- **[💡 Examples](./docs/examples.md)** - Practical code examples and use cases

## 🛠️ Development

### Prerequisites

- **Node.js** 18+ (use `nvm use` for correct version)
- **Yarn** or **pnpm** package manager

### Getting Started

```bash
# Clone the repository
git clone https://github.com/real-token/realt-interface-commons
cd realt-interface-commons

# Install dependencies
yarn install

# Start development server for example app
yarn dev

# Build the library
yarn build

# Run tests
yarn test

# Lint code
yarn lint
```

### Project Structure

```
realt-interface-commons/
├── packages/
│   └── realt-commons/          # 📚 Main library package
│       ├── src/
│       │   ├── components/     # 🧩 React components
│       │   ├── hooks/          # 🔗 Custom hooks
│       │   ├── providers/      # ⚙️ React providers
│       │   ├── theme/          # 🎨 Mantine theme
│       │   ├── web3/           # 🌐 Web3 integration
│       │   ├── i18next/        # 🌍 Internationalization
│       │   └── utils/          # 🔧 Utility functions
│       └── package.json
├── apps/
│   └── realt-commons-example/  # 🎯 Example application
│       ├── src/
│       └── package.json
└── docs/                       # 📖 Documentation
```

## 🌐 Web3 Integration

### Supported Wallets

- **🦊 MetaMask** - Browser extension wallet
- **🔗 WalletConnect V2** - Mobile wallets via QR code
- **🛡️ Gnosis Safe** - Multi-signature wallet support
- **👁️ Read-Only** - View-only mode without wallet connection

### Supported Networks

The library supports all major Ethereum networks and layer 2 solutions. Chain configuration is handled automatically with the ability to add custom networks.

## 🎨 Theming

RealT Commons includes a beautiful theme system built on Mantine v7:

- **🌟 Brand Colors** - Golden color palette (`#F6CA79` to `#9A6709`)
- **🌓 Dark/Light Mode** - Automatic theme switching with keyboard shortcut (Cmd+J)
- **📱 Responsive** - Mobile-first design with consistent breakpoints
- **🎯 Customizable** - Easy theme extension and customization

## 🌍 Internationalization

Built-in support for multiple languages:

- **🇫🇷 French** - Complete translation
- **🇺🇸 English** - Complete translation
- **🇪🇸 Spanish** - Complete translation

Easy to extend with additional languages and custom namespaces.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on:

- Code style and conventions
- Pull request process
- Issue reporting
- Development workflow

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🔗 Links

- **📦 NPM Package**: [@realtoken/realt-commons](https://www.npmjs.com/package/@realtoken/realt-commons)
- **🏠 RealToken Website**: [https://realtoken.com](https://realtoken.com)
- **💬 Discord Community**: [Join our Discord](https://discord.gg/realtoken)
- **🐛 Issues & Bug Reports**: [GitHub Issues](https://github.com/real-token/realt-interface-commons/issues)

## 💎 Built With

- **⚛️ React 18** - Modern React with concurrent features
- **🎨 Mantine v7** - React components and hooks library
- **🌐 Web3-React v8** - Web3 React framework
- **📘 TypeScript** - Type-safe JavaScript
- **⚡ Vite** - Fast build tool and dev server
- **🗂️ Zustand** - Lightweight state management
- **⚛️ Jotai** - Primitive and flexible state management
- **🌍 i18next** - Internationalization framework

---

**Made with ❤️ by the RealToken team**
