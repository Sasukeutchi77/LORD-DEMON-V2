// commands/mock.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function mock(sock, sender, args, msg) {
  try {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: \.mock <texte>`)
  const fn = text => text.split('').map((c,i) => i%2?c.toUpperCase():c.toLowerCase()).join('')
  const result = fn(text)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   😏 MOCK TEXT   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📝 Original: ${text}\n\n✨ Résultat:\n${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}