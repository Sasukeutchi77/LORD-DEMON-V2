// commands/automod.js — LORD DEMON V2
// Modération automatique avancée

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, isGroupAdmin } from '../lib/ownerSystem.js'
import {
  enableAutoMod, disableAutoMod, getAutoModConfig,
  addBannedWord, removeBannedWord, formatAutoModStatus
} from '../lib/autoModeration.js'

export default async function automod(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender, `☠ Commande groupe uniquement.`)
    }

    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isAdmin = ctx.isAdmin || await isGroupAdmin(sock, sender, userId)
    const isOp    = ctx.isOwner || isDeployer(userId) || isSudo(userId) || isAdmin

    if (!isOp) {
      return await sendMessage(sock, sender,
        `╭━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━╮\n\n┃ Réservé aux admins du groupe.\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    const action = args[0]?.toLowerCase()

    // ── STATUT (défaut) ──────────────────────────────
    if (!action || action === 'status' || action === 'statut') {
      return await sendMessage(sock, sender, formatAutoModStatus(sender))
    }

    // ── ACTIVER ──────────────────────────────────────
    if (action === 'on' || action === 'activer') {
      enableAutoMod(sender)
      return await sendMessage(sock, sender,
        `╭━━━〔 🛡️ *AUTO-MOD ACTIVÉ* 〕━━━╮\n\n` +
        `┃ ✅ La modération automatique est *active*.\n\n` +
        `┃ *Protections activées :*\n` +
        `┃ • ☠️ Anti-toxicité (insultes, menaces)\n` +
        `┃ • 🔇 Anti-spam patterns (CAPS, emojis)\n` +
        `┃ • 🚫 Anti-escroquerie\n\n` +
        `┃ Actions disponibles :\n` +
        `┃ • *.automod addword <mot>* — Ajouter mot banni\n` +
        `┃ • *.automod off* — Désactiver\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── DÉSACTIVER ──────────────────────────────────
    if (action === 'off' || action === 'désactiver') {
      disableAutoMod(sender)
      return await sendMessage(sock, sender,
        `╭━━━〔 🛡️ *AUTO-MOD DÉSACTIVÉ* 〕━━━╮\n\n` +
        `┃ ❌ La modération automatique est *désactivée*.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── AJOUTER MOT BANNI ──────────────────────────
    if (action === 'addword' || action === 'ajoutmot') {
      const word = args[1]?.toLowerCase()
      if (!word) return await sendMessage(sock, sender, `☠ Usage : *.automod addword <mot>*`)

      addBannedWord(sender, word)
      return await sendMessage(sock, sender,
        `╭━━━〔 🔇 *MOT BANNI* 〕━━━╮\n\n` +
        `┃ ✅ *"${word}"* ajouté à la liste des mots interdits.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── SUPPRIMER MOT BANNI ──────────────────────
    if (action === 'removeword' || action === 'delmot') {
      const word = args[1]?.toLowerCase()
      if (!word) return await sendMessage(sock, sender, `☠ Usage : *.automod removeword <mot>*`)

      removeBannedWord(sender, word)
      return await sendMessage(sock, sender,
        `╭━━━〔 🔇 *MOT RETIRÉ* 〕━━━╮\n\n` +
        `┃ ✅ *"${word}"* retiré de la liste.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── CONFIGURER L'ACTION ──────────────────────
    if (action === 'setaction') {
      const target = args[1]?.toLowerCase() // toxic | bannedword
      const act    = args[2]?.toLowerCase() // warn | delete | kick | mute
      const valid  = ['warn', 'delete', 'kick', 'mute']

      if (!target || !act || !valid.includes(act)) {
        return await sendMessage(sock, sender,
          `☠ Usage : *.automod setaction <toxic|bannedword> <warn|delete|kick|mute>*`
        )
      }

      const { enableAutoMod: en } = await import('../lib/autoModeration.js')
      const cfg = getAutoModConfig(sender)
      if (target === 'toxic') enableAutoMod(sender, { toxicAction: act })
      if (target === 'bannedword') enableAutoMod(sender, { bannedWordAction: act })

      return await sendMessage(sock, sender,
        `✅ Action *${target}* configurée sur *${act}*.`
      )
    }

    // ── AIDE ──────────────────────────────────────
    return await sendMessage(sock, sender,
      `╭━━━〔 🛡️ *AUTO-MOD* 〕━━━╮\n\n` +
      `┃ *.automod on* — Activer\n` +
      `┃ *.automod off* — Désactiver\n` +
      `┃ *.automod status* — Voir la config\n` +
      `┃ *.automod addword <mot>* — Bannir un mot\n` +
      `┃ *.automod removeword <mot>* — Retirer un mot\n` +
      `┃ *.automod setaction <type> <action>* — Config action\n\n` +
      `╰━━━━━━━━━━━━━━━━━━━━━━╯`
    )

  } catch (e) {
    console.error('❌ automod.js:', e)
    await sendMessage(sock, sender, `☠ Erreur automod: ${e.message}`)
  }
}
