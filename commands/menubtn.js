// commands/menubtn.js — LORD DEMON V2
// ══════════════════════════════════════════════════════════════
// MENU INTERACTIF INTELLIGENT — v3.0
// ══════════════════════════════════════════════════════════════
//
// Chaque commande a un TYPE qui détermine son comportement :
//
//   'exec'    → Exécute directement, sans argument
//   'arg'     → Affiche un panneau d'aide avec exemple d'utilisation
//   'toggle'  → Affiche 3 boutons : ✅ ON / ❌ OFF / 📊 Status
//   'danger'  → Affiche une confirmation ⚠️ avant d'exécuter
//   'media'   → Affiche 2 boutons : ⚡ Exécuter + ℹ️ Aide
//
// Le messageHandler intercepte les buttonId/rowId comme commandes tapées
// → ".antilink on" s'exécute comme si l'utilisateur l'avait tapé

import { config } from '../config.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname    = path.dirname(fileURLToPath(import.meta.url))
const COMMANDS_DIR = __dirname

// ══════════════════════════════════════════════════════════════
// BASE DE DONNÉES DES COMMANDES — type + méta
// ══════════════════════════════════════════════════════════════

const CMD_META = {
  // ── GÉNÉRAL ───────────────────────────────────────────────
  menu:        { type: 'exec',   icon: '📋', label: 'Menu complet',       desc: 'Voir tout le grimoire en texte' },
  help:        { type: 'arg',    icon: '☩',  label: 'Aide commande',      desc: 'Aide détaillée', example: '.help rank' },
  ping:        { type: 'exec',   icon: '⚡',  label: 'Ping',              desc: 'Tester la latence du démon' },
  info:        { type: 'exec',   icon: '🜏',  label: 'Infos système',     desc: 'Voir les infos du bot' },
  uptime:      { type: 'exec',   icon: '⏱️',  label: 'Uptime',            desc: 'Temps d\'activité' },
  whoami:      { type: 'exec',   icon: '🔍',  label: 'Qui suis-je ?',     desc: 'Ton rang & permissions' },
  // ── XP & CLASSEMENT ────────────────────────────────────────
  rank:        { type: 'exec',   icon: '📊',  label: 'Mon rang XP',       desc: 'Ton niveau, XP et progression' },
  leaderboard: { type: 'exec',   icon: '🏆',  label: 'Classement global', desc: 'Top 10 du groupe' },
  profile:     { type: 'exec',   icon: '👤',  label: 'Mon profil',        desc: 'Profil complet + badges' },
  badge:       { type: 'exec',   icon: '🏅',  label: 'Mes badges',        desc: 'Voir et gérer tes badges' },
  daily:       { type: 'exec',   icon: '🎁',  label: 'Daily XP',          desc: 'Bonus quotidien d\'XP' },
  cmdinfo:     { type: 'arg',    icon: '📝',  label: 'Info commande',     desc: 'Stats d\'usage', example: '.cmdinfo rank' },
  // ── MÉDIAS ─────────────────────────────────────────────────
  song:        { type: 'arg',    icon: '🎵',  label: 'Télécharger musique',desc: 'Télécharger un MP3', example: '.song Eminem Lose Yourself' },
  ytmp4:       { type: 'arg',    icon: '🎬',  label: 'Vidéo YouTube',     desc: 'Télécharger une vidéo', example: '.ytmp4 https://youtu.be/...' },
  sticker:     { type: 'media',  icon: '🎭',  label: 'Créer un sticker',  desc: 'Envoie une image puis .sticker', example: 'Envoie une image + .sticker' },
  image:       { type: 'arg',    icon: '🖼️',  label: 'Chercher image',    desc: 'Recherche d\'images HD', example: '.image paysage montagne' },
  tts:         { type: 'arg',    icon: '🔊',  label: 'Texte en vocal',    desc: 'Convertir texte en voix', example: '.tts Bonjour tout le monde' },
  lyrics:      { type: 'arg',    icon: '🎤',  label: 'Paroles',           desc: 'Paroles synchronisées', example: '.lyrics Stromae Papaoutai' },
  download:    { type: 'arg',    icon: '⬇️',  label: 'Télécharger URL',   desc: 'Télécharger depuis une URL', example: '.download https://...' },
  // ── UTILITAIRES ────────────────────────────────────────────
  weather:     { type: 'arg',    icon: '🌦️',  label: 'Météo',             desc: 'Météo en temps réel', example: '.weather Paris' },
  translate:   { type: 'arg',    icon: '🌍',  label: 'Traduction',        desc: 'Traduire un texte', example: '.translate en Bonjour' },
  calc:        { type: 'arg',    icon: '🧮',  label: 'Calculatrice',      desc: 'Calcul scientifique', example: '.calc 2 * (3+4) ^ 2' },
  qrcode:      { type: 'arg',    icon: '🔳',  label: 'QR Code',           desc: 'Générer un QR Code', example: '.qrcode https://google.com' },
  poll:        { type: 'arg',    icon: '📊',  label: 'Sondage',           desc: 'Créer un vote', example: '.poll Couleur?|Rouge|Bleu|Vert' },
  remind:      { type: 'arg',    icon: '⏰',  label: 'Rappel',            desc: 'Rappel programmable', example: '.remind 30m Réunion importante' },
  schedule:    { type: 'arg',    icon: '📆',  label: 'Planifier',         desc: 'Message planifié', example: '.schedule 08:00 Bonjour !' },
  quote:       { type: 'exec',   icon: '💬',  label: 'Citation',          desc: 'Citation inspirante du démon' },
  joke:        { type: 'exec',   icon: '💀',  label: 'Blague',            desc: 'Blague aléatoire premium' },
  horoscope:   { type: 'arg',    icon: '⭐',  label: 'Horoscope',         desc: 'Horoscope détaillé', example: '.horoscope scorpion' },
  // ── JEUX ──────────────────────────────────────────────────
  quiz:        { type: 'exec',   icon: '🧠',  label: 'Quiz',              desc: 'Question culture générale' },
  tictactoe:   { type: 'arg',    icon: '☠️',  label: 'Morpion',           desc: 'Jouer contre quelqu\'un', example: '.tictactoe @joueur' },
  rps:         { type: 'arg',    icon: '✊',  label: 'Pierre Feuille',    desc: 'Choisir une option', example: '.rps pierre' },
  coinflip:    { type: 'exec',   icon: '🪙',  label: 'Pile ou face',      desc: 'Lancer une pièce animée' },
  dare:        { type: 'exec',   icon: '🎲',  label: 'Défi du démon',     desc: 'Défi aléatoire' },
  ship:        { type: 'arg',    icon: '🔥',  label: 'Ship amour',        desc: 'Compatibilité entre 2 membres', example: '.ship @user1 @user2' },
  tournament:  { type: 'arg',    icon: '🏆',  label: 'Tournoi',           desc: 'Créer un tournoi', example: '.tournament create MonTournoi' },
  // ── GROUPE ─────────────────────────────────────────────────
  kick:        { type: 'danger', icon: '⚰️',  label: 'Expulser membre',   desc: 'Expulser @membre du groupe', example: '.kick @membre', confirm: 'Expulser ce membre ?' },
  ban:         { type: 'danger', icon: '🚫',  label: 'Bannir membre',     desc: 'Bannir @membre définitivement', example: '.ban @membre', confirm: 'Bannir ce membre ?' },
  kickall:     { type: 'danger', icon: '💥',  label: 'Expulser TOUS',     desc: 'Expulser tous les membres ⚠️', example: '.kickall', confirm: '⚠️ EXPULSER TOUS LES MEMBRES ?' },
  mute:        { type: 'toggle', icon: '🔇',  label: 'Fermer groupe',     desc: 'Seuls les admins peuvent parler', toggle: 'mute' },
  unmute:      { type: 'exec',   icon: '🔊',  label: 'Ouvrir groupe',     desc: 'Tout le monde peut parler' },
  tagall:      { type: 'arg',    icon: '📢',  label: 'Tag All',           desc: 'Mentionner tous les membres', example: '.tagall Message important !' },
  hidetag:     { type: 'arg',    icon: '👻',  label: 'Hidetag',           desc: 'Mention discrète', example: '.hidetag Message secret' },
  welcome:     { type: 'toggle', icon: '🕯️',  label: 'Message bienvenue', desc: 'Activer/désactiver les welcomes', toggle: 'welcome' },
  goodbye:     { type: 'toggle', icon: '⚰️',  label: 'Message au revoir', desc: 'Activer/désactiver les goodbyes', toggle: 'goodbye' },
  rules:       { type: 'arg',    icon: '📜',  label: 'Règles',            desc: 'Voir/définir les règles', example: '.rules' },
  warn:        { type: 'arg',    icon: '⚠️',  label: 'Avertir',           desc: 'Donner un avertissement', example: '.warn @membre Raison' },
  unwarn:      { type: 'arg',    icon: '🩸',  label: 'Retirer warn',      desc: 'Retirer un avertissement', example: '.unwarn @membre' },
  warnlist:    { type: 'exec',   icon: '📋',  label: 'Liste warns',       desc: 'Voir tous les avertissements' },
  promote:     { type: 'arg',    icon: '⬆️',  label: 'Promouvoir admin',  desc: 'Promouvoir en administrateur', example: '.promote @membre' },
  demote:      { type: 'arg',    icon: '⬇️',  label: 'Rétrograder admin', desc: 'Rétrograder un administrateur', example: '.demote @membre' },
  add:         { type: 'arg',    icon: '➕',  label: 'Ajouter membre',    desc: 'Ajouter quelqu\'un au groupe', example: '.add 2250700000000' },
  // ── PROTECTIONS ────────────────────────────────────────────
  antilink:    { type: 'toggle', icon: '🔗',  label: 'Anti-liens',        desc: 'Bloquer les liens automatiquement', toggle: 'antilink' },
  antispam:    { type: 'toggle', icon: '📵',  label: 'Anti-spam',         desc: 'Bloquer le spam intelligent', toggle: 'antispam' },
  antiflood:   { type: 'toggle', icon: '🌊',  label: 'Anti-flood',        desc: 'Bloquer les floods de messages', toggle: 'antiflood' },
  antimention: { type: 'toggle', icon: '📵',  label: 'Anti-mention',      desc: 'Bloquer les mentions abusives', toggle: 'antimention' },
  antiword:    { type: 'toggle', icon: '🚫',  label: 'Anti-mots',         desc: 'Filtrer les mots bannis', toggle: 'antiword' },
  antichannel: { type: 'toggle', icon: '📡',  label: 'Anti-chaîne',       desc: 'Bloquer transferts de chaînes', toggle: 'antichannel' },
  antidemote:  { type: 'toggle', icon: '⛧',  label: 'Anti-démotion',     desc: 'Empêcher dégradation admins', toggle: 'antidemote' },
  automod:     { type: 'toggle', icon: '🤖',  label: 'Auto-modération',   desc: 'Modération automatique IA', toggle: 'automod' },
  ticket:      { type: 'arg',    icon: '🎫',  label: 'Tickets support',   desc: 'Système de tickets', example: '.ticket new Problème de connexion' },
  webhook:     { type: 'arg',    icon: '📡',  label: 'Webhooks',          desc: 'Notifs vers Discord etc.', example: '.webhook add https://...' },
  // ── OWNER ──────────────────────────────────────────────────
  broadcast:   { type: 'arg',    icon: '📡',  label: 'Broadcast',         desc: 'Diffusion vers tous les groupes', example: '.broadcast Message important' },
  plugin:      { type: 'arg',    icon: '🔌',  label: 'Plugins',           desc: 'Gérer les plugins', example: '.plugin list' },
  backup:      { type: 'exec',   icon: '💾',  label: 'Backup données',    desc: 'Sauvegarder toutes les données' },
  reload:      { type: 'exec',   icon: '♻️',  label: 'Recharger cmds',    desc: 'Recharger toutes les commandes' },
  restart:     { type: 'danger', icon: '🔄',  label: 'Redémarrer bot',    desc: 'Redémarrage complet du système', confirm: 'Redémarrer le bot ?' },
  eval:        { type: 'arg',    icon: '💻',  label: 'Eval JavaScript',   desc: 'Exécuter du code JS', example: '.eval console.log("test")' },
  addpremium:  { type: 'arg',    icon: '💎',  label: 'Ajouter premium',   desc: 'Donner le statut premium', example: '.addpremium @membre' },
  stats:       { type: 'exec',   icon: '📈',  label: 'Statistiques bot',  desc: 'Stats globales du bot' },
  logs:        { type: 'exec',   icon: '📓',  label: 'Logs actions',      desc: 'Journal des actions admin' },
}

// ══════════════════════════════════════════════════════════════
// CATÉGORIES DU MENU
// ══════════════════════════════════════════════════════════════

const MENU_CATEGORIES = [
  {
    id: 'general',
    title: 'GÉNÉRAL',
    icon: '☩',
    desc: 'Menu, aide, ping, infos',
    cmds: ['menu', 'help', 'ping', 'info', 'uptime', 'whoami']
  },
  {
    id: 'xp',
    title: 'XP & RANG',
    icon: '⭐',
    desc: 'Niveaux, badges, classements',
    cmds: ['rank', 'leaderboard', 'profile', 'badge', 'daily', 'cmdinfo']
  },
  {
    id: 'media',
    title: 'MÉDIAS',
    icon: '🎵',
    desc: 'Musique, vidéo, stickers',
    cmds: ['song', 'ytmp4', 'sticker', 'image', 'tts', 'lyrics', 'download']
  },
  {
    id: 'utils',
    title: 'UTILITAIRES',
    icon: '🔧',
    desc: 'Météo, traduction, calcul...',
    cmds: ['weather', 'translate', 'calc', 'qrcode', 'poll', 'remind', 'quote', 'joke', 'horoscope']
  },
  {
    id: 'games',
    title: 'JEUX',
    icon: '🎮',
    desc: 'Quiz, morpion, tournoi...',
    cmds: ['quiz', 'tictactoe', 'rps', 'coinflip', 'dare', 'ship', 'tournament']
  },
  {
    id: 'group',
    title: 'GROUPE',
    icon: '👥',
    desc: 'Gestion & modération groupe',
    cmds: ['kick', 'ban', 'mute', 'unmute', 'tagall', 'hidetag', 'welcome', 'goodbye', 'warn', 'unwarn', 'warnlist', 'promote', 'demote', 'add', 'rules']
  },
  {
    id: 'protection',
    title: 'PROTECTIONS',
    icon: '🛡️',
    desc: 'Anti-raid, spam, liens...',
    cmds: ['antilink', 'antispam', 'antiflood', 'antimention', 'antiword', 'antichannel', 'antidemote', 'automod', 'ticket', 'webhook']
  },
  {
    id: 'owner',
    title: 'OWNER',
    icon: '👑',
    desc: 'Commandes réservées',
    cmds: ['broadcast', 'plugin', 'backup', 'reload', 'restart', 'eval', 'addpremium', 'stats', 'logs']
  }
]

// ══════════════════════════════════════════════════════════════
// UTILITAIRES
// ══════════════════════════════════════════════════════════════

function trunc(str, max) {
  return str && str.length > max ? str.slice(0, max - 1) + '…' : (str || '')
}

function getCommandFiles() {
  try {
    return new Set(
      fs.readdirSync(COMMANDS_DIR)
        .filter(f => f.endsWith('.js'))
        .map(f => path.basename(f, '.js'))
    )
  } catch { return new Set() }
}

function getMeta(cmdId) {
  return CMD_META[cmdId] || { type: 'exec', icon: '⛧', label: cmdId, desc: 'Commande bot' }
}

// ══════════════════════════════════════════════════════════════
// MENU PRINCIPAL — Liste des catégories
// ══════════════════════════════════════════════════════════════

async function sendMainMenu(sock, sender, ctx) {
  const prefix   = config.prefix || '.'
  const botName  = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'
  const cmdFiles = getCommandFiles()

  const totalCmds = MENU_CATEGORIES.reduce(
    (n, cat) => n + cat.cmds.filter(c => cmdFiles.has(c)).length, 0
  )

  // Groupe 1 : fun/utilisateur
  const sec1 = {
    title: '🎮 Commandes & divertissement',
    rows: MENU_CATEGORIES.slice(0, 4).map(cat => {
      const avail = cat.cmds.filter(c => cmdFiles.has(c)).length
      return {
        title:       trunc(`${cat.icon} ${cat.title}`, 24),
        description: trunc(`${cat.desc} (${avail} sorts)`, 72),
        rowId:       `${prefix}menubtn ${cat.id}`
      }
    })
  }

  // Groupe 2 : admin/owner
  const sec2 = {
    title: '⚙️ Administration & système',
    rows: [
      ...MENU_CATEGORIES.slice(4).map(cat => {
        const avail = cat.cmds.filter(c => cmdFiles.has(c)).length
        return {
          title:       trunc(`${cat.icon} ${cat.title}`, 24),
          description: trunc(`${cat.desc} (${avail} sorts)`, 72),
          rowId:       `${prefix}menubtn ${cat.id}`
        }
      }),
      {
        title:       '⚡ Accès rapide',
        description: 'Top commandes en 1 tap',
        rowId:       `${prefix}menubtn quick`
      }
    ]
  }

  const headerText =
    `╔══〔 ☠ *${botName}* ☠ 〕══╗\n\n` +
    `┃ 🩸 *${totalCmds}* commandes invoquées\n` +
    `┃ 📋 *${MENU_CATEGORIES.length}* cercles du grimoire\n\n` +
    `┃ *Comment utiliser :*\n` +
    `┃  ① Appuie sur *🩸 Ouvrir le Grimoire* ↓\n` +
    `┃  ② Sélectionne une catégorie\n` +
    `┃  ③ Choisis une commande\n` +
    `┃  ④ Elle s'exécute immédiatement ✅\n\n` +
    `╚══════════════════════════╝`

  try {
    await sock.sendMessage(sender, {
      text: headerText,
      footer: `⛧ LORD-DEMON Technology — Grimoire v3`,
      title: `☠ GRIMOIRE INTERACTIF`,
      buttonText: `🩸 Ouvrir le Grimoire`,
      sections: [sec1, sec2],
      listType: 1
    })
  } catch {
    await sendFallback(sock, sender, prefix, botName)
  }
}

// ══════════════════════════════════════════════════════════════
// SOUS-MENU CATÉGORIE — Liste des commandes avec type visible
// ══════════════════════════════════════════════════════════════

async function sendCategoryMenu(sock, sender, catId, ctx) {
  const prefix   = config.prefix || '.'
  const botName  = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'
  const cat      = MENU_CATEGORIES.find(c => c.id === catId)
  const cmdFiles = getCommandFiles()

  if (!cat) return sendMainMenu(sock, sender, ctx)

  const availCmds = cat.cmds.filter(c => cmdFiles.has(c))
  if (!availCmds.length) {
    return sock.sendMessage(sender, { text: `❌ Aucune commande disponible dans *${cat.title}*.` })
  }

  // Type badge pour la description
  const typeTag = {
    exec:   '⚡',  // Exécution directe
    arg:    '✏️',  // Besoin d'arguments
    toggle: '🔄',  // ON/OFF
    danger: '⚠️',  // Confirmation requise
    media:  '🖼️',  // Média requis
  }

  const rows = availCmds.map(cmdId => {
    const meta = getMeta(cmdId)
    const tag  = typeTag[meta.type] || '⚡'
    return {
      title:       trunc(`${meta.icon} ${meta.label}`, 24),
      description: trunc(`${tag} ${meta.desc}`, 72),
      rowId:       `${prefix}menubtn cmd ${cmdId}`   // → panneau commande
    }
  })

  // Ligne retour
  rows.push({
    title:       '← Retour aux catégories',
    description: 'Revenir au menu principal',
    rowId:       `${prefix}menubtn`
  })

  const legendText =
    `╔══〔 ${cat.icon} *${cat.title}* 〕══╗\n\n` +
    `┃ *${availCmds.length} commandes disponibles*\n` +
    `┃ 💡 Appuie sur une commande :\n` +
    `┃  ⚡ Exécution directe\n` +
    `┃  ✏️ Demande un argument → affiche l'aide\n` +
    `┃  🔄 Toggle → boutons ON/OFF\n` +
    `┃  ⚠️ Danger → demande confirmation\n\n` +
    `╚══════════════════════════╝`

  try {
    await sock.sendMessage(sender, {
      text: legendText,
      footer: `${botName} — ${cat.desc}`,
      title: `${cat.icon} ${cat.title}`,
      buttonText: `⚡ Choisir une commande`,
      sections: [{
        title: `${cat.icon} ${cat.title} (${availCmds.length})`,
        rows
      }],
      listType: 1
    })
  } catch {
    // Fallback boutons (3 max) + texte
    const btn3 = availCmds.slice(0, 3)
    try {
      await sock.sendMessage(sender, {
        text:
          `╔══〔 ${cat.icon} *${cat.title}* 〕══╗\n\n` +
          availCmds.map(id => {
            const m = getMeta(id)
            return `┃ ${m.icon} *${prefix}${id}* — ${m.desc}`
          }).join('\n') +
          `\n\n╚══════════════════════════╝`,
        footer: `Boutons rapides ↓`,
        buttons: btn3.map(id => {
          const m = getMeta(id)
          return { buttonId: `${prefix}menubtn cmd ${id}`, buttonText: { displayText: `${m.icon} ${m.label}` }, type: 1 }
        }),
        headerType: 1
      })
    } catch {
      await sock.sendMessage(sender, {
        text:
          `╔══〔 ${cat.icon} *${cat.title}* 〕══╗\n\n` +
          availCmds.map(id => {
            const m = getMeta(id)
            return `┃ ${m.icon} *${prefix}${id}* — ${m.desc}`
          }).join('\n') +
          `\n\n╚══════════════════════════╝`
      })
    }
  }
}

// ══════════════════════════════════════════════════════════════
// PANNEAU COMMANDE — Comportement selon le TYPE
// ══════════════════════════════════════════════════════════════

async function sendCommandPanel(sock, sender, cmdId, ctx) {
  const prefix  = config.prefix || '.'
  const botName = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'
  const meta    = getMeta(cmdId)

  switch (meta.type) {

    // ── EXEC : exécution directe ─────────────────────────────
    case 'exec': {
      await sock.sendMessage(sender, {
        text:
          `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
          `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
          `┃ 📝 *Sortilège :* ${meta.desc}\n\n` +
          `┃ ⚡ Lancement en cours...\n\n` +
          `╚══════════════════════════╝`,
        footer: `${botName}`
      })
      // Exécution directe → injecter la commande
      await _execCommand(sock, sender, cmdId, [], ctx)
      break
    }

    // ── ARG : affiche l'aide + bouton .help ──────────────────
    case 'arg': {
      try {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
            `┃ 📝 *Sortilège :* ${meta.desc}\n\n` +
            `┃ ✏️ *Cette commande demande des arguments.*\n` +
            `┃ 📖 *Exemple :*\n` +
            `┃   \`${meta.example || prefix + cmdId + ' <argument>'}\`\n\n` +
            `┃ Tape la commande dans le chat ↑\n\n` +
            `╚══════════════════════════╝`,
          footer: `${botName}`,
          buttons: [
            { buttonId: `${prefix}help ${cmdId}`, buttonText: { displayText: `📖 Aide complète` }, type: 1 },
            { buttonId: `${prefix}menubtn`,       buttonText: { displayText: `← Retour menu` },    type: 1 },
          ],
          headerType: 1
        })
      } catch {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
            `┃ 📝 ${meta.desc}\n` +
            `┃ 📖 *Exemple :* \`${meta.example || prefix + cmdId + ' <argument>'}\`\n\n` +
            `┃ 💡 Aide : *${prefix}help ${cmdId}*\n\n` +
            `╚══════════════════════════╝`
        })
      }
      break
    }

    // ── MEDIA : média requis ──────────────────────────────────
    case 'media': {
      try {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
            `┃ 📝 *Sortilège :* ${meta.desc}\n\n` +
            `┃ 🖼️ *Utilisation :*\n` +
            `┃   ${meta.example || 'Envoie un média + commande'}\n\n` +
            `╚══════════════════════════╝`,
          footer: `${botName}`,
          buttons: [
            { buttonId: `${prefix}help ${cmdId}`, buttonText: { displayText: `📖 Aide complète` }, type: 1 },
            { buttonId: `${prefix}menubtn`,       buttonText: { displayText: `← Retour menu` },    type: 1 },
          ],
          headerType: 1
        })
      } catch {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
            `┃ 📝 ${meta.desc}\n` +
            `┃ 🖼️ *Usage :* ${meta.example || 'Envoie un média + commande'}\n\n` +
            `╚══════════════════════════╝`
        })
      }
      break
    }

    // ── TOGGLE : boutons ON / OFF / STATUS ───────────────────
    case 'toggle': {
      try {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ 🩸 *Invocation :* \`${prefix}${cmdId}\`\n` +
            `┃ 📝 *Sortilège :* ${meta.desc}\n\n` +
            `┃ 🔄 *Choisis une action :*\n` +
            `┃  ✅ ON  → Active la protection\n` +
            `┃  ❌ OFF → Désactive la protection\n\n` +
            `╚══════════════════════════╝`,
          footer: `${botName}`,
          buttons: [
            { buttonId: `${prefix}${cmdId} on`,  buttonText: { displayText: `✅ Activer` },  type: 1 },
            { buttonId: `${prefix}${cmdId} off`, buttonText: { displayText: `❌ Désactiver` }, type: 1 },
            { buttonId: `${prefix}menubtn`,      buttonText: { displayText: `← Retour` },     type: 1 },
          ],
          headerType: 1
        })
      } catch {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ${meta.icon} *${meta.label.toUpperCase()}* 〕══╗\n\n` +
            `┃ ✅ *${prefix}${cmdId} on*  → Activer\n` +
            `┃ ❌ *${prefix}${cmdId} off* → Désactiver\n\n` +
            `╚══════════════════════════╝`
        })
      }
      break
    }

    // ── DANGER : confirmation avant exécution ────────────────
    case 'danger': {
      const confirmText = meta.confirm || `Exécuter ${prefix}${cmdId} ?`
      try {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ⚠️ *CONFIRMATION REQUISE* ⚠️ 〕══╗\n\n` +
            `┃ ${meta.icon} *${meta.label.toUpperCase()}*\n` +
            `┃ 📝 ${meta.desc}\n\n` +
            `┃ ⚠️ *${confirmText}*\n` +
            `┃ ℹ️ Cette action peut être irréversible.\n\n` +
            `╚══════════════════════════╝`,
          footer: `${botName}`,
          buttons: [
            { buttonId: `${prefix}${cmdId}`, buttonText: { displayText: `⚡ CONFIRMER` },  type: 1 },
            { buttonId: `${prefix}menubtn`,  buttonText: { displayText: `❌ Annuler` },    type: 1 },
          ],
          headerType: 1
        })
      } catch {
        await sock.sendMessage(sender, {
          text:
            `╔══〔 ⚠️ *CONFIRMATION* 〕══╗\n\n` +
            `┃ ${meta.icon} *${meta.label}*\n` +
            `┃ ⚠️ *${confirmText}*\n` +
            `┃ Tape : *${prefix}${cmdId}* pour confirmer\n\n` +
            `╚══════════════════════════╝`
        })
      }
      break
    }

    default:
      await _execCommand(sock, sender, cmdId, [], ctx)
  }
}

// ══════════════════════════════════════════════════════════════
// ACCÈS RAPIDE — Boutons vers les commandes populaires
// ══════════════════════════════════════════════════════════════

async function sendQuickMenu(sock, sender) {
  const prefix  = config.prefix || '.'
  const botName = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'

  try {
    await sock.sendMessage(sender, {
      text:
        `╔══〔 ⚡ *ACCÈS RAPIDE* ⚡ 〕══╗\n\n` +
        `┃ 🏆 *Stats & Classement*\n\n` +
        `╚══════════════════════════╝`,
      footer: `${botName}`,
      buttons: [
        { buttonId: `${prefix}menubtn cmd rank`,        buttonText: { displayText: `📊 Mon rang XP` },   type: 1 },
        { buttonId: `${prefix}menubtn cmd leaderboard`, buttonText: { displayText: `🏆 Classement` },    type: 1 },
        { buttonId: `${prefix}menubtn cmd profile`,     buttonText: { displayText: `👤 Mon profil` },    type: 1 },
      ],
      headerType: 1
    })

    await sock.sendMessage(sender, {
      text:
        `╔══〔 🎮 *JEUX RAPIDES* 〕══╗\n\n` +
        `┃ Lance un jeu en 1 tap !\n\n` +
        `╚══════════════════════════╝`,
      footer: `${botName}`,
      buttons: [
        { buttonId: `${prefix}menubtn cmd quiz`,      buttonText: { displayText: `🧠 Quiz` },         type: 1 },
        { buttonId: `${prefix}menubtn cmd coinflip`,  buttonText: { displayText: `🪙 Pile ou face` }, type: 1 },
        { buttonId: `${prefix}menubtn cmd dare`,      buttonText: { displayText: `🎲 Défi démon` },   type: 1 },
      ],
      headerType: 1
    })

    await sock.sendMessage(sender, {
      text:
        `╔══〔 📋 *NAVIGATION* 〕══╗\n\n` +
        `╚══════════════════════════╝`,
      footer: `${botName}`,
      buttons: [
        { buttonId: `${prefix}menubtn`,        buttonText: { displayText: `📋 Menu principal` }, type: 1 },
        { buttonId: `${prefix}menubtn group`,   buttonText: { displayText: `👥 Groupe` },         type: 1 },
        { buttonId: `${prefix}menubtn protection`, buttonText: { displayText: `🛡️ Protections` }, type: 1 },
      ],
      headerType: 1
    })

  } catch {
    await sock.sendMessage(sender, {
      text:
        `╔══〔 ⚡ *ACCÈS RAPIDE* 〕══╗\n\n` +
        `┃ *${prefix}rank* → Mon rang\n` +
        `┃ *${prefix}leaderboard* → Classement\n` +
        `┃ *${prefix}quiz* → Quiz\n` +
        `┃ *${prefix}coinflip* → Pile ou face\n` +
        `┃ *${prefix}tagall* → Tag All\n` +
        `┃ *${prefix}menubtn* → Menu complet\n\n` +
        `╚══════════════════════════╝`
    })
  }
}

// ══════════════════════════════════════════════════════════════
// EXÉCUTION INTERNE D'UNE COMMANDE (pour le type 'exec')
// ══════════════════════════════════════════════════════════════

async function _execCommand(sock, sender, cmdId, args, ctx) {
  try {
    const filePath = path.join(COMMANDS_DIR, cmdId + '.js')
    if (!fs.existsSync(filePath)) return
    const mod = await import(filePath + '?v=' + Date.now())
    if (typeof mod.default === 'function') {
      await mod.default(sock, sender, args, null, ctx)
    }
  } catch (e) {
    console.error(`❌ menubtn._execCommand [${cmdId}]:`, e.message)
    await sock.sendMessage(sender, { text: `❌ Erreur lors de l'invocation de *${cmdId}*: ${e.message.slice(0, 80)}` })
  }
}

// ══════════════════════════════════════════════════════════════
// FALLBACK TEXTE PUR
// ══════════════════════════════════════════════════════════════

async function sendFallback(sock, sender, prefix, botName) {
  const cmdFiles = getCommandFiles()
  let text = `╔══〔 ⛧ *${botName}* ⛧ 〕══╗\n\n`
  text += `┃ ℹ️ _Mode texte (boutons non supportés)_\n`
  text += `┃ → *${prefix}menu* pour le grimoire complet\n\n`
  MENU_CATEGORIES.slice(0, 3).forEach(cat => {
    const cmds = cat.cmds.filter(c => cmdFiles.has(c))
    if (!cmds.length) return
    text += `┃ ${cat.icon} *${cat.title}*\n`
    cmds.slice(0, 4).forEach(c => { text += `┃  • *${prefix}${c}*\n` })
    text += `┃\n`
  })
  text += `┃ *${prefix}menubtn <cat>* — Sous-menu\n`
  text += `╚══════════════════════════╝`
  await sock.sendMessage(sender, { text })
}

// ══════════════════════════════════════════════════════════════
// HANDLER PRINCIPAL
// ══════════════════════════════════════════════════════════════

export default async function menubtn(sock, sender, args, msg, ctx = {}) {
  try {
    const arg0 = args[0]?.toLowerCase()
    const arg1 = args[1]?.toLowerCase()

    // .menubtn → menu principal
    if (!arg0) return await sendMainMenu(sock, sender, ctx)

    // .menubtn quick / rapide → accès rapide
    if (arg0 === 'quick' || arg0 === 'rapide') return await sendQuickMenu(sock, sender)

    // .menubtn cmd <cmdId> → panneau intelligent pour la commande
    if (arg0 === 'cmd' && arg1) {
      return await sendCommandPanel(sock, sender, arg1, ctx)
    }

    // .menubtn <catId> → sous-menu catégorie
    const cat = MENU_CATEGORIES.find(c =>
      c.id === arg0 || c.title.toLowerCase().includes(arg0)
    )
    if (cat) return await sendCategoryMenu(sock, sender, cat.id, ctx)

    // Inconnu → liste des catégories
    const prefix = config.prefix || '.'
    await sock.sendMessage(sender, {
      text:
        `╔══〔 📋 *CATÉGORIES* 〕══╗\n\n` +
        MENU_CATEGORIES.map(c => `┃ ${c.icon} *${prefix}menubtn ${c.id}* — ${c.desc}`).join('\n') +
        `\n\n┃ ⚡ *${prefix}menubtn quick* — Accès rapide\n` +
        `┃ 📜 *${prefix}menu* — Grimoire texte\n\n` +
        `╚══════════════════════════╝`
    })

  } catch (e) {
    console.error('❌ menubtn.js:', e)
    await sock.sendMessage(sender, { text: `☠ Erreur menu interactif: ${e.message}` })
  }
}
