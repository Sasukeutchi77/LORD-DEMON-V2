// commands/antichannel.js — LORD-DEMON
// Bloque les messages transférés depuis une CHAÎNE WhatsApp (newsletter)
// Utilise lib/antiChannelManager.js (sync avec messageHandler)

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, matchJid } from '../lib/ownerSystem.js'
import {
  isAntiChannelEnabled,
  enableAntiChannel,
  disableAntiChannel,
  getStats
} from '../lib/antiChannelManager.js'

// ════════════════════════════════════════════════════════════════
//  UTILITAIRES
// ════════════════════════════════════════════════════════════════

async function checkIsGroupAdmin(sock, groupId, userId) {
  try {
    const meta   = await sock.groupMetadata(groupId)
    const admins = meta.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin')
    return admins.some(p => matchJid(p.id, userId))
  } catch { return false }
}

// ════════════════════════════════════════════════════════════════
//  COMMANDE PRINCIPALE
// ════════════════════════════════════════════════════════════════

export default async function antichannel(sock, sender, args, msg, ctx = {}) {
  try {

    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `⛧ Cette sort ne fonctionne\n` +
        `☩ que dans les *cercles*.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isOwner = ctx.isOwner   || isDeployer(userId) || isSudo(userId)
    const isAdmin = ctx.isAdmin   || await checkIsGroupAdmin(sock, sender, userId)

    if (!isOwner && !isAdmin) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `✝ 🔒 Seuls les *gardiens* du\n` +
        `☠    cercle peuvent utiliser\n` +
        `⛧    cette sort.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const action   = args[0]?.toLowerCase()
    const isActive = isAntiChannelEnabled(sender)
    const stats    = getStats(sender)

    // ── STATUT ───────────────────────────────────────────────
    if (!action || action === 'status' || action === 'statut') {
      const txt = isActive ? '💀 *ACTIVÉ*' : '🩸 *DÉSACTIVÉ*'
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `     ⛧ 📡 *ANTI-CHAÎNE* 📡 ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `☩━━━〔 👁️ *STATUT* 〕━━━☩\n` +
        `☠\n` +
        `☩ 📊 Statut: ${txt}\n` +
        `✝ 🗑️ Messages supprimés: *${stats.deleted || 0}*\n` +
        `☠\n` +
        `☠ 💡 *sorts:*\n` +
        `⛧ • *.antichannel on/off*\n` +
        `☩ • *.antichannel statut*\n` +
        `☠\n` +
        `✝ 👁️ _Bloque les messages_\n` +
        `☠ _transférés depuis une_\n` +
        `⛧ _chaîne WhatsApp_\n` +
        `☩ _(bouton "Voir la chaîne")_\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── ACTIVER ──────────────────────────────────────────────
    if (action === 'on' || action === 'activer') {
      enableAntiChannel(sender, { deleteMessage: true, warnUser: true, allowAdmin: true })
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `     ⛧ 📡 *ANTI-CHAÎNE* 📡 ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `☩━━━〔 🩸 *ACTIVÉ* 〕━━━☩\n` +
        `☠\n` +
        `✝ 🛡️ Protection: *ACTIVE*\n` +
        `☠\n` +
        `☠ 📋 *Détecte:*\n` +
        `⛧ • Transferts de chaînes\n` +
        `☩ • Liens whatsapp.com/channel\n` +
        `✝ • Messages "Voir la chaîne"\n` +
        `☠\n` +
        `☠ 📋 *Paramètres:*\n` +
        `⛧ • Suppression auto: 🩸\n` +
        `☩ • gardiens exemptés: 🩸\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── DÉSACTIVER ───────────────────────────────────────────
    if (action === 'off' || action === 'desactiver' || action === 'désactiver') {
      disableAntiChannel(sender)
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `     ⛧ 📡 *ANTI-CHAÎNE* 📡 ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `☩━━━〔 ☠ *DÉSACTIVÉ* 〕━━━☩\n` +
        `☠\n` +
        `✝ 🔓 Les messages de chaînes\n` +
        `☠    sont à nouveau autorisés.\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── INCONNU ──────────────────────────────────────────────
    return await sendMessage(sock, sender,
      `☩━━━〔 ❓ *INVOCATION* 〕━━━☩\n\n` +
      `⛧ • *.antichannel on*\n` +
      `☩ • *.antichannel off*\n` +
      `✝ • *.antichannel statut*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    console.error('❌ Erreur antichannel:', e)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `☠ ${e.message || 'rituel échoué inconnue'}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
