// commands/kick.js — LORD-DEMON
// 🔧 FIX: utilise ctx.groupMeta (cache, zéro appel réseau)
// 🔧 FIX: suppression checkBotAdmin() redondant
// 🔧 FIX: console.log déplacé avant le return
// 🔧 FIX: invalidateGroupCache après kick

import { sendMessage }                                from '../lib/sendMessage.js'
import { showActionLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import { cleanNumber, matchJid }                      from '../lib/ownerSystem.js'

function isAdminFlag(a) {
  return a === 'admin' || a === 'superadmin'
}

export default async function kick(sock, sender, args, msg, ctx = {}) {
  let loaderKey = null

  try {

    // ────────── GROUP ONLY ──────────────────────────────────
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `⛧ sort *cercle* uniquement.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── CTX ─────────────────────────────────────────
    const {
      isOwner,
      isAdmin,
      botAdmin,
      senderJid,
      groupMeta,           // ✅ FIX : cache groupMeta depuis index.js v2
      invalidateGroupCache // ✅ FIX v : pour invalider après kick
    } = ctx

    const userId = senderJid

    // ────────── USER PERMISSION ─────────────────────────────
    if (!isOwner && !isAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `☩ 🔒 Requis: *gardien* du cercle\n` +
        `✝    ou *Owner/Sudo* du Démon\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── BOT ADMIN CHECK ─────────────────────────────
    // ✅ FIX : utilise ctx.botAdmin (déjà calculé dans index.js)
    // Zéro appel réseau supplémentaire
    if (!botAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *DÉMON NON GARDIEN* 〕━━━☩\n\n` +
        `☠ Je dois être *gardien* pour\n` +
        `⛧ exiler des âmes.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── TARGET ───────────────────────────────────────
    let targetId = null

    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    if (mentions?.length > 0) {
      targetId = mentions[0]
    } else if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      targetId = msg.message.extendedTextMessage.contextInfo.participant
    } else if (args.length > 0) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetId = num + '@s.whatsapp.net'
    }

    if (!targetId) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
        `☩ • *.kick @âme*\n` +
        `✝ • Répondre + *.kick*\n` +
        `☠ • *.kick 22601234567*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── EMPÊCHER DE SE KICKER SOI-MÊME ──────────────
    if (matchJid(targetId, userId)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚠️ *IMPOSSIBLE* 〕━━━☩\n\n` +
        `⛧ Vous ne pouvez pas vous\n` +
        `☩ exiler vous-même.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── EMPÊCHER DE KICKER LE BOT ───────────────────
    const botId = sock.user?.id || ""
    if (matchJid(targetId, botId)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚠️ *IMPOSSIBLE* 〕━━━☩\n\n` +
        `✝ Je ne peux pas m'exiler\n` +
        `☠ moi-même.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── GROUP DATA ───────────────────────────────────
    // ✅ FIX : utilise ctx.groupMeta (cache, zéro appel réseau)
    // Fallback sur sock.groupMetadata si cache absent
    const meta         = groupMeta || await sock.groupMetadata(sender)
    const participants = meta?.participants || []

    const targetMember = participants.find(p => matchJid(p.id, targetId))

    if (!targetMember) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ABSENT* 〕━━━☩\n\n` +
        `⛧ Ce âme n'est pas dans\n` +
        `☩ le cercle.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── PROTECTION ADMIN ────────────────────────────
    if (isAdminFlag(targetMember.admin) && !isOwner) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *INTERDIT* 〕━━━☩\n\n` +
        `✝ Vous ne pouvez pas exiler\n` +
        `☠ un *administrateur* du cercle.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ────────── KICK ────────────────────────────────────────
    loaderKey = await showActionLoader(sock, sender, 'EXPULSION EN COURS', '👢')

    await sock.groupParticipantsUpdate(sender, [targetMember.id], 'remove')

    await deleteLoader(sock, sender, loaderKey)
    loaderKey = null

    // ✅ FIX : invalider le cache après kick
    if (invalidateGroupCache) invalidateGroupCache(sender)

    const targetNum = targetMember.id.split('@')[0]
    const reason    = args.slice(1).join(' ') || 'Non spécifiée'

    // ✅ FIX : console.log AVANT le return (était après = code mort)
    console.log(`👢 kick | ${targetNum} | par: ${userId?.split('@')[0]}`)

    return await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     ⛧ 👢 *EXIL* 👢 ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🩸 *ÂME EXPULSÉ* 〕━━━☩\n` +
      `☠\n` +
      `⛧ 👤 Cible: @${targetNum}\n` +
      `☩ 📋 Raison: ${reason}\n` +
      `✝ 🕐 Heure: ${formatTime()}\n` +
      `☠ 👮 Par: @${userId?.split('@')[0]}\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetMember.id, userId] }
    )

  } catch (err) {
    if (loaderKey) await deleteLoader(sock, sender, loaderKey)
    console.error('❌ Erreur kick:', err)

    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ • Suis-je *gardien* du cercle ?\n` +
      `☩ • Le âme est-il présent ?\n` +
      `✝ • Est-il gardien ?\n\n` +
      `☠ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}