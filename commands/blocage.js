import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function blocage(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner) return sendMessage(sock, sender, `☠ Réservé aux administrateurs.`)
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .blocage @user`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔒 *BLOCAGE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Bloqué:* @${target.split('@')[0]}\n` +
    `⛧  🚫 *Accès aux commandes:* RÉVOQUÉ\n` +
    `✝  ⏱️ *Durée:* Jusqu'à levée par un admin\n` +
    `☩  👮 *Par:* @${jid.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
