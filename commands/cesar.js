import { sendMessage } from '../lib/sendMessage.js'
export default async function cesar(sock, sender, args, msg, ctx = {}) {
  const shift = parseInt(args[0]) || 3
  const text = args.slice(1).join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .cesar <décalage> <texte>\nEx: .cesar 3 Bonjour`)
  const encode = s => s.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode((c.charCodeAt(0) - 97 + shift) % 26 + 97)
    if (/[A-Z]/.test(c)) return String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65)
    return c
  }).join('')
  const encoded = encode(text)
  const out =
    `☩━━━〔 🔐 *CHIFFRE DE CÉSAR* 〕━━━☩\n\n` +
    `☠  📝 *Original:* ${text}\n` +
    `⛧  🔒 *Chiffré (+${shift}):* ${encoded}\n` +
    `✝  💡 _Décalage alphabétique de ${shift} positions_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
