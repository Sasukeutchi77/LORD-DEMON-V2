// commands/revoke.js — RÉINITIALISER LE LIEN
import { sendMessage } from '../lib/sendMessage.js'
export default async function revoke(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  try {
    await sock.groupRevokeInvite(msg.key.remoteJid)
    await sendMessage(sock, sender, '✅ Lien du groupe réinitialisé !')
  } catch(e) { await sendMessage(sock, sender, '☠ '+e.message) }
}
