// commands/topuser.js — TOP UTILISATEUR ⭐
import { sendMessage } from '../lib/sendMessage.js'
import { userDb } from '../lib/database.js'
export default async function topuser(sock, sender, args, msg) {
  const top = userDb.leaderboard(5)
  if (!top.length) return sendMessage(sock, sender, '📊 Aucune donnée.')
  const lines = top.map((u,i)=>`${i+1}. @${u.jid.split('@')[0]} — Niv.${u.level} — ${u.xp}XP — ${u.msg_count} msgs`).join('\n')
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⭐ TOP UTILISATEURS   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${lines}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
