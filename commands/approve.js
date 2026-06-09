import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function approve(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Réservé aux administrateurs.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .approve @membre`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✅ *MEMBRE APPROUVÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n` +
    `⛧  ✅ *Approbation accordée par l'administration*\n` +
    `✝  🛡️ _Bienvenue dans la communauté._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [target] })
}
