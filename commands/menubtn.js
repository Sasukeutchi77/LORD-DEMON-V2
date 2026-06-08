// commands/menubtn.js — LORD DEMON V2
// Menu interactif avec List Messages + Button Messages Baileys
// Quand l'utilisateur tape sur une option → le bot exécute la commande directement
//
// Utilisation :
//   .menubtn          → Menu principal (liste de catégories)
//   .menubtn <cat>    → Sous-menu d'une catégorie avec ses commandes
//   .menubtn quick    → 3 boutons rapides (rank, leaderboard, quiz)
//
// Fonctionnement :
//   Les rowId/buttonId sont des commandes bot (ex: ".rank", ".menubtn xp")
//   → messageHandler.js les intercepte et les exécute automatiquement

import { config } from '../config.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname    = path.dirname(fileURLToPath(import.meta.url))
const COMMANDS_DIR = __dirname

// ══════════════════════════════════════════════════
// CATÉGORIES DU MENU INTERACTIF
// ══════════════════════════════════════════════════

const MENU_CATEGORIES = [
  {
    id: 'general',
    title: 'Général',
    icon: '☩',
    desc: 'Menu, aide, ping, infos bot',
    commands: [
      { id: 'menu',      label: '📋 Menu complet',        desc: 'Tout le grimoire en texte' },
      { id: 'help',      label: '☩ Aide commande',        desc: '.help <commande>' },
      { id: 'ping',      label: '⚡ Ping',                 desc: 'Latence du démon' },
      { id: 'info',      label: '🜏 Infos bot',            desc: 'Informations système' },
      { id: 'uptime',    label: '⏱️ Uptime',               desc: 'Temps d\'activité' },
      { id: 'whoami',    label: '🔍 Qui suis-je',         desc: 'Ton rang & pouvoirs' },
    ]
  },
  {
    id: 'xp',
    title: 'XP & Classement',
    icon: '⭐',
    desc: 'Niveaux, badges, classements',
    commands: [
      { id: 'rank',        label: '📊 Mon rang XP',        desc: 'Ton niveau et XP' },
      { id: 'leaderboard', label: '🏆 Classement global',  desc: 'Top 10 joueurs' },
      { id: 'profile',     label: '👤 Mon profil',         desc: 'Profil complet' },
      { id: 'badge',       label: '🏅 Mes badges',         desc: 'Voir tes badges' },
      { id: 'daily',       label: '🎁 Daily XP',           desc: 'Bonus quotidien' },
    ]
  },
  {
    id: 'media',
    title: 'Médias',
    icon: '🎵',
    desc: 'Musique, vidéo, stickers',
    commands: [
      { id: 'song',      label: '🎵 Télécharger musique', desc: '.song <titre>' },
      { id: 'ytmp4',     label: '🎬 Vidéo YouTube',       desc: '.ytmp4 <url>' },
      { id: 'sticker',   label: '🎭 Créer sticker',       desc: 'Envoie image + .sticker' },
      { id: 'image',     label: '🖼️ Chercher image',      desc: '.image <mot clé>' },
      { id: 'tts',       label: '🔊 Texte en vocal',      desc: '.tts <texte>' },
      { id: 'lyrics',    label: '🎤 Paroles chanson',     desc: '.lyrics <titre>' },
    ]
  },
  {
    id: 'utils',
    title: 'Utilitaires',
    icon: '🔧',
    desc: 'Météo, traduction, calcul',
    commands: [
      { id: 'weather',   label: '🌦️ Météo',               desc: '.weather <ville>' },
      { id: 'translate', label: '🌍 Traduction',          desc: '.translate fr <texte>' },
      { id: 'calc',      label: '🧮 Calculatrice',        desc: '.calc <expression>' },
      { id: 'qrcode',    label: '🔳 QR Code',             desc: '.qrcode <texte>' },
      { id: 'poll',      label: '📊 Sondage',             desc: '.poll Q|A|B|C' },
      { id: 'remind',    label: '⏰ Rappel',               desc: '.remind 10m <texte>' },
    ]
  },
  {
    id: 'games',
    title: 'Jeux',
    icon: '🎮',
    desc: 'Jeux & divertissement',
    commands: [
      { id: 'quiz',        label: '🧠 Quiz',               desc: 'Question culture générale' },
      { id: 'tictactoe',   label: '☠️ Morpion',            desc: '.tictactoe @joueur' },
      { id: 'rps',         label: '✊ Pierre Feuille',     desc: '.rps pierre/feuille/ciseaux' },
      { id: 'coinflip',    label: '🪙 Pile ou face',       desc: 'Lancer une pièce' },
      { id: 'tournament',  label: '🏆 Tournoi',            desc: 'Créer un tournoi' },
      { id: 'dare',        label: '🎲 Défi démon',         desc: 'Défi aléatoire' },
    ]
  },
  {
    id: 'group',
    title: 'Groupe',
    icon: '👥',
    desc: 'Gestion & modération groupe',
    commands: [
      { id: 'kick',      label: '⚰️ Expulser',            desc: '.kick @membre' },
      { id: 'ban',       label: '🚫 Bannir',              desc: '.ban @membre' },
      { id: 'warn',      label: '⚠️ Avertir',             desc: '.warn @membre' },
      { id: 'mute',      label: '🔇 Fermer groupe',       desc: 'Seuls admins parlent' },
      { id: 'tagall',    label: '📢 Taguer tous',         desc: 'Mentionner tous les membres' },
      { id: 'welcome',   label: '🕯️ Bienvenue',           desc: '.welcome on/off' },
    ]
  },
  {
    id: 'protection',
    title: 'Protections',
    icon: '🛡️',
    desc: 'Anti-raid, spam, liens',
    commands: [
      { id: 'automod',   label: '🤖 Auto-modération',     desc: '.automod on/off' },
      { id: 'antilink',  label: '🔗 Anti-liens',          desc: '.antilink on/off' },
      { id: 'antispam',  label: '📵 Anti-spam',           desc: '.antispam on/off' },
      { id: 'antiflood', label: '🌊 Anti-flood',          desc: '.antiflood on/off' },
      { id: 'ticket',    label: '🎫 Tickets support',     desc: 'Système de support' },
      { id: 'webhook',   label: '📡 Webhooks',            desc: 'Notifs externes' },
    ]
  },
  {
    id: 'owner',
    title: 'Owner',
    icon: '👑',
    desc: 'Commandes réservées Owner',
    commands: [
      { id: 'broadcast', label: '📡 Broadcast',           desc: 'Diffusion globale' },
      { id: 'plugin',    label: '🔌 Plugins',             desc: 'Gérer les plugins' },
      { id: 'backup',    label: '💾 Backup',              desc: 'Sauvegarder les données' },
      { id: 'reload',    label: '♻️ Recharger cmds',      desc: 'Recharger les commandes' },
      { id: 'restart',   label: '🔄 Redémarrer',         desc: 'Redémarrer le bot' },
      { id: 'eval',      label: '💻 Eval JavaScript',     desc: 'Exécuter du JS' },
    ]
  }
]

// ══════════════════════════════════════════════════
// UTILITAIRES
// ══════════════════════════════════════════════════

function trunc(str, max) {
  if (!str) return ''
  return str.length > max ? str.slice(0, max - 1) + '…' : str
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

// ══════════════════════════════════════════════════
// MENU PRINCIPAL — Liste de toutes les catégories
// L'utilisateur choisit une catégorie → le bot envoie
// le sous-menu de cette catégorie avec ses commandes
// ══════════════════════════════════════════════════

async function sendMainMenu(sock, sender) {
  const prefix   = config.prefix || '.'
  const botName  = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'
  const cmdFiles = getCommandFiles()
  const totalCmds = MENU_CATEGORIES.reduce(
    (n, c) => n + c.commands.filter(cmd => cmdFiles.has(cmd.id)).length, 0
  )

  // Diviser les catégories en 2 sections pour plus de clarté
  const secFun = {
    title: '⚡ Commandes & divertissement',
    rows: MENU_CATEGORIES.slice(0, 4).map(cat => ({
      title:       trunc(`${cat.icon} ${cat.title}`, 24),
      description: trunc(cat.desc, 72),
      rowId:       `${prefix}menubtn ${cat.id}`
    }))
  }

  const secAdmin = {
    title: '⚙️ Administration & système',
    rows: [
      ...MENU_CATEGORIES.slice(4).map(cat => ({
        title:       trunc(`${cat.icon} ${cat.title}`, 24),
        description: trunc(cat.desc, 72),
        rowId:       `${prefix}menubtn ${cat.id}`
      })),
      {
        title:       '⚡ Accès rapide',
        description: 'Boutons vers les commandes populaires',
        rowId:       `${prefix}menubtn quick`
      },
      {
        title:       '📜 Grimoire complet',
        description: 'Voir toutes les commandes en texte',
        rowId:       `${prefix}menu`
      }
    ]
  }

  try {
    await sock.sendMessage(sender, {
      text:
        `╭━━━〔 ⛧ *${botName}* 〕━━━╮\n\n` +
        `┃ 🩸 *${totalCmds} commandes disponibles*\n` +
        `┃ 📋 *Comment utiliser :*\n` +
        `┃  1. Appuie sur le bouton ↓\n` +
        `┃  2. Choisis une catégorie\n` +
        `┃  3. Appuie sur une commande\n` +
        `┃  4. La commande s'exécute ! ✅\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      footer: `${botName} — Grimoire Interactif v2`,
      title: `☠ GRIMOIRE INTERACTIF`,
      buttonText: `🩸 Choisir une catégorie`,
      sections: [secFun, secAdmin],
      listType: 1
    })
  } catch {
    await sendFallbackMenu(sock, sender, prefix, botName)
  }
}

// ══════════════════════════════════════════════════
// SOUS-MENU CATÉGORIE — Liste des commandes
// Chaque ligne = une commande → rowId = ".commande"
// messageHandler.js intercepte et exécute
// ══════════════════════════════════════════════════

async function sendCategoryMenu(sock, sender, catId) {
  const prefix   = config.prefix || '.'
  const botName  = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'
  const cat      = MENU_CATEGORIES.find(c => c.id === catId)
  const cmdFiles = getCommandFiles()

  if (!cat) return sendMainMenu(sock, sender)

  const availCmds = cat.commands.filter(cmd => cmdFiles.has(cmd.id))
  if (!availCmds.length) {
    return await sock.sendMessage(sender, {
      text: `❌ Aucune commande disponible dans *${cat.title}*.`
    })
  }

  const rows = [
    ...availCmds.map(cmd => ({
      title:       trunc(cmd.label, 24),
      description: trunc(cmd.desc, 72),
      rowId:       `${prefix}${cmd.id}`   // ← commande directe
    })),
    {
      title:       '← Retour au menu',
      description: 'Revenir aux catégories',
      rowId:       `${prefix}menubtn`
    }
  ]

  try {
    await sock.sendMessage(sender, {
      text:
        `╭━━━〔 ${cat.icon} *${cat.title.toUpperCase()}* 〕━━━╮\n\n` +
        `┃ *${availCmds.length} commandes disponibles*\n` +
        `┃ 💡 Appuie sur une commande pour l'exécuter !\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      footer: `${botName} — ${cat.desc}`,
      title:  `${cat.icon} ${cat.title}`,
      buttonText: `⚡ Choisir une commande`,
      sections: [{
        title: `${cat.icon} ${cat.title} (${availCmds.length})`,
        rows
      }],
      listType: 1
    })
  } catch {
    // Fallback : boutons classiques (max 3) + texte pour le reste
    const btn3 = availCmds.slice(0, 3)
    try {
      await sock.sendMessage(sender, {
        text:
          `╭━━━〔 ${cat.icon} *${cat.title}* 〕━━━╮\n\n` +
          availCmds.map(c => `┃ *${prefix}${c.id}* — ${c.desc}`).join('\n') +
          `\n\n╰━━━━━━━━━━━━━━━━━━━━━━╯`,
        footer: `Boutons rapides ↓`,
        buttons: btn3.map(c => ({
          buttonId: `${prefix}${c.id}`,
          buttonText: { displayText: c.label },
          type: 1
        })),
        headerType: 1
      })
    } catch {
      await sock.sendMessage(sender, {
        text:
          `╭━━━〔 ${cat.icon} *${cat.title}* 〕━━━╮\n\n` +
          availCmds.map(c => `┃ *${prefix}${c.id}* — ${c.desc}`).join('\n') +
          `\n\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
      })
    }
  }
}

// ══════════════════════════════════════════════════
// ACCÈS RAPIDE — 3 boutons vers commandes populaires
// ══════════════════════════════════════════════════

async function sendQuickMenu(sock, sender) {
  const prefix  = config.prefix || '.'
  const botName = config.botName || '𝐋𝐎𝐑𝐃 𝐃𝐄𝐌𝐎𝐍'

  try {
    await sock.sendMessage(sender, {
      text:
        `╭━━━〔 ⚡ *ACCÈS RAPIDE* 〕━━━╮\n\n` +
        `┃ Commandes populaires.\n` +
        `┃ Appuie sur un bouton pour l'exécuter ! ✅\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      footer: `${botName}`,
      buttons: [
        { buttonId: `${prefix}rank`,        buttonText: { displayText: '📊 Mon Rang XP' },   type: 1 },
        { buttonId: `${prefix}leaderboard`, buttonText: { displayText: '🏆 Classement' },     type: 1 },
        { buttonId: `${prefix}menubtn`,     buttonText: { displayText: '📋 Menu Complet' },   type: 1 },
      ],
      headerType: 1
    })

    await sock.sendMessage(sender, {
      text: `┃ Commandes groupe :`,
      footer: `${botName}`,
      buttons: [
        { buttonId: `${prefix}tagall`, buttonText: { displayText: '📢 Tag All' },   type: 1 },
        { buttonId: `${prefix}poll`,   buttonText: { displayText: '📊 Sondage' },   type: 1 },
        { buttonId: `${prefix}quiz`,   buttonText: { displayText: '🧠 Quiz' },      type: 1 },
      ],
      headerType: 1
    })

  } catch {
    await sock.sendMessage(sender, {
      text:
        `╭━━━〔 ⚡ *ACCÈS RAPIDE* 〕━━━╮\n\n` +
        `┃ *${prefix}rank* — Mon rang XP\n` +
        `┃ *${prefix}leaderboard* — Classement\n` +
        `┃ *${prefix}tagall* — Tag All\n` +
        `┃ *${prefix}poll* — Sondage\n` +
        `┃ *${prefix}quiz* — Quiz\n\n` +
        `┃ 💡 Utilisez *${prefix}menubtn* pour le menu interactif.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
    })
  }
}

// ══════════════════════════════════════════════════
// FALLBACK texte pur (WhatsApp trop vieux)
// ══════════════════════════════════════════════════

async function sendFallbackMenu(sock, sender, prefix, botName) {
  const cmdFiles = getCommandFiles()
  let text = `╭━━━〔 ⛧ *${botName}* 〕━━━╮\n\n`
  text += `┃ ℹ️ _Boutons interactifs non supportés._\n`
  text += `┃ Utilise *${prefix}menu* pour le menu complet.\n\n`
  text += `┃ 📋 *Catégories rapides :*\n`
  MENU_CATEGORIES.slice(0, 4).forEach(cat => {
    const cmds = cat.commands.filter(c => cmdFiles.has(c.id))
    if (!cmds.length) return
    text += `┃\n┃ ${cat.icon} *${cat.title}*\n`
    cmds.slice(0, 3).forEach(c => { text += `┃  • *${prefix}${c.id}*\n` })
  })
  text += `\n┃ *${prefix}menubtn <cat>* — Sous-menu\n`
  text += `╰━━━━━━━━━━━━━━━━━━━━━━╯`
  await sock.sendMessage(sender, { text })
}

// ══════════════════════════════════════════════════
// HANDLER PRINCIPAL
// ══════════════════════════════════════════════════

export default async function menubtn(sock, sender, args, msg, ctx = {}) {
  try {
    const arg = args[0]?.toLowerCase()

    // Sans argument → menu principal (liste de catégories)
    if (!arg) return await sendMainMenu(sock, sender)

    // .menubtn quick → boutons rapides
    if (arg === 'quick' || arg === 'rapide') return await sendQuickMenu(sock, sender)

    // .menubtn <catId> → sous-menu d'une catégorie
    const cat = MENU_CATEGORIES.find(c =>
      c.id === arg ||
      c.title.toLowerCase().includes(arg)
    )
    if (cat) return await sendCategoryMenu(sock, sender, cat.id)

    // Catégorie inconnue → liste des catégories dispo
    const prefix = config.prefix || '.'
    await sock.sendMessage(sender, {
      text:
        `╭━━━〔 📋 *CATÉGORIES DISPONIBLES* 〕━━━╮\n\n` +
        MENU_CATEGORIES.map(c => `┃ ${c.icon} *${prefix}menubtn ${c.id}* — ${c.desc}`).join('\n') +
        `\n\n┃ ⚡ *${prefix}menubtn quick* — Accès rapide\n` +
        `┃ 📜 *${prefix}menu* — Menu texte complet\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
    })

  } catch (e) {
    console.error('❌ menubtn.js:', e)
    await sock.sendMessage(sender, { text: `☠ Erreur menu interactif: ${e.message}` })
  }
}
