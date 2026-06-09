import { sendMessage } from '../lib/sendMessage.js'
export default async function cipher3(sock, sender, args, msg, ctx = {}) {
  const sub = args[0]?.toLowerCase()
  const n = parseInt(args[1])
  const text = args.slice(2).join(' ')
  if (!sub || !text || isNaN(n) || (sub !== 'encode' && sub !== 'decode')) {
    return sendMessage(sock, sender, `☠ Usage: .cipher3 encode|decode <décalage> <texte>\nEx: .cipher3 encode 13 BONJOUR`)
  }
  const shift = sub === 'decode' ? (26 - (n % 26)) : n % 26
  const result = text.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode((c.charCodeAt(0) - 97 + shift) % 26 + 97)
    if (/[A-Z]/.test(c)) return String.fromCharCode((c.charCodeAt(0) - 65 + shift) % 26 + 65)
    return c
  }).join('')
  const out =
    `☩━━━〔 🔐 *CHIFFRE CÉSAR AVANCÉ* 〕━━━☩\n\n` +
    `☠  📝 *${sub === 'encode' ? 'Original' : 'Chiffré'}:* ${text}\n` +
    `⛧  🔒 *${sub === 'encode' ? 'Encodé' : 'Décodé'} (+${n}):* ${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
