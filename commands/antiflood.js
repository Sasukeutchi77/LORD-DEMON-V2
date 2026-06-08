// commands/antiflood.js — LORD DEMON
// ✅ Anti-flood avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { getGroupConfig, updateGroupConfig } from '../lib/groupConfig.js'

export default async function antiflood(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚠️ *CERCLE UNIQUEMENT*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    if (!ctx.isOwner && !ctx.isAdmin) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n☩  🚫 *ACCÈS REFUSÉ* — gardiens uniquement.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const action = (args[0] || '').toLowerCase()

    if (action === 'on' || action === 'off') {
      updateGroupConfig(sender, c => { c.antiflood.enabled = action === 'on'; return c })
    } else if (action === 'max' && Number(args[1])) {
      updateGroupConfig(sender, c => { c.antiflood.max = Math.max(3, Math.min(20, Number(args[1]))); return c })
    } else if (action === 'time' && Number(args[1])) {
      updateGroupConfig(sender, c => { c.antiflood.windowMs = Math.max(2, Math.min(60, Number(args[1]))) * 1000; return c })
    } else if (action && action !== 'status') {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `✝   🌊  ANTI-FLOOD               ☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧  📝 *INVOCATION*\n☩\n` +
        `✝  \`.antiflood on\`          → Activer\n` +
        `☠  \`.antiflood off\`         → Désactiver\n` +
        `⛧  \`.antiflood max <3-20>\`  → Limite msgs\n` +
        `☩  \`.antiflood time <2-60>\` → Fenêtre (sec)\n` +
        `✝  \`.antiflood status\`      → Voir config\n` +
        `☠\n` +
        `⛧  💡 *Exemple :*\n` +
        `☩  \`.antiflood max 5\`  → 5 msgs max\n` +
        `✝  \`.antiflood time 10\` → par 10 secondes\n☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const c   = getGroupConfig(sender).antiflood
    const max = c.max || 5
    const win = Math.round((c.windowMs || 5000) / 1000)

    const barLen    = 10
    const barFilled = Math.round((max / 20) * barLen)
    const bar       = '▓'.repeat(barFilled) + '░'.repeat(barLen - barFilled)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🌊  ANTI-FLOOD               ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 📊 *CONFIGURATION* 〕━━━☩\n✝\n` +
      `☠  ${c.enabled ? '🩸 *ACTIVÉ*' : '💀 *DÉSACTIVÉ*'}\n⛧\n` +
      `☩  📩 *Limite :* ${max} messages\n` +
      `✝  ⏱️ *Fenêtre :* ${win} secondes\n` +
      `☠  ${bar}  (${max}/20)\n⛧\n` +
      `☩  ⚡ *Déclencheur :*\n` +
      `✝  › +${max} msgs en ${win}s → Mute auto\n☠\n` +
      `⛧  🔧 *Modifier :*\n` +
      `☩  \`.antiflood max 5\`   → Limite\n` +
      `✝  \`.antiflood time 10\` → Fenêtre\n☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    console.error('❌ antiflood.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué antiflood: ${e.message}`)
  }
}
