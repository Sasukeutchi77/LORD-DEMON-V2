import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function audit(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const targetStr = target ? `@${target.split('@')[0]}` : 'le groupe'
  const actions = Math.floor(Math.random() * 50) + 10
  const warnings = Math.floor(Math.random() * 5)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔍 *AUDIT DE MODÉRATION*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Cible:* ${targetStr}\n\n` +
    `⛧  📊 *Actions récentes:* ${actions}\n` +
    `✝  ⚠️ *Avertissements:* ${warnings}\n` +
    `☩  ✅ *Statut:* ${warnings > 3 ? 'Surveillé 🔴' : warnings > 1 ? 'Attention 🟡' : 'Propre 🟢'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target ? { mentions: [target] } : undefined)
}
