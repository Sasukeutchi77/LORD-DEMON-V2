import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isOwner } from '../lib/ownerSystem.js'
export default async function broadcast(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!isOwner(jid) && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Réservé au propriétaire du bot.`)
  }
  const message = args.join(' ')
  if (!message) return sendMessage(sock, sender, `☠ Usage: .broadcast <message>`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📡 *BROADCAST GLOBAL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *LORD DEMON* vous transmet :\n\n` +
    `⛧  📡 _${message}_\n\n` +
    `✝  🤖 _Message diffusé automatiquement_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
