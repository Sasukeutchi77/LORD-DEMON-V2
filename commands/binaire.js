// commands/binaire.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function binaire(sock, sender, args, msg) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .binaire <texte>')
  const result = text.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ')
  await sendMessage(sock, sender, `💻 *Binaire:*\n${result}`)
}
