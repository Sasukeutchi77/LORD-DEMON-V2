// commands/pin.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function pin(sock, sender, args, msg) {
  const generate = () => {
    const len = [4,6][Math.floor(Math.random()*2)]
return Array.from({length:len}, () => Math.floor(Math.random()*10)).join('')
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔢 GÉNÉRATEUR PIN   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
