import { sendMessage } from '../lib/sendMessage.js'
export default async function countdown(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const dateStr = args.join(' ')
  if (!dateStr) return await sendMessage(sock, sender, `☩━━━〔 ⏳ *COUNTDOWN* 〕━━━☩\n☠\n⛧  ${prefix}countdown <date>\n☠  Ex: ${prefix}countdown 2025-12-31\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const target = new Date(dateStr)
  if (isNaN(target.getTime())) return await sendMessage(sock, sender, '☠ Date invalide.')
  const diff = target - new Date()
  if (diff < 0) return await sendMessage(sock, sender, `⌛ Cette date est déjà passée (il y a ${Math.abs(Math.floor(diff/86400000))} jours)`)
  const days=Math.floor(diff/86400000), hours=Math.floor((diff%86400000)/3600000), mins=Math.floor((diff%3600000)/60000), secs=Math.floor((diff%60000)/1000)
  await sendMessage(sock, sender, `☩━━━〔 ⏳ *COUNTDOWN* 〕━━━☩\n☠\n⛧  📅 *${target.toLocaleDateString('fr-FR')}*\n☠\n✝  ⏳ Reste: *${days}j ${hours}h ${mins}m ${secs}s*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}