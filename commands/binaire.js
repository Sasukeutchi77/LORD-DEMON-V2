import { sendMessage } from '../lib/sendMessage.js'
export default async function binaire(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .binaire <texte>\nEx: .binaire Bonjour`)
  const toBin = s => s.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ')
  const result = toBin(text)
  const out =
    `☩━━━〔 💻 *TRADUCTEUR BINAIRE* 〕━━━☩\n\n` +
    `☠  📝 *Texte:* ${text}\n` +
    `⛧  🔢 *Binaire:*\n${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
