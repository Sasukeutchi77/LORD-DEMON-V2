import { sendMessage } from '../lib/sendMessage.js'
export default async function atbash(sock, sender, args, msg, ctx) {
  const text = args.join(' ')
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}atbash <texte>`)
  const result = text.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode(219 - c.charCodeAt(0))
    if (/[A-Z]/.test(c)) return String.fromCharCode(155 - c.charCodeAt(0))
    return c
  }).join('')
  await sendMessage(sock, sender,
    `☩━━━〔 🔄 *ATBASH* 〕━━━☩\n☠\n⛧  📝 Original: _${text}_\n☠  🔀 Résultat: *${result}*\n☠\n✝  _(A→Z, B→Y, C→X...)_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
