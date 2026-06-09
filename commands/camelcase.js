import { sendMessage } from '../lib/sendMessage.js'
export default async function camelcase(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .camelcase <texte>\nEx: .camelcase bonjour le monde`)
  const result = text.toLowerCase().split(' ').map((w, i) => i ? w[0].toUpperCase() + w.slice(1) : w).join('')
  const out =
    `☩━━━〔 🔤 *CAMEL CASE* 〕━━━☩\n\n` +
    `☠  📝 *Original:* ${text}\n` +
    `⛧  ✨ *Résultat:* ${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
