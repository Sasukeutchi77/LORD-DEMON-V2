import { sendMessage } from '../lib/sendMessage.js'
import { cleanNumber } from '../lib/ownerSystem.js'
import { clearWarnings } from './warn.js'
export default async function clearwarns(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .clearwarns @membre`)
  const cleaned = cleanNumber(target)
  try {
    await clearWarnings(target)
    const text =
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🗑️ *AVERTISSEMENTS EFFACÉS*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  👤 *Membre:* @${cleaned}\n` +
      `⛧  ✅ *Tous les avertissements ont été effacés*\n` +
      `✝  🛡️ _Décision de l'administration_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    await sendMessage(sock, sender, text, { mentions: [target] })
  } catch(e) {
    await sendMessage(sock, sender, `☠ Erreur: ${e.message}`)
  }
}
