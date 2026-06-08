# 📋 CHANGELOG — LORD DEMON V2

## v3.1.0 — Mise à jour majeure (Non-AI)

### 🆕 Nouvelles fonctionnalités

#### 🗄️ Base de données SQLite (`lib/database.js`)
- Remplacement du stockage JSON fragmenté par SQLite (`better-sqlite3`)
- Tables : `users`, `bans`, `warns`, `notes`, `tickets`, `tournaments`, `webhooks`, `global_blacklist`, `reminders`
- Performances optimisées (WAL mode, index, transactions)
- API unifiée : `userDb`, `banDb`, `warnDb`, `noteDb`, `globalBlacklist`, `reminderDb`, `webhookDb`

#### 🛡️ Anti-raid intelligent (`lib/antiRaid.js`)
- Détection de pattern : comptes suspects (numéros >14 chiffres = bots)
- Niveaux de sévérité : 🟡 Moyen / 🟠 Élevé / 🔴 Critique
- Blacklist globale automatique des comptes suspects
- Rapport enrichi avec comptage par catégorie
- Attribution du badge "⚔️ Guerrier" aux admins pendant un raid
- Notification webhook automatique sur événement `raid`
- Historique des raids par groupe (20 derniers)

#### ⭐ Système XP enrichi (`lib/xpSystem.js`)
- 13 badges déblocables (niveaux, messages, spéciaux, tournois)
- Classement hebdomadaire séparé du classement global
- Cooldown anti-spam XP (10 secondes)
- Barre de progression améliorée (12 blocs)
- Emojis dynamiques par palier de niveau
- Attribution automatique de badges au level-up

#### 🎫 Système de tickets (`lib/ticketSystem.js` + `commands/ticket.js`)
- Ouverture, fermeture, liste par statut
- Génération d'IDs uniques (TKT-XXXXXX)
- Un seul ticket ouvert par utilisateur à la fois
- Commandes : `.ticket <sujet>`, `.ticket list`, `.ticket close <ID>`, `.ticket mien`

#### 🏆 Tournois multijoueurs (`lib/tournamentManager.js` + `commands/tournament.js`)
- Support : quiz, rps, tictactoe, coinflip, dice
- Phases : inscription → lancement → fin
- Badge "🏆 Champion" attribué au gagnant
- Historique des tournois par groupe
- Max 16 joueurs par tournoi

#### 🛡️ Auto-modération (`lib/autoModeration.js` + `commands/automod.js`)
- Détection de toxicité (insultes, menaces, escroqueries)
- Anti-spam patterns (CAPS lock, emoji flood, chars répétés)
- Liste noire de mots personnalisée par groupe
- Actions configurables : warn / delete / kick / mute
- Commandes : `.automod on/off`, `.automod addword`, `.automod setaction`

#### 🔌 Système de plugins (`lib/pluginManager.js` + `commands/plugin.js`)
- Chargement/déchargement de commandes sans redémarrage
- Auto-chargement au démarrage depuis `/plugins/`
- Création de templates : `.plugin create <nom>`
- Commandes : `.plugin load/unload/reload/loadall/list/run`

#### 📡 Webhooks externes (`lib/webhookManager.js` + `commands/webhook.js`)
- Notification d'URLs HTTPS sur événements bot
- Événements : message, join, leave, ban, warn, command, raid, level_up
- Configuration par groupe, sécurité HTTPS obligatoire
- Commandes : `.webhook add <url> [events]`, `.webhook remove <id>`

### 🔧 Améliorations existantes

#### 📊 `.rank` (amélioré)
- Rang global ET hebdomadaire
- Affichage des badges (4 premiers)
- Distance XP vers le joueur suivant
- Compteur de messages

#### 🏆 `.leaderboard` (amélioré)
- Mode hebdomadaire : `.leaderboard hebdo`
- Affichage du badge principal à côté du rang
- Position de l'utilisateur si hors du top

#### 👋 `.welcome` (amélioré)
- Affichage du niveau XP et badges du nouveau membre
- Variables enrichies : {level} {xp}
- Attribution badge "🌱 Nouveau" à la première visite
- Notification webhook automatique sur événement `join`
- Stockage en SQLite au lieu de JSON

#### 👤 `.profile` (amélioré)
- Intégration complète des badges
- Rang global affiché
- Vérification et attribution automatique des badges manquants

#### 🏅 `.badge` (nouvelle commande)
- Voir ses badges / badges d'un autre membre
- Liste de tous les badges disponibles avec conditions
- Attribuer / retirer un badge (Owner/Sudo)

### 📦 Dépendances
- Ajout : `better-sqlite3` ^9.4.3

### 🗂️ Nouvelle structure
```
lord-demon-v2/
├── lib/
│   ├── database.js          ← NOUVEAU — SQLite unifié
│   ├── xpSystem.js          ← NOUVEAU — XP enrichi
│   ├── ticketSystem.js      ← NOUVEAU — Tickets support
│   ├── tournamentManager.js ← NOUVEAU — Tournois
│   ├── autoModeration.js    ← NOUVEAU — Auto-mod
│   ├── pluginManager.js     ← NOUVEAU — Plugins hot-reload
│   ├── webhookManager.js    ← NOUVEAU — Webhooks
│   └── antiRaid.js          ← AMÉLIORÉ — Anti-raid intelligent
├── commands/
│   ├── ticket.js            ← NOUVEAU
│   ├── tournament.js        ← NOUVEAU
│   ├── automod.js           ← NOUVEAU
│   ├── plugin.js            ← NOUVEAU
│   ├── webhook.js           ← NOUVEAU
│   ├── badge.js             ← NOUVEAU
│   ├── rank.js              ← AMÉLIORÉ
│   ├── leaderboard.js       ← AMÉLIORÉ
│   ├── welcome.js           ← AMÉLIORÉ
│   └── profile.js           ← AMÉLIORÉ
└── plugins/                 ← NOUVEAU DOSSIER (vos plugins custom)
```

---
*LORD DEMON V2 — Vers la domination WhatsApp* ⛧
