import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function announce(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, `☠ Réservé aux admins.`)
  const message = args.join(' ')
  if (!message) return sendMessage(sock, sender, `☠ Usage: .announce <message>`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📣 *ANNONCE DU GROUPE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚠️ *Attention membres !*\n\n` +
    `⛧  📣 _${message}_\n\n` +
    `✝  🛡️ _Message de l'administration_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
