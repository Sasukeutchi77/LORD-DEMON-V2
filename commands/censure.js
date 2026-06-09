import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function censure(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner) return sendMessage(sock, sender, `☠ Réservé aux administrateurs.`)
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const raison = args.filter(a => !a.startsWith('@')).join(' ') || 'Contenu inapproprié'
  if (!target) return sendMessage(sock, sender, `☠ Usage: .censure @user [raison]`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🚫 *CENSURE OFFICIELLE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Censuré:* @${target.split('@')[0]}\n` +
    `⛧  📋 *Motif:* ${raison}\n` +
    `✝  ⚖️ *Action:* Contenu supprimé / muet temporaire\n` +
    `☩  👮 *Par:* @${jid.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
