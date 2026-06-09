// commands/grouplink.js — LIEN DU GROUPE 🔗
import { sendMessage } from '../lib/sendMessage.js'
export default async function grouplink(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  try {
    const code = await sock.groupInviteCode(msg.key.remoteJid)
    await sendMessage(sock, sender, `☩━━━〔 ⛧ *GROUPLINK* 〕━━━☩

🔗 *Lien du groupe:*\nhttps://chat.whatsapp.com/${code}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, '☠ '+e.message) }
}
