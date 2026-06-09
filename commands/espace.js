// commands/espace.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function espace(sock, sender, args, msg) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: \.espace <texte>`)
  const fn = text => text.split('').join(' ')
  const result = fn(text)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ✨ ESPACÉ   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📝 Original: ${text}\n\n✨ Résultat:\n${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
