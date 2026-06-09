import { sendMessage } from '../lib/sendMessage.js'
export default async function countdown(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const dateStr = args.join(' ')
  const target = new Date(dateStr)
  if (isNaN(target.getTime())) return await sendMessage(sock, sender, `☩━━━〔 ⏳ *COUNTDOWN* 〕━━━☩\n☠\n⛧  Usage: ${prefix}countdown <date>\n☠  Ex: ${prefix}countdown 2025-12-31\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const now = new Date()
  const diff = target - now
  if (diff < 0) return await sendMessage(sock, sender, `⌛ Cette date est déjà passée (il y a ${Math.abs(Math.floor(diff/86400000))} jours)`)
  const days = Math.floor(diff/86400000)
  const hours = Math.floor((diff%86400000)/3600000)
  const mins = Math.floor((diff%3600000)/60000)
  const secs = Math.floor((diff%60000)/1000)
  await sendMessage(sock, sender, `☩━━━〔 ⏳ *COUNTDOWN* 〕━━━☩\n☠\n⛧  📅 Cible: *${target.toLocaleDateString('fr-FR')}*\n☠\n☩  ⏳ Il reste:\n✝  *${days}* jours\n☠  *${hours}* heures\n⛧  *${mins}* minutes\n☩  *${secs}* secondes\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}