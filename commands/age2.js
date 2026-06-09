import { sendMessage } from '../lib/sendMessage.js'
export default async function age2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const input = args.join(' ')
  if (!input) return await sendMessage(sock, sender, `☩━━━〔 🎂 *ÂGE* 〕━━━☩\n☠\n⛧  ${prefix}age2 <date>\n☠  Ex: ${prefix}age2 2000-05-15\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const date = new Date(input)
  if (isNaN(date.getTime())) return await sendMessage(sock, sender, '☠ Date invalide. Format: AAAA-MM-JJ')
  const now = new Date()
  let years = now.getFullYear()-date.getFullYear(), months = now.getMonth()-date.getMonth(), days = now.getDate()-date.getDate()
  if(days<0){months--;days+=30} if(months<0){years--;months+=12}
  const totalDays = Math.floor((now-date)/86400000)
  const nextBday = new Date(date); nextBday.setFullYear(now.getFullYear()); if(nextBday<now)nextBday.setFullYear(now.getFullYear()+1)
  const daysLeft = Math.floor((nextBday-now)/86400000)
  await sendMessage(sock, sender, `☩━━━〔 🎂 *ÂGE* 〕━━━☩\n☠\n⛧  📅 Né(e) le: *${date.toLocaleDateString('fr-FR')}*\n☠\n✝  🎂 Âge: *${years} ans, ${months} mois, ${days} jours*\n☠  📊 Jours vécus: *${totalDays.toLocaleString()}*\n⛧  🥳 Prochain anniversaire: *${daysLeft} jours*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}