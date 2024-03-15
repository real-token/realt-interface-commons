[![Publish Package to npmjs](https://github.com/real-token/realt-interface-commons/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/real-token/realt-interface-commons/actions/workflows/ci-cd.yaml)

## Links
- [RealT-commons 🧰](#realt-commons-)
  - [Stack](#stack)
  - [Technologies used](#technologies-used)
      - [React](#react)
      - [Typescript](#typescript)
      - [Mantine](#mantine)
      - [web3-react](#web3-react)
      - [Jotai](#jotai)
      - [Eslint and Prettier](#eslint-and-prettier)
      - [dotenv](#dotenv)
- [Documentation structuration](#documentation-structuration)
    - [User](#user)
    - [Developer:](#developer)
- [User doc](#user-doc)
  - [How install the package ?](#how-install-the-package-)
  - [Setup](#setup)
    - [\[MANDATORY\] Realt provider ](#mandatory-realt-provider-)
    - [Web3](#web3)
      - [How does is works ?](#how-does-is-works-)
      - [Web3 networks (chain)](#web3-networks-chain)
        - [Defaults chains](#defaults-chains)
        - [Custom chain](#custom-chain)
      - [Available connectors in library](#available-connectors-in-library)
        - [Metamask](#metamask)
        - [Gnosis Safe](#gnosis-safe)
        - [Wallet Connect V2](#wallet-connect-v2)
        - [Read Only](#read-only)
        - [Frame (coming soon)](#frame-coming-soon)
    - [Providers](#providers)
      - [Web3 provider (Web3Providers)](#web3-provider-web3providers)
      - [MantineProviders](#mantineproviders)
    - [Translation](#translation)
  - [Modules](#modules)
    - [Layout and built-in components](#layout-and-built-in-components)
      - [Customizing theme](#customizing-theme)
  - [Modals](#modals)
    - [Add provider](#add-provider)
    - [Create new modals](#create-new-modals)
    - [Use my custom modals](#use-my-custom-modals)
    - [Customize modals theme](#customize-modals-theme)
- [Developer doc](#developer-doc)
  - [How does the library is structured ?](#how-does-the-library-is-structured-)
  - [How to build the package ?](#how-to-build-the-package-)
  - [How to use package localy ?](#how-to-use-package-localy-)
  - [Handle translation](#handle-translation)
- [Contributing](#contributing)

# RealT-commons 🧰
RealT-interface-commons is a toolkit designs to help realt's community devs to create unified interfaces.
This toolkit is base

Some cool features:
- Web3 wallet connection modal
- Header and Footer
- Filtering hook

## Stack
This toolkit has strong dependency with react and [mantine](https://mantine.dev/).

But you are free to use any web framework you want: [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), [Express](https://expressjs.com/), [React routing](https://reactrouter.com/en/main), etc...

## Technologies used

#### [React](https://reactjs.org/)
React is used to create dynamic interface.

#### [Typescript](https://www.typescriptlang.org/)
Typescript is a top-layer technology used to typed (add boolean, number etc...) types to javascript. It also significantly reduces errors during development.

#### [Mantine](https://mantine.dev/)
Mantine is the UI development kit we choosed to create the YAM interface.
We choose it because Mantine is under intensive developmenent and is opensource.
It also perfectly match with React, our front-end framework.

#### [web3-react](https://github.com/Uniswap/web3-react)
Web3-react is a typescript/javascript library used to connect YAM to blockchain through different wallet: Injected (Metamask, Frame, etc...), Coinbase, Wallet-connect, etc...

#### [Jotai](https://jotai.org/)
Jotai is a small state manager.
</br>

#### [Eslint](https://eslint.org/) and [Prettier](https://github.com/prettier/prettier)
EsLint and Prettier are too software used to check and clean code, and check for synthax errors into the code.

#### [dotenv](https://www.npmjs.com/package/dotenv)
DotEnv is a library used to read environement variable from `.env` file.

# Documentation structuration
The documentation is divided in two distinct parts, for two different profile.
### User
This part of the doc is dedicated for people who wants to use the library in one of their project. </br>
[User doc](# User doc)

### Developer: 
This part of the doc is dedicated for developers who wants to modify/contribute to the library's development.</br>
[User doc]()

# User doc

## How install the package ?
```
# With npm
npm i @real-token/realt-commons

# With yarn
yarn add @real-token/realt-commons
```
<a name="mandatory-packages">**Also some mandatory packages are also needed:**</a>

```
yarn add react-i18next i18next
```
More infos:
| Package name  | Utilization |
|---|---|
| react-i18next  | Used for translation  |
|  i18next | Used for translation  |

## Setup

### <a name="realt-provider">[MANDATORY] Realt provider </a>
**Requirement**: </br>
You need to install [mandatory packages](#mandatory-packages).
</br></br>

The `RealtProvider` component is a key and **mandatory** component to work with `realt-commonns` library.
To setup it wrap your entire application within it (e.g in next it's in the `_app.tsx` component):
```tsx
<RealtProvider
  value={{ ...values }}
>
  ...others providers
</RealtProvicer>
```
Values are object like: </br>
| Key name | Description | Values | Default value  |
|---|---|---|---|
| env  |  Wanted environement  | (`"production"` or `"staging"` or `"development"`) or from [environment constant file.](https://github.com/real-token/realt-interface-commons/blob/master/packages/realt-commons/src/config/constants/env.ts) | "production" (`environment.PRODUCTION`)  |
| showAllNetworks  | Define if networks marked as testnet should be available in DAPP or not.  | `true` or `false`  | `false`  |

### Web3
**Requirements**: </br>
Follow those steps:
- Follow the mandatory [RealtProvider](#realt-provider) step. </br>
- Add modals modules: [Modal module](#modals)
- Add the [Web3Providers](#web3-provider-web3providers) provider</br>
</br>

Web3 connection is handled internaly by [@web3-react](#web3-react) package.
Connections are handled by "connectors. You can check the connectors list [here](https://github.com/Uniswap/web3-react) (**‼️ not every connectors are compatible**).

#### How does is works ?
When we developed the library, we tried to make it as modular as possible. That's why the connectors must be instantiated in a certain way.

When you have created you [Web3Providers](#web3-provider-web3providers) provider, you should have given a `libraryConnectors` object.
This object is teh key to connect your Dapp with the web3.
You can instantiate a `libraryConnectors` object like this:
```ts
import { getConnectors } from '@real-token/realt-commons';
const libraryConnectors = getConnectors({});
```
**IT'S MANDATORY** to instantiate `libraryConnectors` outside any react components to avoid re-rendering. Check [example website](https://github.com/real-token/realt-interface-commons/blob/57d3ecbf9ee87ac99214c7f8fb5932f450c5593c/apps/realt-commons-example/src/main.tsx#L33).

#### Web3 networks (chain)
There is two different type of network in the library: `mainnet` and `testnet`.
You can add both of them.

##### Defaults chains
There are 


##### Custom chain

#### Available connectors in library

You can check [here](https://github.com/real-token/realt-interface-commons/blob/57d3ecbf9ee87ac99214c7f8fb5932f450c5593c/packages/realt-commons/src/web3/type.ts#L7) which connector is compatible with the library.

##### Metamask 
##### Gnosis Safe 
##### Wallet Connect V2 
##### Read Only
##### Frame (coming soon)

### Providers
Some providers are need to use library modules.

#### Web3 provider (Web3Providers)
The provider is needed when you want to deal with web3 connection.
you can create one by wrapping your app like this:
```tsx
import { Web3Providers } from '@real-token/realt-commons';
<Web3Providers libraryConnectors={libraryConnectors}>
  ... Other app components
</Web3Providers>
```

‼️ Provider will not work after this, you need to configure `libraryConnectors` details, by checking [web3 setup](#web3).

#### MantineProviders
**Requirements**: </br>
Follow the mandatory [RealtProvider](#realt-provider) step. </br>
  
[MantineProviders](https://github.com/real-token/realt-interface-commons/blob/master/packages/realt-commons/src/providers/MantineProviders.tsx) is a key component (a provider) when you want to use [built-in components](#layout-and-built-in-components), create new one, [customize theme](#customizing-theme) or [manage modals](#modals). 
</br></br>
First import the `MantineProviders` component from library, the wrap your application under [RealtProvider](#mandatory-realt-provider):
```tsx
import { MantineProviders, RealtProvider } from '@real-token/realt-commons';
<RealtProvider>
  <MantineProviders>
    ... your app component
  </MantineProviders>
</RealtProvider>
```

### Translation

## Modules
### Layout and built-in components
This library provides a buch of components that you can use to create interfaces.

#### Customizing theme
look at MantineProvider doc part

## <a name="modals">Modals</a>
This package internaly use `@mantine/modals` **(DON'T INSTALL IT, IT'S ALREADY INSTALLED)** to handles modals that are needed by others  modules/components.</br>

### Add provider
Follow the [MantineProviders](#mantineproviders) step to needed provider.

### Create new modals
Modals are created following the mantine [@mantine/modals](https://mantine.dev/others/modals/) documentation:
```tsx
import { ContextModalProps, modals } from "@mantine/modals"
import { FC } from "react"

interface MyTestModalProps{
  // You can put here variables you want to pass to your modals when you call it  
}
export const MyTestModal: FC<ContextModalProps<MyTestModalProps>> = () => {
    return(
        <>
            {'test'}
        </>
    )
}
```

After you need to pass them to the library, for that you can create a typescript (`.ts`) file, then import your modals:
```ts
export const modals: Record<string,FC<ContextModalProps<any>>> = {
  testModal: MyTestModal
};
```

Then give your object to `MantineProviders` provider:
```tsx
<MantineProviders modals={modals}>
  ...Other components
</MantineProviders>
```

### Use my custom modals
To use your custom modals, you first need to import `modals` object from `@mantine/modals` package then open a context modals.
Here is a example code:
```tsx
import { modals } from "@mantine/modals";

export const MyTestComponent = () => {
  return(
    <button
      onClick={() => modals.openContextModal({
        title:  'My Test modal',
        modal: 'testModal', // the key you put in your modal object at previous step
        innerProps: {} // if you want to pass variable to your modal
      })}
    >
      {'Open my custom modal'}
    </button>
  )
}
```

### Customize modals theme

Create a modal style typescript file (`.ts`):
```ts
export const modalStyles: ModalProps['styles'] = {
  header: {
    ... css variables
  },
  body: {
    ... css variables
  },
  root: { 
    ... css variables 
  },
  overlay: { 
    ... css variables 
  },
  inner: { 
    ... css variables
  },
  content: {
    ... css variables
  }
};
```

Then give your object to `MantineProviders` provider:
```tsx
<MantineProviders modalStyles={modalStyles}>
  ...Other components
</MantineProviders>
```

# Developer doc

## How does the library is structured ?
To build the library and be able to publish it to npm we need to bundle it: create a unique file containing everything (components, hooks, utils, etc...).
</br>
Tools used to bundle are called `bundlers` and there are a lot.
We decided to used [rollup](https://rollupjs.org/) through [vite.js](https://vitejs.dev/) [library mode](https://vitejs.dev/guide/build.html#library-mode).

## How to build the package ?
```
# With yan
npm run build

# With npm
yarn build
```

Now you will have a dist folder in your root folder, containing bundled files:
- `realt-commons.js` -> bundle file in common js format.
- `realt-commons.umd.js` -> bundle file in umd format.

and declarations files (*.d.ts).

## How to use package localy ?
Maybe you want to use this package localy.
For this:
```
# NPM
npm i 'PATH_TO_PACKAGE'

# YARN
yarn add 'PATH_TO_PACKAGE'
```

For example, in example website we used:
```
yarn add ../../packages/realt-commons
```

## Handle translation
(checker ) MantineProviders

# Contributing
