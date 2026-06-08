// commands/unwarn.js — LORD-DEMON
// 🔧 FIX: ctx utilisé (senderJid, isOwner, isAdmin)
// 🔧 FIX: cleanNumber pour affichage propre
// 🔧 FIX: ctx = {} ajouté

import { sendMessage }                from '../lib/sendMessage.js'
import { getWarnings, clearWarnings } from './warn.js'
import { formatTime }                 from '../lib/animLoader.js'
import {
  getSenderJid,
  isSuperAdmin,
  cleanNumber,
  matchJid
} from '../lib/ownerSystem.js'

export default async function unwarn(sock, sender, args, msg, ctx = {}) {
  try {

    // ── GROUP ONLY ───────────────────────────────────────────
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `⛧ sort *cercle* uniquement.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CTX ──────────────────────────────────────────────────
    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isOwner = ctx.isOwner   || isSuperAdmin(userId)
    const isAdmin = ctx.isAdmin   || false

    // ── PERMISSION : Owner ou Admin groupe ───────────────────
    if (!isOwner && !isAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `☩ 🔒 Requis: *gardien* du cercle\n` +
        `✝    ou *Owner/Sudo* du Démon\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── TARGET ───────────────────────────────────────────────
    let targetId = null

    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    if (mentions?.length > 0) {
      targetId = mentions[0]
    } else if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      targetId = msg.message.extendedTextMessage.contextInfo.participant
    } else if (args[0]) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetId = num + '@s.whatsapp.net'
    }

    if (!targetId) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
        `☠ • *.unwarn @âme*\n` +
        `⛧ • Répondre + *.unwarn*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── VÉRIFIER LES AVERTISSEMENTS ──────────────────────────
    const currentWarns = getWarnings(sender, targetId)
    const targetNum    = cleanNumber(targetId)
    const userNum      = cleanNumber(userId)

    if (currentWarns === 0) {
      return await sendMessage(sock, sender,
        `☩━━━〔 👁️ *AUCUN AVERT.* 〕━━━☩\n\n` +
        `☩ @${targetNum} n'a aucun\n` +
        `✝ avertissement actif.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: [targetId] }
      )
    }

    // ── EFFACER LES AVERTISSEMENTS ───────────────────────────
    clearWarnings(sender, targetId)

    return await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     ⛧ 🩸 *AVERTISS. RETIRÉS* 🩸 ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🧹 *NETTOYAGE* 〕━━━☩\n` +
      `☠\n` +
      `☠ 👤 Utilisateur: @${targetNum}\n` +
      `⛧ 🗑️ Avert. retirés: *${currentWarns}*\n` +
      `☩ 🕐 Heure: ${formatTime()}\n` +
      `✝ 👮 Par: @${userNum}\n` +
      `☠\n` +
      `☠ 🩸 Ardoise *effacée* avec succès.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetId, userId] }
    )

  } catch (err) {
    console.error('❌ Erreur unwarn:', err)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}