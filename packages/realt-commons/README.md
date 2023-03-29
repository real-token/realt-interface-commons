[![Publish Package to npmjs](https://github.com/real-token/realt-interface-commons/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/real-token/realt-interface-commons/actions/workflows/ci-cd.yaml)

## Links
[]()
[]()
[]()

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

### Technologies used

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

# How does it works ?
To build the library and be able to publish it to npm we need to bundle it: create a unique file containing everything (components, hooks, utils, etc...).
</br>
Tools used to bundle are called `bundlers` and there are a lot.
We decided to used [rollup](https://rollupjs.org/) through [vite.js](https://vitejs.dev/) [library mode](https://vitejs.dev/guide/build.html#library-mode).

# How to use it ?

## How install the package ?
```
# With npm
npm i @realtoken/realt-commons

# With yarn
yarn add @realtoken/realt-commons
```
## How to build the package ?
```
npm run build
# or
yarn build
```

Now you will have a dist folder in your root folder, containing bundle files:
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

# Contributing
