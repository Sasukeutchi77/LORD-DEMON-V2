import { sendMessage } from "../lib/sendMessage.js"
import { getSenderJid, isDeployer, isSudo, matchJid } from "../lib/ownerSystem.js"

export default async function hidetag(sock, sender, args, msg, ctx = {}) {
  try {
    // ── VÉRIFICATION GROUPE ──────────────────────────────────
    if (!sender.endsWith('@g.us')) {
      await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL IMPOSSIBLE* 〕━━━☩\n\n` +
        `⛧ Ce sort ne fonctionne que dans les *cercles* (cercles).\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
      return
    }

    // ── VÉRIFICATION ADMIN ───────────────────────────────────
    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isOwner = ctx.isOwner   || isDeployer(userId) || isSudo(userId)
    const isAdmin = ctx.isAdmin   || await checkIsGroupAdmin(sock, sender, userId)

    if (!isOwner && !isAdmin) {
      await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `☠ 🔒 Seuls les *gardiens* (gardiens)\n` +
        `☠    du cercle peuvent invoquer ce sort.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
      return
    }

    // ── RÉCUPÉRATION DES MEMBRES ─────────────────────────────
    const groupMetadata = await sock.groupMetadata(sender)
    const participants  = groupMetadata.participants
    const mentions      = participants.map(p => p.id)

    // ── MESSAGE PERSONNALISÉ ─────────────────────────────────
    const customMessage = args.join(' ') || "☠ *Message du Démon* ⛧"

    // ── ENVOI AVEC MENTIONS CACHÉES ──────────────────────────
    await sock.sendMessage(sender, {
      text: customMessage,
      mentions: mentions
    })

    // ── CONFIRMATION PRIVÉE ──────────────────────────────────
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     👻 *HIDETAG INVOQUÉ* 👻\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
      `☩━━━〔 🩸 *ÂMES MARQUÉES* 〕━━━☩\n` +
      `☠\n` +
      `⛧ 👻 Âmes convoquées : *${participants.length}*\n` +
      `☩ 👻 Mentions : *cachées*\n` +
      `✝ 📜 Message : _${customMessage}_\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

    console.log(`⛧ hidetag | ${participants.length} âmes convoquées`)

  } catch (e) {
    console.error("☠ Erreur hidetag:", e)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ ${e.message || 'rituel échoué inconnue'}\n` +
      `☩ Vérifiez que le *Démon* est gardien du cercle.\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}

// ── UTILITAIRE ADMIN ─────────────────────────────────────────
async function checkIsGroupAdmin(sock, groupId, userId) {
  try {
    const meta   = await sock.groupMetadata(groupId)
    const admins = meta.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    return admins.some(p => matchJid(p.id, userId))
  } catch { return false }
}
