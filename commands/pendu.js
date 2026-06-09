// commands/pendu.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  JEU DU PENDU EN GROUPE — Interactif                ║
// ║  Catégories: pays, animaux, tech, sport, nourriture ║
// ║  Une partie par groupe, lettres en message simple   ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { cleanNumber } from '../lib/ownerSystem.js'

// ── Banque de mots par catégorie ─────────────────────────
const WORDS = {
  pays:       ['FRANCE','MAROC','ALGERIE','SENEGAL','CAMEROUN','COTE IVOIRE','BRESIL','ESPAGNE','PORTUGAL','JAPON','CHINE','EGYPTE','GHANA','NIGERIA','KENYA','ANGOLA','TUNISIE','MALI','GABON','TOGO'],
  animaux:    ['LION','ELEPHANT','GIRAFE','CROCODILE','GORILLE','PANTHÈRE','COBRA','AIGLE','DAUPHIN','BALEINE','JAGUAR','RENARD','LOUP','TIGRE','RHINOCÉROS','HIPPOPOTAME','ZÈBRE','FLAMANT','PANDA','KOALA'],
  tech:       ['ORDINATEUR','SMARTPHONE','JAVASCRIPT','ALGORITHME','BLOCKCHAIN','INTELLIGENCE','SERVEUR','RÉSEAU','CRYPTAGE','PYTHON','DATABASE','KUBERNETES','BITCOIN','ELECTRON','PROCESSEUR'],
  sport:      ['FOOTBALL','BASKETBALL','TENNIS','NATATION','CYCLISME','ATHLETISME','HANDBALL','VOLLEYBALL','BOXE','JUDO','KARATE','RUGBY','CRICKET','BASEBALL','GOLF','BADMINTON'],
  nourriture: ['PIZZA','CROISSANT','CHOCOLAT','FROMAGE','SPAGHETTI','HAMBURGER','SUSHI','COUSCOUS','POULET','THIÉBOUDIENNE','ALLOCO','FUFU','JOLLOF','MANDAZI','SAMOSA','ATTIÉKÉ'],
  rap:        ['DRAKE','KENDRICK','EMINEM','BOOBA','NINHO','DAMSO','PLK','GRADUR','LACRIM','SOOLKING','MAES','NEKFEU','ORELSAN','VALD','SCH'],
}

// ── Dessins du pendu ─────────────────────────────────────
const HANGMAN = [
  '```\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========```',
  '```\n  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========```',
]

// ── Store des parties en cours ───────────────────────────
// { [groupId]: { word, masked, guessed, errors, maxErrors, category, starter, startTime } }
const games = new Map()

function maskWord(word, guessed) {
  return word.split('').map(c => c === ' ' ? ' ' : (guessed.has(c) ? c : '_')).join(' ')
}

function buildStatus(game) {
  const masked = maskWord(game.word, game.guessed)
  const errors = game.errors
  const remaining = game.maxErrors - errors
  const lettersUsed = [...game.guessed].sort().join(' ') || '–'

  return (
    `☩━━━〔 🎮 *PENDU DÉMON* 〕━━━☩\n` +
    `☠\n` +
    `${HANGMAN[errors]}\n` +
    `☠\n` +
    `⛧  📂 *Catégorie:* ${game.category.toUpperCase()}\n` +
    `☠\n` +
    `✝  🔤 *Mot:* \`${masked}\`\n` +
    `☠  (${game.word.replace(/ /g, '').length} lettres)\n` +
    `☠\n` +
    `⛧  ❌ *Erreurs:* ${errors}/${game.maxErrors}  |  💔 Vies: ${remaining}\n` +
    `☩  🔡 *Lettres testées:* ${lettersUsed}\n` +
    `☠\n` +
    `✝  Envoie une lettre pour jouer!\n` +
    `☠  Ex: A  •  B  •  E  •  R\n` +
    `⛧  Ou ${process.env.PREFIX || '.'}pendu stop pour arrêter\n` +
    `☠\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}

// ── Traitement des lettres (appelé depuis messageHandler) ─
export async function checkPenduGuess(sock, groupId, senderJid, text) {
  if (!games.has(groupId)) return false
  const clean = text.trim().toUpperCase()
  if (!/^[A-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸŒÆÇ]$/.test(clean)) return false

  const game = games.get(groupId)
  if (game.guessed.has(clean)) {
    await sock.sendMessage(groupId, {
      text: `☠ *${clean}* déjà testé ! Essaie une autre lettre.`
    }).catch(() => {})
    return true
  }

  game.guessed.add(clean)
  const found = game.word.includes(clean)
  if (!found) game.errors++

  const masked   = maskWord(game.word, game.guessed)
  const isWon    = !masked.includes('_')
  const isLost   = game.errors >= game.maxErrors

  if (isWon) {
    games.delete(groupId)
    await sock.sendMessage(groupId, {
      text:
        `☩━━━〔 🏆 *VICTOIRE !* 〕━━━☩\n` +
        `☠\n` +
        `⛧  🎉 @${cleanNumber(senderJid)} a trouvé la dernière lettre!\n` +
        `☠\n` +
        `✝  🔤 *Le mot était:* *${game.word}*\n` +
        `☠  🎊 Félicitations !\n` +
        `☠\n` +
        `⛧  💡 ${process.env.PREFIX || '.'}pendu <catégorie> pour rejouer\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      mentions: [senderJid]
    }).catch(() => {})
    return true
  }

  if (isLost) {
    games.delete(groupId)
    await sock.sendMessage(groupId, {
      text:
        `☩━━━〔 💀 *DÉFAITE !* 〕━━━☩\n` +
        `☠\n` +
        `${HANGMAN[game.maxErrors]}\n` +
        `☠\n` +
        `⛧  😭 Le pendu est mort...\n` +
        `✝  🔤 *Le mot était:* *${game.word}*\n` +
        `☠\n` +
        `☩  💡 ${process.env.PREFIX || '.'}pendu <catégorie> pour réessayer\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    }).catch(() => {})
    return true
  }

  const reaction = found
    ? `✅ *${clean}* est dans le mot !`
    : `❌ *${clean}* n'est pas dans le mot !`

  await sock.sendMessage(groupId, {
    text: reaction + '\n\n' + buildStatus(game)
  }).catch(() => {})
  return true
}

// ── Commande principale ──────────────────────────────────
export default async function pendu(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const sub       = args[0]?.toLowerCase()

  // Stop
  if (sub === 'stop' || sub === 'fin' || sub === 'arrêter') {
    if (games.has(sender)) {
      const g = games.get(sender)
      games.delete(sender)
      return await sendMessage(sock, sender,
        `☩━━━〔 🛑 *PARTIE ARRÊTÉE* 〕━━━☩\n☠\n⛧  🔤 Le mot était: *${g.word}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    return await sendMessage(sock, sender, `☠ Aucune partie en cours.`)
  }

  // Partie déjà en cours
  if (games.has(sender)) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ⚠️ *PARTIE EN COURS* 〕━━━☩\n` +
      `☠\n` +
      `⛧  Une partie est déjà en cours!\n` +
      `☩  Envoie une lettre pour jouer.\n` +
      `✝  Ou ${prefix}pendu stop pour arrêter.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // Aide
  if (!sub || sub === 'help' || sub === 'aide') {
    return await sendMessage(sock, sender,
      `☩━━━〔 🎮 *PENDU DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}pendu <catégorie>\n` +
      `☠\n` +
      `✝  📋 *Catégories:*\n` +
      `☠  🌍 pays     |  🐾 animaux\n` +
      `⛧  💻 tech     |  ⚽ sport\n` +
      `☩  🍕 nourriture | 🎤 rap\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}pendu pays\n` +
      `⛧  ${prefix}pendu tech\n` +
      `☩  ${prefix}pendu animaux\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const wordList = WORDS[sub]
  if (!wordList) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *CATÉGORIE INCONNUE* 〕━━━☩\n` +
      `☠\n⛧  "${sub}" non reconnue.\n☠  ${prefix}pendu help pour la liste.\n☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const word = wordList[Math.floor(Math.random() * wordList.length)]
  const game = {
    word,
    masked:    maskWord(word, new Set()),
    guessed:   new Set(),
    errors:    0,
    maxErrors: 6,
    category:  sub,
    starter:   senderJid,
    startTime: Date.now(),
  }
  games.set(sender, game)

  await sendMessage(sock, sender,
    `☩━━━〔 🎮 *PENDU DÉMON — DÉBUT* 〕━━━☩\n` +
    `☠\n` +
    `⛧  🎯 Catégorie: *${sub.toUpperCase()}*\n` +
    `☩  Lancé par: @${cleanNumber(senderJid)}\n` +
    `☠\n` +
    buildStatus(game)
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}