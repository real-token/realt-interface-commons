const common = {
  "footer": {
    "copyright": "© {{year}} RealT. All rights reserved."
  },
  "select": {
    "noOption": "No options"
  },
  "settings": {
    "title": "Language",
    "french": "French",
    "english": "English",
    "spanish": "Spanish",
    "light": "Light",
    "dark": "Dark"
  },
  "wallet": {
    "title": "Connect wallet",
    "control": "Connect wallet",
    "copy": "Copy address",
    "viewOn": "View on explorer",
    "disconnect": "Disconnect",
    "network": "Network",
    "DisabledGnosisSafe": "Direct connection to Safe is not possible, to connect to a GnosisSafe, please go to safe.global and connect to your Safe. In the \"App\" section, add a \"custom app\" using the url of the yam website (https://yam.realtoken.network). You will be able to have the YAM directly in the interface of your Safe"
  },
  "header": {
    "notAllowedNetwork": "You are currently connected to YAM on unsupported Network, ",
    "switchNetwork": "click here to switch to {{networkName}}"
  },
  "general": {
    "loading": "loading...",
    "comingSoon": "Coming soon...",
    "noConnectedWallet": "Please connect a wallet to load the application (Help : at the botton right)",
    "nextButton": "Next",
    "noAdminError": "You are not an admin."
  }
} as const;

export default common;