## v3.3.0 — Mise à jour MASSIVE (2026-06-08)

### 🪙 Système d'Économie Complet
#### `.coins` — Portefeuille
- Voir votre solde en poche et en banque
- Affichage inventaire et métier actuel

#### `.bank depot|retrait <montant>` — Banque
- Déposer et retirer des coins (capacité max: 5000)
- `depot tout` pour tout déposer d'un coup

#### `.shop [liste|acheter|inventaire]` — Boutique
- 8 objets: Bouclier (anti-vol), Amulette XP, Extension banque, Pack cartes...
- Système d'inventaire persistant par joueur

#### `.job [liste|choisir|travailler]` — Métiers
- 8 métiers: Mineur, Marchand, Assassin, Sorcier, Forgeron, Chasseur, Alchimiste, Gladiateur
- Gains basés sur cooldown + XP du métier (bonus jusqu'à +100%)

#### `.pay @mention <montant>` — Paiement
- Transfert direct de coins entre joueurs

#### `.rob @mention` — Vol
- 55% chance de succès, 10-30% des coins volés
- Bouclier protège contre le vol
- Cooldown 3h, pénalité si échec

### ⚔️ RPG Textuel Complet
#### `.rpg creer <nom> <classe>` — Créer un héros
- 6 classes: Guerrier, Mage, Assassin, Paladin, Archer, Nécromancien
- Stats uniques par classe (HP, ATK, DEF, Mana)

#### `.rpg donjon` — Explorer
- 5 donjons progressifs (niveaux 1 → 40+)
- Ennemis: Gobelin, Zombie, Vampire, Golem, Liche...
- 3 boss légendaires: Dragon Rouge, Seigneur Démon, AZRAEL

#### Système de combat
- Coups critiques selon la classe
- Contre-attaques ennemies
- Mort → respawn à 30% HP
- `.rpg attaquer` | `.rpg fuir` | `.rpg soigner`
- Gain XP + or + Level Up avec amélioration des stats

#### `.rpg classement` — Top 10 héros

### 🏰 Guildes
#### `.guild creer|rejoindre|quitter|membres|liste`
- Créer sa guilde avec nom + tag unique
- Classement par XP
- Rôles: chef / membre

### 💒 Mariage
#### `.mariage proposer|accepter|refuser|divorcer`
- Demandes en mariage avec @mention
- Expire après 5 minutes
- Affiche durée du mariage

### 🐾 Animaux Virtuels
#### `.pet adopter|nourrir|jouer`
- 8 espèces: Loup, Dragon, Faucon, Serpent, Lion, Renard, Licorne...
- Statistiques: Faim, Bonheur, Santé (décroissance naturelle)
- XP et niveaux pour l'animal

### 🃏 Cartes à Collectionner
#### `.card [tirer|collection]`
- 14 cartes (Communes 60% / Rares 30% / Épiques 8% / Légendaires 2%)
- ⛧ LORD DEMON et 💀 AZRAEL en légendaires
- Cooldown 30min par tirage gratuit
- Packs achetables en boutique

### 🔍 Recherche Intégrée
#### `.google <recherche>` — DuckDuckGo
- Réponse directe + résultats liés
- Liens directs
- Fonctionne sans API key

#### `.stackoverflow <question>` — StackOverflow
- 3 résultats les plus votés
- Indique si la question est répondue
- Liens directs

### 🎱 Bingo Démoniaque
#### `.bingo [tirer|stop]`
- Grille B-I-N-G-O 5x5 générée aléatoirement
- Case FREE centrale
- Détection victoire: lignes, colonnes, diagonales
- Affichage visuel ASCII avec ✅ et 🟢

### 📊 Stats
- **+15 nouvelles commandes** (total: ~160 commandes)
- **+2 nouvelles libs** (economySystem.js, rpgSystem.js)
- **+3 nouvelles catégories** (Économie, RPG, Social)
- Toutes les nouvelles tables SQLite dans `data/demon.db`


## v3.2.0 — 8 Nouvelles commandes (2026-06-08)

### 🎮 Nouveaux Mini-Jeux

#### 🃏 Blackjack (`.blackjack`)
- Jeu complet contre le Démon : tirer, rester, blackjack naturel
- Détection bust, victoire/défaite/égalité, système de mise
- Commandes: `.blackjack tirer` | `.blackjack rester` | `.blackjack stop`

#### 🎭 Pendu (`.pendu`)
- 200+ mots français par catégorie (animaux, pays, sports, technologie...)
- 6 tentatives avec dessin ASCII du pendu étape par étape
- Système d'indices (révèle une lettre, -1 vie), deviner le mot entier
- Commandes: `.pendu <lettre>` | `.pendu mot <mot>` | `.pendu indice` | `.pendu stop`

#### 🎰 Machine à Sous (`.slot`)
- 9 symboles démoniaques avec poids différents (💀 Crâne jackpot x100)
- Système de streak/combo, cooldown 15 secondes
- Animations avec édition du message, barre de progression

#### ⚔️ Défis (`.defi`)
- 25+ questions (mathématiques, culture générale, vitesse/traduction)
- Timer 30 secondes, scores personnels, ratio victoires/défaites
- Commandes: `.defi` | `.defi score` | `.defi stop`

#### ✅ Vrai ou Faux (`.vraifaux`)
- 15 affirmations vraies/fausses avec explications détaillées
- Thèmes variés: sciences, géographie, histoire, animaux, technologie
- Commandes: `.vraifaux vrai` | `.vraifaux faux`

#### ⚡ Maths Rapides (`.mathrapide`)
- Calculs contre la montre (20 secondes) avec 3 niveaux: facile, moyen, difficile
- Système de streaks et meilleur score personnel
- Commandes: `.mathrapide [facile|moyen|difficile]` | `.mathrapide score`

#### 🔤 Anagramme (`.anagramme`)
- 20 mots thématiques (monde démoniaque) à reconstituer depuis les lettres mélangées
- Système d'indices avec description, jamais le même ordre
- Commandes: `.anagramme <réponse>` | `.anagramme indice` | `.anagramme stop`

### 🔢 Nouvelle Commande Utilitaire

#### 🔢 Convertisseur Universel (`.convertir`)
- Longueur: km, m, cm, mm, mile, ft, inch
- Poids: kg, g, mg, tonne, lb, oz
- Température: °C, °F, Kelvin
- Vitesse: km/h, mph, m/s, nœuds
- Données: b, kb, mb, gb, tb
- Temps: sec, min, heure, jour, semaine, mois, an
- Usage: `.convertir 10 km en miles` | `.convertir 100 c en f`

### 📝 Enregistrement
- Toutes les nouvelles commandes enregistrées dans `lib/commandRegistry.js`
- Catégorie "Jeux" mise à jour (+7 jeux)
- Catégorie "Utilitaires" mise à jour (+1 outil)


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
