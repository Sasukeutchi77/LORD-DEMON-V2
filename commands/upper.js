// commands/upper.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function upper(sock, sender, args, msg) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: \.upper <texte>`)
  const fn = text => text.toUpperCase()
  const result = fn(text)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔠 MAJUSCULES   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📝 Original: ${text}\n\n✨ Résultat:\n${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
