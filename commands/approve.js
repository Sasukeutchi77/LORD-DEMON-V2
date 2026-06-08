// commands/approve.js — LORD DEMON
// ✅ Approbation membre avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isSudo } from '../lib/ownerSystem.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { setListValue } from '../lib/v2Moderation.js'

export default async function approve(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧  ⚠️ *CERCLE UNIQUEMENT*\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    if (!ctx.isOwner && !ctx.isAdmin) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩  🚫 *ACCÈS REFUSÉ*\n` +
        `✝  Réservé aux gardiens du cercle.\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const { targetId, targetNumber } = resolveTarget(msg, args)

    if (!targetId) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☠   🩸  APPROUVER UN ÂME      ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩  📝 *INVOCATION*\n` +
        `✝\n` +
        `☠  \`.approve @âme\`\n` +
        `⛧  ou répondre à un message\n` +
        `☩\n` +
        `✝  👁️ *Description :*\n` +
        `☠  Approuver un âme l'exempte\n` +
        `⛧  des protections automatiques\n` +
        `☩  (antilink, antispam, etc.)\n` +
        `✝\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    setListValue(sender, 'approved', targetNumber, true)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☠   🩸  ÂME APPROUVÉ          ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☩\n` +
      `✝  🩸 *@${targetNumber}* est approuvé !\n` +
      `☠\n` +
      `⛧  🛡️ *Exemptions actives :*\n` +
      `☩  › Anti-lien\n` +
      `✝  › Anti-spam\n` +
      `☠  › Anti-mention\n` +
      `⛧  › Autres protections auto\n` +
      `☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetId] }
    )

  } catch (e) {
    console.error('❌ approve.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué approve: ${e.message}`)
  }
}
