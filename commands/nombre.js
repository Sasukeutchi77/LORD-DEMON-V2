// commands/nombre.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function nombre(sock, sender, args, msg) {
  const generate = () => {
    const [min, max] = [args[0]||1, args[1]||100].map(Number)
return String(min + Math.floor(Math.random()*(max-min+1)))
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎲 NOMBRE ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
