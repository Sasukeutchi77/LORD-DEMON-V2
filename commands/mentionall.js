// commands/mentionall.js — MENTION SILENCIEUSE
import { sendMessage } from '../lib/sendMessage.js'
export default async function mentionall(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  try {
    const meta = await sock.groupMetadata(msg.key.remoteJid)
    const participants = meta.participants.map(p=>p.id)
    const text = args.join(' ') || '📢 Message pour tous les membres !'
    await sendMessage(sock, sender, text, { mentions: participants })
  } catch(e) { await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚡ *MENTIONALL*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`+e.message) }
}
