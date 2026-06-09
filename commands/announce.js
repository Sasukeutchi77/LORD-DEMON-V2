// commands/announce.js — ANNONCE 📢
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function announce(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .announce <message>')
  await sendMessage(sock, sender, `☩━━━〔 ⛧ *ANNOUNCE* 〕━━━☩

†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n📢   ANNONCE OFFICIELLE   📢\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${text}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
