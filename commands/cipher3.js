import { sendMessage } from '../lib/sendMessage.js'
export default async function cipher3(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase(), n = parseInt(args[1])
  const text = args.slice(2).join(' ')
  if (!sub||!text||isNaN(n)||(sub!=='encode'&&sub!=='decode')) return await sendMessage(sock, sender, `☩━━━〔 🔐 *CHIFFRE CÉSAR* 〕━━━☩\n☠\n⛧  ${prefix}cipher3 encode <décalage> <texte>\n☠  ${prefix}cipher3 decode <décalage> <texte>\n✝  Ex: ${prefix}cipher3 encode 3 BONJOUR\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const shift = ((sub==='decode'?26-n%26:n%26)+26)%26
  const result = text.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65+shift)%26+65))
  await sendMessage(sock, sender, `☩━━━〔 🔐 *CÉSAR ${sub.toUpperCase()}* 〕━━━☩\n☠\n⛧  Décalage: *${n}*\n☠  Original: _${text}_\n☠\n✝  Résultat: *${result}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}