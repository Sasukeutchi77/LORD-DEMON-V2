// commands/couleur2.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function couleur_(sock, sender, args, msg) {
  const generate = () => {
    const hex = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0')
const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
return \`Hex: \${hex}\\nRGB: rgb(\${r}, \${g}, \${b})\`
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎨 COULEUR ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
