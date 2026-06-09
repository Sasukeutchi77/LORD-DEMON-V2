// commands/revoke.js — RÉINITIALISER LE LIEN
import { sendMessage } from '../lib/sendMessage.js'
export default async function revoke(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  try {
    await sock.groupRevokeInvite(msg.key.remoteJid)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚡ *REVOKE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✅ Lien du groupe réinitialisé !\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚡ *REVOKE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`+e.message) }
}
