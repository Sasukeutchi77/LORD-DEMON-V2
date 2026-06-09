// commands/don.js — DON GUILDE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb, guildDb } from '../lib/economySystem.js'

export default async function don(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const amount = parseInt(args[0])
  if (!amount || amount <= 0) return sendMessage(sock, sender, '☠ Usage: .don <montant>  — Don a votre guilde')
  const member = guildDb.getMember(jid)
  if (!member) return sendMessage(sock, sender, '☠ Vous n\'etes pas dans une guilde. .guild rejoindre <nom>')
  const e = economyDb.ensure(jid)
  if ((e.coins || 0) < amount) return sendMessage(sock, sender, '☠ Pas assez de coins.')
  economyDb.removeCoins(jid, amount)
  guildDb.addXp(member.guild_id, Math.floor(amount / 10))
  await sendMessage(sock, sender, '✅ Don de *' + amount + ' 🪙* a la guilde !\n🌟 +' + Math.floor(amount / 10) + ' XP de guilde')
}
