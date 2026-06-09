// commands/demotiontous.js — DÉMOTION GLOBALE
import { sendMessage } from '../lib/sendMessage.js'
export default async function demotiontous(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isOwner && !ctx.isMainOwner) return sendMessage(sock, sender, '☠ Réservé à l\'owner.')
  try {
    const meta = await sock.groupMetadata(msg.key.remoteJid)
    const admins = meta.participants.filter(p=>p.admin==='admin').map(p=>p.id)
    if (!admins.length) return sendMessage(sock, sender, '☠ Aucun admin à démoter.')
    await sock.groupParticipantsUpdate(msg.key.remoteJid, admins, 'demote')
    await sendMessage(sock, sender, `✅ ${admins.length} admin(s) démotés.`)
  } catch(e) { await sendMessage(sock, sender, '☠ '+e.message) }
}
