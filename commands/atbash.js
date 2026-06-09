import { sendMessage } from '../lib/sendMessage.js'
export default async function atbash(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text.trim()) return sendMessage(sock, sender, `☠ Usage: .atbash <texte>`)
  const result = text.split('').map(c => {
    if (/[a-z]/.test(c)) return String.fromCharCode(219 - c.charCodeAt(0))
    if (/[A-Z]/.test(c)) return String.fromCharCode(155 - c.charCodeAt(0))
    return c
  }).join('')
  const out =
    `☩━━━〔 🔐 *CHIFFREMENT ATBASH* 〕━━━☩\n\n` +
    `☠  📝 *Original:* ${text}\n` +
    `⛧  🔒 *Chiffré:* ${result}\n\n` +
    `✝  _A↔Z, B↔Y, C↔X... (miroir alphabétique)_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
