// commands/whitelist.js — LORD DEMON
// ✅ Liste blanche avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { getGroupConfig } from '../lib/groupConfig.js'
import { setListValue } from '../lib/v2Moderation.js'

export default async function whitelist(sock, sender, args, msg, ctx = {}) {
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

    const action = (args[0] || '').toLowerCase()

    // ── LISTE ───────────────────────────────────
    if (action === 'list') {
      const list = getGroupConfig(sender).whitelist || []
      if (!list.length) {
        return await sendMessage(sock, sender,
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
          `☠   📃  LISTE BLANCHE            ⛧\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
          `☩  📭 Aucun âme en domaines bénis.\n` +
          `✝\n` +
          `☠  💡 \`.domaines bénis add @âme\`\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
      }

      let text =
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   📃  LISTE BLANCHE            ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `✝  🩸 *${list.length} âme(s) en domaines bénis*\n` +
        `☠\n`

      list.forEach((num, i) => {
        text += `⛧  ${i+1}. 📱 +${num}\n`
      })

      text += `☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      return await sendMessage(sock, sender, text)
    }

    // ── AIDE ────────────────────────────────────
    if (!action || (!['add','remove','del'].includes(action) && !args[0]?.includes('@'))) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `✝   📃  LISTE BLANCHE            ☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧  📝 *INVOCATION*\n` +
        `☩\n` +
        `✝  \`.domaines bénis add @âme\`\n` +
        `☠  \`.domaines bénis remove @âme\`\n` +
        `⛧  \`.domaines bénis list\`\n` +
        `☩\n` +
        `✝  👁️ *Description :*\n` +
        `☠  Les âmes en domaines bénis\n` +
        `⛧  sont exemptés des protections\n` +
        `☩  automatiques du cercle.\n` +
        `✝\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── AJOUTER / SUPPRIMER ─────────────────────
    const shifted = ['add','remove','del'].includes(action) ? args.slice(1) : args
    const { targetId, targetNumber } = resolveTarget(msg, shifted)

    if (!targetId) {
      return await sendMessage(sock, sender, `☠ Ciblez un âme: \`.domaines bénis add @âme\``)
    }

    const isAdding = action !== 'remove' && action !== 'del'
    setListValue(sender, 'whitelist', targetNumber, isAdding)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☠   📃  LISTE BLANCHE MIS À JOUR ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☩\n` +
      `✝  ${isAdding ? '🩸 *Ajouté*' : '🗑️ *Retiré*'}\n` +
      `☠  📱 @${targetNumber}\n` +
      `⛧\n` +
      `☩  💡 \`.domaines bénis list\` → Voir la liste\n` +
      `✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetId] }
    )

  } catch (e) {
    console.error('❌ whitelist.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué domaines bénis: ${e.message}`)
  }
}
