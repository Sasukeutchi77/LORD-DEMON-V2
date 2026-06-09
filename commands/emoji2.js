// commands/emoji2.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function emoji_(sock, sender, args, msg) {
  const generate = () => {
    const emojis = ['🔥','💀','⛧','☠️','💎','👑','⚔️','🏹','🧙','🐉','🦁','🦅','🌑','⚡','💫','🌌','🗡️','🛡️','💣','🎯']
return emojis[Math.floor(Math.random()*emojis.length)] + ' ' + emojis[Math.floor(Math.random()*emojis.length)] + ' ' + emojis[Math.floor(Math.random()*emojis.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   😀 EMOJI ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
