// commands/uwu.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function uwu(sock, sender, args, msg) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: \.uwu <texte>`)
  const fn = text => text.replace(/[rl]/gi,'w').replace(/n([aeiou])/gi,'ny$1').replace(/ove/gi,'uv').replace(/!/g,' owo!').replace(/\.$/,'~ uwu~')
  const result = fn(text)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🐱 UWUIFY   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📝 Original: ${text}\n\n✨ Résultat:\n${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
