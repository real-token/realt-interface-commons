const common = {
  "footer": {
    "copyright": "© {{year}} RealT. Tous droits réservés."
  },
  "select": {
    "noOption": "Aucune option"
  },
  "settings": {
    "title": "Langue",
    "french": "Français",
    "english": "Anglais",
    "spanish": "Espagnol",
    "light": "Clair",
    "dark": "Sombre"
  },
  "wallet": {
    "title": "Connecter mon portefeuille",
    "control": "Connecter mon portefeuille",
    "copy": "Copie d'adresse",
    "viewOn": "Voir sur l'explorateur",
    "disconnect": "Déconnexion",
    "network": "Réseau",
    "disabledGnosisSafe": "La connexion directe au Safe n'est pas possible, pour se connecter à un GnosisSafe, veuillez vous rendre sur safe.global et vous connecter à votre Safe. Dans la section \"Apps\", ajoutez une \"custom app\" en utilisant l'url du site yam (https://yam.realtoken.network). Vous pourrez alors avoir le YAM directement dans l'interface de votre safe.",
    "readOnly": {
      "title": "Lecture seul",
      "description": "Vous pouvez vous connecter à une adresse en mode lecture seule uniquement.",
      "inputPlaceholder": "Adresse ou ENS domain à visualier",
      "wrongAddressFormat": "Le format d'adresse ou de l'ENS domain n'est pas valide",
      "button": "Visualiser avec l'address"
    }
  }  ,
  "header": {
    "notAllowedNetwork": "Le réseau actuel n'est pas pris en charge par YAM, ",
    "switchNetwork": "se connecter à {{networkName}}"
  },
  "general": {
    "loading": "Chargement...",
    "comingSoon": "Bientôt disponible...",
    "noConnectedWallet": "S'il-vous-plaît connecter un portefeuille pour continuer (Aide : en bas à droite)",
    "nextButton": "Suivant",
    "noAdminError": "Vous n'êtes pas un admininistrateur"
  }
} as const;

export default common;
