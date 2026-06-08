// commands/modlog.js — LORD DEMON
// ✅ Journal de modération avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isSudo } from '../lib/ownerSystem.js'
import { updateGroupConfig, getGroupConfig } from '../lib/groupConfig.js'

export default async function modlog(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧  ⚠️ *CERCLE UNIQUEMENT*\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const senderJid = ctx.senderJid || getSenderJid(msg, sock)
    if (!ctx.isOwner && !ctx.isAdmin && !isSudo(senderJid)) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩  🚫 *ACCÈS REFUSÉ*\n` +
        `✝  Réservé aux gardiens du cercle.\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const a = (args[0] || '').toLowerCase()

    if (a === 'on' || a === 'off') {
      updateGroupConfig(sender, c => ({ ...c, modlog: a === 'on' }))
    }

    const status = getGroupConfig(sender).modlog

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☠   📓  JOURNAL DE MODÉRATION    ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☩\n` +
      `✝  📊 *Statut actuel :*\n` +
      `☠  ${status ? '🩸 ACTIVÉ' : '💀 DÉSACTIVÉ'}\n` +
      `⛧\n` +
      `☩  📝 *Événements journalisés :*\n` +
      `✝  › Expulsions & bans\n` +
      `☠  › Promotions & rétrogradations\n` +
      `⛧  › Avertissements émis\n` +
      `☩  › Suppressions auto (antilink...)\n` +
      `✝\n` +
      `☠  🔧 *sorts :*\n` +
      `⛧  › \`.modlog on\`  → Activer\n` +
      `☩  › \`.modlog off\` → Désactiver\n` +
      `✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    console.error('❌ modlog.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué modlog: ${e.message}`)
  }
}
