// commands/link.js — LORD-DEMON
// 🔧 FIX: ctx utilisé (senderJid, groupMeta cache, isAdmin, botAdmin)
// 🔧 FIX: matchJid au lieu de normalizeJid maison
// 🔧 FIX: zéro appel groupMetadata direct

import { sendMessage }                    from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, matchJid, cleanNumber } from '../lib/ownerSystem.js'

export default async function link(sock, sender, args, msg, ctx = {}) {
  try {

    // ── GROUP ONLY ───────────────────────────────────────────
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `⛧ Cette sort ne fonctionne\n` +
        `☩ que dans les *cercles*.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
    }

    // ── CTX ──────────────────────────────────────────────────
    const userId   = ctx.senderJid  || getSenderJid(msg, sock)
    const isAdmin  = ctx.isAdmin    || false
    const isOwner  = ctx.isOwner    || isDeployer(userId) || isSudo(userId)
    const botAdmin = ctx.botAdmin   || false

    // ── USER PERMISSION ──────────────────────────────────────
    if (!isOwner && !isAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `✝ 🔒 Seuls les *gardiens* du\n` +
        `☠    cercle peuvent obtenir\n` +
        `⛧    le lien d'invitation.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
    }

    // ── BOT ADMIN CHECK ──────────────────────────────────────
    // ✅ FIX : utilise ctx.botAdmin (cache index.js)
    if (!botAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *DÉMON NON GARDIEN* 〕━━━☩\n\n` +
        `☩ Je dois être *administrateur*\n` +
        `✝ du cercle pour obtenir\n` +
        `☠ le lien d'invitation.\n\n` +
        `⛧ 📌 Ajoutez le Démon comme\n` +
        `☩    gardien du cercle.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
    }

    // ── GROUP META ───────────────────────────────────────────
    // ✅ FIX : utilise ctx.groupMeta (cache, zéro appel réseau)
    const groupMeta = ctx.groupMeta
      || await sock.groupMetadata(sender)

    const action = args[0]?.toLowerCase()

    // ── RESET / RÉVOQUER ─────────────────────────────────────
    if (action === 'reset' || action === 'regen' || action === 'nouveau') {
      try {
        await sock.groupRevokeInvite(sender)
        await new Promise(r => setTimeout(r, 500))
      } catch (e) {
        return await sendMessage(sock, sender,
          `☠ Impossible de révoquer l'ancien lien: ${e.message}`
        )
      }
    }

    // ── OBTENIR LE LIEN ──────────────────────────────────────
    let inviteCode
    try {
      inviteCode = await sock.groupInviteCode(sender)
    } catch (err) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `✝ Impossible de récupérer\n` +
        `☠ le lien d'invitation.\n` +
        `☠\n` +
        `⛧ 📝 _${err.message}_\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
    }

    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`
    const resetNote  = ['reset', 'regen', 'nouveau'].includes(action)
      ? '\n☩ ♻️ _Lien régénéré_' : ''

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     ⛧ 🔗 *LIEN D'INVITATION* ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 📋 *CERCLE* 〕━━━☩\n` +
      `☠\n` +
      `✝ 📛 Nom: *${groupMeta.subject}*\n` +
      `☠ 👻 âmes: *${groupMeta.participants.length}*\n` +
      `⛧ 🔒 Type: *${groupMeta.announce ? 'Fermé' : 'Ouvert'}*\n` +
      `☩${resetNote}\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🔗 *Lien:*\n${inviteLink}\n\n` +
      `💡 *.link reset* pour révoquer et générer un nouveau lien\n` +
      `_⚠️ Ne partagez ce lien qu'avec des personnes de confiance_`
    )

    console.log(`🔗 link [${action || 'get'}] | Groupe: ${groupMeta.subject}`)

  } catch (err) {
    console.error('❌ Erreur link:', err)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `✝ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}