// commands/base64.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function base64(sock, sender, args, msg) {
  const sub = args[0]?.toLowerCase()
  const text = args.slice(1).join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .base64 encode <texte> / .base64 decode <base64>')
  try {
    if (sub === 'decode') {
      const result = Buffer.from(text, 'base64').toString('utf8')
      await sendMessage(sock, sender, `🔓 Décodé:\n${result}`)
    } else {
      const result = Buffer.from(text).toString('base64')
      await sendMessage(sock, sender, `🔐 Encodé:\n${result}`)
    }
  } catch(e) { await sendMessage(sock, sender, '☠ Erreur: ' + e.message) }
}
