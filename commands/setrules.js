// commands/setrules.js — DÉFINIR RÈGLES
import { sendMessage } from '../lib/sendMessage.js'
import { groupSettingsDb } from '../lib/database.js'
export default async function setrules(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock, sender, '☠ Réservé aux admins.')
  const rules = args.join(' ')
  if (!rules) return sendMessage(sock, sender, '☠ Usage: .setrules <règles>')
  groupSettingsDb.update(msg.key.remoteJid, { rules })
  await sendMessage(sock, sender, '✅ Règles mises à jour ! .regles pour les voir.')
}
