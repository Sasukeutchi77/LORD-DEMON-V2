// commands/reverse.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function reverse(sock, sender, args, msg) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: \.reverse <texte>`)
  const fn = text => text.split("").reverse().join("")
  const result = fn(text)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔄 TEXTE INVERSÉ   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📝 Original: ${text}\n\n✨ Résultat:\n${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
