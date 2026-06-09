import { sendMessage } from '../lib/sendMessage.js'
export default async function age2(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ')
  if (!input) return sendMessage(sock, sender, `☠ Usage: .age2 <AAAA-MM-JJ>\nEx: .age2 2000-05-15`)
  const date = new Date(input)
  if (isNaN(date.getTime())) return sendMessage(sock, sender, `☠ Date invalide. Format: AAAA-MM-JJ`)
  const now = new Date()
  let years = now.getFullYear()-date.getFullYear()
  let months = now.getMonth()-date.getMonth()
  let days = now.getDate()-date.getDate()
  if(days<0){months--;days+=30}
  if(months<0){years--;months+=12}
  const jours = Math.floor((now - date) / 86400000)
  const prochainAnniv = new Date(now.getFullYear(), date.getMonth(), date.getDate())
  if (prochainAnniv < now) prochainAnniv.setFullYear(now.getFullYear() + 1)
  const joursRestants = Math.ceil((prochainAnniv - now) / 86400000)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎂 *ÂGE AVANCÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 *Naissance:* ${date.toLocaleDateString('fr-FR')}\n` +
    `⛧  🎂 *Âge:* ${years} ans, ${months} mois, ${days} jours\n` +
    `✝  📆 *Jours vécus:* ${jours.toLocaleString()}\n` +
    `☩  🎉 *Prochain anniversaire:* dans ${joursRestants} jours\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
