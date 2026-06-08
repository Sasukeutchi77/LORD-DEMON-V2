// commands/clearwarns.js — LORD DEMON
// ✅ Effacement avertissements avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { cleanNumber } from '../lib/ownerSystem.js'
import { clearWarnings } from './warn.js'
import { resolveTarget } from '../lib/targetResolver.js'

export default async function clearwarns(sock, sender, args, msg, ctx = {}) {
  try {
    if (!ctx.isOwner && !ctx.isAdmin) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🚫 *ACCÈS REFUSÉ* — gardiens uniquement.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const { targetId, targetNumber } = resolveTarget(msg, args)

    if (!targetId) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩   🧹  EFFACER AVERTISSEMENTS   ✝\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☠  📝 *INVOCATION*\n⛧\n` +
        `☩  \`.clearwarns @âme\`\n✝  ou répondre à un message\n☠\n` +
        `⛧  👁️ Efface tous les avertissements\n☩  d'un âme dans ce cercle.\n✝\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const ok = clearWarnings(sender, targetId)

    if (!ok) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☠  👁️ @${targetNumber} n'a aucun\n⛧  avertissement à effacer.\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: [targetId] }
      )
    }

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☩   🧹  AVERTISSEMENTS EFFACÉS   ✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n☠\n` +
      `⛧  🩸 *Casier remis à zéro !*\n☩\n` +
      `✝  👤 @${targetNumber}\n` +
      `☠  📝 *Warns :* Tous supprimés\n⛧\n` +
      `☩  💡 \`.warnlist\` → Voir la liste\n✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetId] }
    )

  } catch (e) {
    console.error('❌ clearwarns.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué clearwarns: ${e.message}`)
  }
}
