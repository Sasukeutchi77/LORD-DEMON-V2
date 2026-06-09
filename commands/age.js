import { sendMessage } from '../lib/sendMessage.js'
export default async function age(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ')
  if (!input) return sendMessage(sock, sender, `☠ Usage: .age <JJ/MM/AAAA>`)
  const [d,m,y] = input.split('/').map(Number)
  if (!d||!m||!y) return sendMessage(sock, sender, `☠ Format invalide — Ex: .age 15/06/1995`)
  const now = new Date(), birth = new Date(y, m-1, d)
  let years = now.getFullYear() - birth.getFullYear()
  if (now < new Date(now.getFullYear(), m-1, d)) years--
  const jours = Math.floor((now - birth) / 86400000)
  const signe = (() => {
    if ((m===3&&d>=21)||(m===4&&d<=19)) return '♈ Bélier'
    if ((m===4&&d>=20)||(m===5&&d<=20)) return '♉ Taureau'
    if ((m===5&&d>=21)||(m===6&&d<=20)) return '♊ Gémeaux'
    if ((m===6&&d>=21)||(m===7&&d<=22)) return '♋ Cancer'
    if ((m===7&&d>=23)||(m===8&&d<=22)) return '♌ Lion'
    if ((m===8&&d>=23)||(m===9&&d<=22)) return '♍ Vierge'
    if ((m===9&&d>=23)||(m===10&&d<=22)) return '♎ Balance'
    if ((m===10&&d>=23)||(m===11&&d<=21)) return '♏ Scorpion'
    if ((m===11&&d>=22)||(m===12&&d<=21)) return '♐ Sagittaire'
    if ((m===12&&d>=22)||(m===1&&d<=19)) return '♑ Capricorne'
    if ((m===1&&d>=20)||(m===2&&d<=18)) return '♒ Verseau'
    return '♓ Poissons'
  })()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎂 *CALCUL D'ÂGE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 *Date:* ${d}/${m}/${y}\n` +
    `⛧  🎂 *Âge:* ${years} ans\n` +
    `✝  📆 *Jours vécus:* ${jours.toLocaleString()}\n` +
    `☩  ✨ *Signe:* ${signe}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
