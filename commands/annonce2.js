import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function annonce2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const message = args.join(' ')
  if (!message) return sendMessage(sock, sender, `☠ Usage: .annonce2 <message>`)
  const date = new Date().toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📢 *ANNONCE OFFICIELLE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 _${date}_\n\n` +
    `⛧  📢 ${message}\n\n` +
    `✝  🛡️ _Publié par l'administration_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
