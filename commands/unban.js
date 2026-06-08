// commands/unban.js — LORD-DEMON
// 🔧 FIX: ctx utilisé (senderJid, isOwner, isAdmin)
// 🔧 FIX : cleanNumber pour affichage propre
// 🔧 FIX : ctx = {} ajouté

import { sendMessage }                                from '../lib/sendMessage.js'
import { isBanned, removeBan, getBanList }            from './ban.js'
import { showActionLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import {
  getSenderJid,
  isSuperAdmin,
  cleanNumber
} from '../lib/ownerSystem.js'

export default async function unban(sock, sender, args, msg, ctx = {}) {
  let loaderKey = null

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

    // ── SOUS-COMMANDE : liste des bannis ─────────────────────
    if (args[0]?.toLowerCase() === 'list') {
      const banList = getBanList(sender)

      if (banList.length === 0) {
        return await sendMessage(sock, sender,
          `☩━━━〔 📋 *LISTE DES BANNIS* 〕━━━☩\n\n` +
          `☠ Aucun utilisateur banni\n` +
          `⛧ dans ce cercle.\n\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
      }

      let listText =
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `     ⛧ 🚫 *LISTE DES BANNIS* 🚫 ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`

      banList.forEach((jid, i) => {
        listText += `☩ ${i + 1}. +${cleanNumber(jid)}\n`
      })

      listText +=
        `☠\n` +
        `✝ 📊 Total: *${banList.length}* banni(s)\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

      return await sendMessage(sock, sender, listText)
    }

    // ── TARGET ───────────────────────────────────────────────
    let targetId = null

    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    if (mentions?.length > 0) {
      targetId = mentions[0]
    } else if (args[0]) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetId = num + '@s.whatsapp.net'
    }

    if (!targetId) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
        `☠ • *.unban @âme*\n` +
        `⛧ • *.unban 22601234567*\n` +
        `☩ • *.unban list* → Liste bannis\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── VÉRIFIER SI BANNI ────────────────────────────────────
    const targetNum = cleanNumber(targetId)
    const userNum   = cleanNumber(userId)

    if (!isBanned(sender, targetId)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 👁️ *PAS BANNI* 〕━━━☩\n\n` +
        `✝ @${targetNum} n'est pas\n` +
        `☠ dans la liste des bannis.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: [targetId] }
      )
    }

    // ── DÉBANNIR ─────────────────────────────────────────────
    loaderKey = await showActionLoader(sock, sender, 'DÉBANNISSEMENT EN COURS', '🩸')

    removeBan(sender, targetId)

    await deleteLoader(sock, sender, loaderKey)
    loaderKey = null

    return await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     ⛧ 🩸 *DÉBANNISSEMENT* 🩸 ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🔓 *ACCÈS RESTAURÉ* 〕━━━☩\n` +
      `☠\n` +
      `⛧ 👤 Utilisateur: @${targetNum}\n` +
      `☩ 🕐 Heure: ${formatTime()}\n` +
      `✝ 👮 Par: @${userNum}\n` +
      `☠\n` +
      `☠ 🩸 Il peut rejoindre le cercle.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetId, userId] }
    )

  } catch (err) {
    if (loaderKey) await deleteLoader(sock, sender, loaderKey)
    console.error('❌ Erreur unban:', err)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}