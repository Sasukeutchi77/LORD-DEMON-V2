// commands/kickall.js — LORD-DEMON
// 🔧 FIX: ctx utilisé (senderJid, groupMeta cache, isOwner)
// 🔧 FIX: zéro appel groupMetadata direct
// 🔧 FIX: invalidateGroupCache après expulsion
// 🔧 FIX: filtrage bot du lot d'expulsion

import { sendMessage }                          from "../lib/sendMessage.js"
import { getSenderJid, isSuperAdmin, cleanNumber } from '../lib/ownerSystem.js'

export default async function kickall(sock, sender, args, msg, ctx = {}) {
  try {

    // ── GROUP ONLY ───────────────────────────────────────────
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL IMPOSSIBLE* 〕━━━☩\n\n` +
        `⛧ Ce sort ne fonctionne que dans les *cercles* (cercles).\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CTX ──────────────────────────────────────────────────
    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isOwner = ctx.isOwner   || isSuperAdmin(userId)

    // ── PERMISSION : SuperAdmin uniquement ───────────────────
    if (!isOwner) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `☠ Seuls les *Seigneurs Suprêmes*\n` +
        `☠ peuvent déclencher ce châtiment.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── BOT gardien CHECK ──────────────────────────────────────
    if (!ctx.botAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *DÉMON NON GARDIEN* 〕━━━☩\n\n` +
        `⛧ Je dois être *gardien* (gardien) pour\n` +
        `⛧ exiler les âmes du cercle.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── GROUP META ───────────────────────────────────────────
    // ✅ FIX : ctx.groupMeta (cache, zéro appel réseau)
    const groupMetadata = ctx.groupMeta
      || await sock.groupMetadata(sender)

    const participants = groupMetadata.participants
    const groupName    = groupMetadata.subject
    const botNum       = cleanNumber(sock.user?.id || "")

    // ── SÉPARER gardiens ET MEMBRES ────────────────────────────
    const gardiens  = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    const members = participants.filter(p => {
      if (p.admin) return false
      // ✅ FIX : exclure le bot du lot d'expulsion
      if (cleanNumber(p.id) === botNum) return false
      return true
    })

    const adminIds  = admins.map(p => p.id)
    const memberIds = members.map(p => p.id)

    if (memberIds.length === 0) {
      return await sendMessage(sock, sender,
        `☩━━━〔 👁️ *CERCLE VIDE* 〕━━━☩\n\n` +
        `⛧ Aucune âme à exiler — seuls les gardiens demeurent.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CONFIRMATION ─────────────────────────────────────────
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `      💀 *EXIL MASSIF* 💀\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
      `☩ 📛 Cercle : *${groupName}*\n` +
      `⛧ 👻 Âmes à exiler : *${memberIds.length}*\n` +
      `✝ 🛡️ Gardiens protégés : *${adminIds.length}*\n\n` +
      `☠ ⏳ _Le châtiment commence..._`
    )

    console.log(`🚨 KICKALL démarré par +${cleanNumber(userId)} | ${memberIds.length} membres | Groupe: ${sender}`)

    // ── EXPULSION PAR LOTS ───────────────────────────────────
    const batchSize    = 5
    let   successCount = 0
    let   failCount    = 0

    for (let i = 0; i < memberIds.length; i += batchSize) {
      const batch = memberIds.slice(i, i + batchSize)

      try {
        await sock.groupParticipantsUpdate(sender, batch, "remove")
        successCount += batch.length
        console.log(`⛧ Lot exilé : ${batch.length} (${i + batch.length}/${memberIds.length})`)
      } catch (e) {
        console.error(`☠ Erreur lot ${i}:`, e.message)
        failCount += batch.length
      }

      // Pause entre les lots pour éviter le rate-limit
      if (i + batchSize < memberIds.length) {
        await new Promise(r => setTimeout(r, 1500))
      }
    }

    // ✅ FIX : invalider le cache après les expulsions
    if (ctx.invalidateGroupCache) ctx.invalidateGroupCache(sender)

    // ── MESSAGE FINAL ────────────────────────────────────────
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `    ☠ *CHÂTIMENT ACCOMPLI* ☠\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
      `☩━━━〔 🩸 *BILAN DU MASSACRE* 〕━━━☩\n` +
      `☠\n` +
      `⛧ 🩸 Exilés : *${successCount}*\n` +
      `☩ ☠ Échecs  : *${failCount}*\n` +
      `✝ 🛡️ Gardiens épargnés : *${adminIds.length}*\n` +
      `☠\n` +
      `⛧ 👑 Ordonné par : @${cleanNumber(userId)}\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [userId] }
    )

    console.log(`⛧ KICKALL terminé | 🩸 ${successCount} exilés | ☠ ${failCount} échecs`)

  } catch (e) {
    console.error("☠ Erreur kickall.js:", e)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ ${e.message || 'rituel échoué inconnue'}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
